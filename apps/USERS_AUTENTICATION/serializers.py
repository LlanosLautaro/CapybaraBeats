from rest_framework import serializers
from .models import CapyUser

class CapyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapyUser
        fields = ('id', 'username', 'email', 'password', 'is_premium', 'foto_de_perfil')
        extra_kwargs = {
            'password': {'write_only': True},
            'foto_de_perfil': {'required': False}
        }

    def create(self, validated_data):
        user = CapyUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_premium=validated_data.get('is_premium', False),
            foto_de_perfil=validated_data.get('foto_de_perfil', None)
        )
        return user
