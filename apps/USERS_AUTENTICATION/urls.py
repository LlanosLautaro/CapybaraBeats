from django.urls import path
from .views import UserRegistrationView, CustomLoginView
from django.contrib.auth.views import LogoutView

urlpatterns = [
    # Otras URLs de tu aplicación...
    path('registro/', UserRegistrationView.as_view(), name='registro'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
