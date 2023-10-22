from rest_framework import serializers
from .models import SONG

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = SONG
        fields = '__all__'
