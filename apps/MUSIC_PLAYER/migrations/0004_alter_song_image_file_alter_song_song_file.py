# Generated by Django 4.2.5 on 2023-11-14 17:15

import MUSIC_PLAYER.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MUSIC_PLAYER', '0003_alter_song_image_file_alter_song_song_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='image_file',
            field=models.FileField(upload_to='images/', validators=[MUSIC_PLAYER.models.validate_image_file_extension]),
        ),
        migrations.AlterField(
            model_name='song',
            name='song_file',
            field=models.FileField(upload_to='songs/', validators=[MUSIC_PLAYER.models.validate_sound_file_extension]),
        ),
    ]
