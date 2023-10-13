from rest_framework import generics, authentication, permissions
from .serializers import CapyUserSerializer, AuthTokenSerialize
from rest_framework.authtoken.views import ObtainAuthToken

class CreateUserView(generics.CreateAPIView):
    serializer_class = CapyUserSerializer
    
class RetreiveUpdateUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CapyUserSerializer
    authentication_classes =[authentication.TokenAuthentication]
    permission_classes =[permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class CreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerialize
    
     