# Generated by Django 5.1.3 on 2024-12-18 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_tariff_is_evening_remove_tariff_is_morning_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='qr_code',
            field=models.ImageField(blank=True, upload_to='qr_codes/'),
        ),
    ]