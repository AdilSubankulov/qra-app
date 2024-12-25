# Generated by Django 5.1.3 on 2024-12-16 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_membership_start_date_tariff_is_active_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tariff',
            name='is_evening',
        ),
        migrations.RemoveField(
            model_name='tariff',
            name='is_morning',
        ),
        migrations.AlterField(
            model_name='membership',
            name='start_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
