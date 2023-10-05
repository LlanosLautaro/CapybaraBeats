from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from django.contrib.auth.views import LoginView

class UserRegistrationView(CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')  # Puedes redirigir a donde desees después del registro
    template_name = 'register.html'  # Crea una plantilla para el formulario de registro

class CustomLoginView(LoginView):
    template_name = 'login.html'  # Ruta a la plantilla de inicio de sesión

    def form_valid(self, form):
        # Lógica de inicio de sesión exitoso aquí
        # Puedes establecer una variable de contexto para indicar que el inicio de sesión fue exitoso.
        self.request.session['login_successful'] = True
        return super().form_valid(form)
