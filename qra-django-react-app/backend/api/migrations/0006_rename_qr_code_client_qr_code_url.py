# Generated by Django 5.1.3 on 2024-12-22 14:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_client_qr_code'),
    ]

    operations = [
        migrations.RenameField(
            model_name='client',
            old_name='qr_code',
            new_name='qr_code_url',
        ),
    ]
