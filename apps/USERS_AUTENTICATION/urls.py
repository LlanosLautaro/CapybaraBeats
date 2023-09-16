from django.urls import path
from .views import UserRegistrationView, CustomLoginView

urlpatterns = [
    # Otras URLs de tu aplicación...
    path('registro/', UserRegistrationView.as_view(), name='registro'),
    path('login/', CustomLoginView.as_view(), name='inicio-sesion'),
]
