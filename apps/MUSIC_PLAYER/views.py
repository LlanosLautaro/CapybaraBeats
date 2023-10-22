from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SONG
from .serializers import SongSerializer

class CreateSongView(generics.CreateAPIView):
    queryset = SONG.objects.all()
    serializer_class = SongSerializer

class SongListView(generics.ListAPIView):
    queryset = SONG.objects.all()
    serializer_class = SongSerializer

class SongDetailView(APIView):
    def get(self, request, id):
        try:
            song = SONG.objects.get(id=id)
        except SONG.DoesNotExist:
            return Response({"error": "La canción no existe."}, status=status.HTTP_404_NOT_FOUND)

        # Construye las URLs absolutas para los archivos
        song_file_url = request.build_absolute_uri(song.song_file.url)
        image_file_url = request.build_absolute_uri(song.image_file.url)

        # Crear un diccionario con las URLs completas
        response_data = {
            "id": song.id,
            "title": song.title,
            "artist": song.artist,
            "song_file": song_file_url,
            "image_file": image_file_url
        }

        return Response(response_data)