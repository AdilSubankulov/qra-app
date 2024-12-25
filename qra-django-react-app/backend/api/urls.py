from django.urls import path
from .views import ClientViewSet, TariffViewSet, MembershipViewSet, QRCodeValidationView

urlpatterns = [
    # Client routes
    path('clients/', ClientViewSet.as_view({'get': 'list', 'post': 'create'}), name='client-list'),
    path('clients/<int:pk>/', ClientViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    }), name='client-detail'),

    # Tariff routes
    path('tariffs/', TariffViewSet.as_view({'get': 'list', 'post': 'create'}), name='tariff-list'),
    path('tariffs/<int:pk>/', TariffViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    }), name='tariff-detail'),

    # Membership routes
    path('memberships/', MembershipViewSet.as_view({'get': 'list', 'post': 'create'}), name='membership-list'),
    path('memberships/<int:pk>/', MembershipViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    }), name='membership-detail'),
    path('memberships/<int:pk>/add-visit/', MembershipViewSet.as_view({'post': 'add_visit'}), name='membership-add-visit'),
    path('validate-qr-code/', QRCodeValidationView.as_view(), name='validate-qr-code'),
]
