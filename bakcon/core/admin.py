from django.contrib import admin
from .models import BulkOrder, StoreLocation
from .models import PaymentTransaction


@admin.register(BulkOrder)
class BulkOrderAdmin(admin.ModelAdmin):
	list_display = ("business_name", "contact_number", "quantity_needed", "created_at")
	search_fields = ("business_name", "contact_number")


@admin.register(StoreLocation)
class StoreLocationAdmin(admin.ModelAdmin):
	list_display = ("name", "address", "is_farm")
	search_fields = ("name", "address")


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
	list_display = ("id", "order_ref", "amount", "currency", "status", "created_at")
	search_fields = ("order_ref", "ozow_payment_id")
	readonly_fields = ("created_at", "updated_at")
