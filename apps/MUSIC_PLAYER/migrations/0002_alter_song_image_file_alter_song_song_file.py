# Generated by Django 4.2.5 on 2023-10-21 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MUSIC_PLAYER', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='image_file',
            field=models.FileField(upload_to='media/images/'),
        ),
        migrations.AlterField(
            model_name='song',
            name='song_file',
            field=models.FileField(upload_to='media/songs/'),
        ),
    ]