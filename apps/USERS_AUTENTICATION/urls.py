from django.urls import path, include
from rest_framework import routers
from USERS_AUTENTICATION import views


router = routers.DefaultRouter()
router.register(r'CapyUser', views.CapyUserViewSet)

urlpatterns = [
    path('', include(router.urls))
]
