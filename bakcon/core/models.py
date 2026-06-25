from django.db import models


class BulkOrder(models.Model):
	business_name = models.CharField(max_length=255)
	contact_number = models.CharField(max_length=50)
	quantity_needed = models.CharField(max_length=100)
	details = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self) -> str:  # pragma: no cover - simple repr
		return f"{self.business_name} — {self.quantity_needed}"


class StoreLocation(models.Model):
	name = models.CharField(max_length=255)
	address = models.CharField(max_length=500, blank=True)
	latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
	is_farm = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self) -> str:  # pragma: no cover - simple repr
		return self.name


class PaymentTransaction(models.Model):
	"""Record payment transaction attempts (Ozow integration).

	Note: run `python manage.py makemigrations core` and `migrate` after adding this model.
	"""
	order_ref = models.CharField(max_length=255, blank=True, null=True)
	ozow_payment_id = models.CharField(max_length=255, blank=True, null=True)
	amount = models.DecimalField(max_digits=12, decimal_places=2)
	currency = models.CharField(max_length=10, default='ZAR')
	status = models.CharField(max_length=32, default='pending')
	metadata = models.JSONField(blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self) -> str:
		return f"Payment {self.id} {self.status} {self.amount}{self.currency}"
