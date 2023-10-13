# Generated by Django 4.2.5 on 2023-10-13 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('USERS_AUTENTICATION', '0002_capyuser_delete_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='capyuser',
            options={},
        ),
        migrations.AlterModelManagers(
            name='capyuser',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='foto_de_perfil',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='is_premium',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='capyuser',
            name='user_permissions',
        ),
        migrations.AlterField(
            model_name='capyuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='capyuser',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='capyuser',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='capyuser',
            name='username',
            field=models.CharField(max_length=255),
        ),
    ]