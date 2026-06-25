import json
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from .models import BulkOrder, StoreLocation
from .models import PaymentTransaction
import os
import uuid
from decimal import Decimal
try:
	import requests
except Exception:
	requests = None
from django.urls import reverse


def _json_response(data, status=200):
	return JsonResponse(data, status=status, safe=False)


@csrf_exempt
def bulk_orders_create(request: HttpRequest):
	if request.method != "POST":
		return _json_response({"detail": "Method not allowed"}, status=405)
	try:
		payload = json.loads(request.body.decode("utf-8"))
	except Exception:
		payload = request.POST.dict()

	business_name = payload.get("business_name")
	contact_number = payload.get("contact_number")
	quantity_needed = payload.get("quantity_needed")
	details = payload.get("details", "")

	if not business_name or not contact_number or not quantity_needed:
		return _json_response({"detail": "business_name, contact_number and quantity_needed are required"}, status=400)

	obj = BulkOrder.objects.create(
		business_name=business_name,
		contact_number=contact_number,
		quantity_needed=quantity_needed,
		details=details,
	)

	# Send admin notification email (safe default uses console backend)
	try:
		admin_email = os.getenv('ADMIN_EMAIL') or os.getenv('DJANGO_ADMIN_EMAIL')
		if admin_email:
			from django.core.mail import EmailMessage, get_connection
			email_backend = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
			conn = get_connection(backend=email_backend)
			subject = f"New Bulk Quote Request — {business_name}"
			body = f"New bulk quote request:\n\nBusiness: {business_name}\nContact: {contact_number}\nQuantity: {quantity_needed}\nDetails: {details}\n\nRequest ID: {obj.id}\n"
			from_email = os.getenv('DEFAULT_FROM_EMAIL', 'no-reply@bakcon.local')
			msg = EmailMessage(subject, body, from_email, [admin_email], connection=conn)
			msg.send(fail_silently=True)
	except Exception:
		# Don't fail the API request if email can't be sent
		pass

	return _json_response({"id": obj.id, "detail": "created"}, status=201)


def stores_list(request: HttpRequest):
	# Return all store locations; if none exist, return a few example locations
	qs = StoreLocation.objects.all()
	if not qs.exists():
		sample = [
			{
				"name": "Bakcon Farm",
				"address": "Farm Road, Free State",
				"latitude": -28.000000,
				"longitude": 26.000000,
				"is_farm": True,
			},
			{
				"name": "Central Mall Store",
				"address": "Central Mall, Main St",
				"latitude": -28.010000,
				"longitude": 26.010000,
				"is_farm": False,
			},
		]
		return _json_response(sample)

	data = []
	for s in qs:
		data.append(
			{
				"name": s.name,
				"address": s.address,
				"latitude": float(s.latitude) if s.latitude is not None else None,
				"longitude": float(s.longitude) if s.longitude is not None else None,
				"is_farm": s.is_farm,
			}
		)
	return _json_response(data)



@csrf_exempt
def ozow_init(request: HttpRequest):
	"""Initialize an Ozow payment (simple scaffold).

	Expects JSON POST: { amount: <decimal>, order_ref?: str, return_url?: str }
	If OZOW_ENABLED env var is set to True and OZOW_API_URL is configured, this view
	will attempt a server-to-server call. Otherwise it will create a pending
	PaymentTransaction and return a simulated redirect URL to `return_url`.
	"""
	if request.method != "POST":
		return _json_response({"detail": "Method not allowed"}, status=405)
	try:
		payload = json.loads(request.body.decode("utf-8"))
	except Exception:
		payload = request.POST.dict()

	amount = payload.get("amount")
	order_ref = payload.get("order_ref") or str(uuid.uuid4())
	return_url = payload.get("return_url") or request.build_absolute_uri("/payments/return")

	if not amount:
		return _json_response({"detail": "amount is required"}, status=400)

	try:
		amt = Decimal(str(amount))
	except Exception:
		return _json_response({"detail": "invalid amount"}, status=400)

	tx = PaymentTransaction.objects.create(order_ref=order_ref, amount=amt, currency=payload.get("currency", "ZAR"), status="pending", metadata=payload)

	OZOW_ENABLED = os.getenv("OZOW_ENABLED", "False") == "True"
	OZOW_API_URL = os.getenv("OZOW_API_URL")
	OZOW_MERCHANT = os.getenv("OZOW_MERCHANT_ID")

	if OZOW_ENABLED and requests and OZOW_API_URL:
		# NOTE: This is a placeholder server-to-server call. Replace with
		# the official Ozow API format and authentication as required.
		try:
			data = {
				"merchant_id": OZOW_MERCHANT,
				"amount": int(amt * 100),
				"currency": "ZAR",
				"reference": order_ref,
				"return_url": return_url,
			}
			resp = requests.post(OZOW_API_URL, json=data, timeout=10)
			resp.raise_for_status()
			j = resp.json()
			redirect_url = j.get("redirect_url") or j.get("payment_url") or OZOW_API_URL
			tx.ozow_payment_id = j.get("payment_id") or None
			tx.save()
			return _json_response({"redirect_url": redirect_url, "transaction_id": tx.id})
		except Exception as e:
			# fallback
			sim = f"{return_url}?status=error&tx={tx.id}"
			return _json_response({"redirect_url": sim, "transaction_id": tx.id})

	# Simulation: immediately return a redirect back to return_url with tx id
	sim = f"{return_url}?status=success&tx={tx.id}"
	return _json_response({"redirect_url": sim, "transaction_id": tx.id})


@csrf_exempt
def ozow_webhook(request: HttpRequest):
	if request.method != "POST":
		return _json_response({"detail": "Method not allowed"}, status=405)
	try:
		payload = json.loads(request.body.decode("utf-8"))
	except Exception:
		payload = request.POST.dict()

	txid = payload.get("tx") or payload.get("transaction_id") or payload.get("reference")
	status = payload.get("status") or payload.get("payment_status") or payload.get("statuscode") or "unknown"
	ozow_id = payload.get("ozow_payment_id") or payload.get("payment_id")

	if not txid:
		return _json_response({"detail": "missing transaction id"}, status=400)

	tx = None
	try:
		if str(txid).isdigit():
			tx = PaymentTransaction.objects.filter(id=int(txid)).first()
	except Exception:
		tx = None
	if not tx:
		tx = PaymentTransaction.objects.filter(order_ref=txid).first()
	if not tx:
		return _json_response({"detail": "transaction not found"}, status=404)

	tx.status = status
	if ozow_id:
		tx.ozow_payment_id = ozow_id
	tx.save()
	return _json_response({"ok": True})


def ozow_status(request: HttpRequest, tx_id: int):
	try:
		tx = PaymentTransaction.objects.get(id=tx_id)
	except PaymentTransaction.DoesNotExist:
		return _json_response({"detail": "not found"}, status=404)
	return _json_response({"id": tx.id, "order_ref": tx.order_ref, "status": tx.status, "amount": str(tx.amount), "currency": tx.currency})
