from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.contrib.auth.views import LoginView

class UserRegistrationView(CreateView):
    form_class = UserCreationForm
    success_url = print("Login exitoso")#reverse_lazy('login')  # Puedes redirigir a donde desees después del registro
    template_name = 'templates/register.html'  # Crea una plantilla para el formulario de registro

class CustomLoginView(LoginView):
    template_name = 'templates/login.html'  # Ruta a la plantilla de inicio de sesión