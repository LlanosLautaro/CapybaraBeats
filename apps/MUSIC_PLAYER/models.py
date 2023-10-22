from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_sound_file_extension(value):
    if not value.name.endswith(('.mp3', '.wav', '.ogg', '.flac', '.aac')):
        raise ValidationError(_('Archivo no válido. Por favor, sube un archivo de sonido válido.'))

def validate_image_file_extension(value):
    if not value.name.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp')):
        raise ValidationError(_('Archivo no válido. Por favor, sube una imagen válida.'))

class SONG(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    song_file = models.FileField(upload_to='media/songs/', validators=[validate_sound_file_extension])
    image_file = models.FileField(upload_to='media/images/', validators=[validate_image_file_extension])

    def __str__(self):
        return self.title
