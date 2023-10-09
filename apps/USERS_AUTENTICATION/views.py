from rest_framework import generics, viewsets
from .serializers import CapyUserSerializer
from .models import CapyUser

class CapyUserViewSet(viewsets.ModelViewSet):
    queryset = CapyUser.objects.all()
    serializer_class = CapyUserSerializer