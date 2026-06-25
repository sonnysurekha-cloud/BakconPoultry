from django.urls import path
from . import views

urlpatterns = [
    path("bulk-orders/", views.bulk_orders_create, name="api_bulk_orders"),
    path("stores/", views.stores_list, name="api_stores"),
    path("payments/ozow/init/", views.ozow_init, name="api_ozow_init"),
    path("payments/ozow/webhook/", views.ozow_webhook, name="api_ozow_webhook"),
    path("payments/ozow/status/<int:tx_id>/", views.ozow_status, name="api_ozow_status"),
]
