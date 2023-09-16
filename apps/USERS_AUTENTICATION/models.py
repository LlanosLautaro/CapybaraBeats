from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CapyUser(AbstractUser):
    # Agrega campos personalizados aquí
    is_premium = models.BooleanField(default=False)
    foto_de_perfil = models.ImageField(upload_to='perfil/', null=True, blank=True)

    def __str__(self):
        return self.username
    
    groups = models.ManyToManyField(Group, blank=True, related_name='capy_user_set_groups')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='capy_user_set_permissions')


