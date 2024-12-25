import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image
from django.db import models

class Client(models.Model):
    full_name = models.CharField(max_length=100)
    qr_code_url = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def __str__(self):
        return self.full_name
    
    def save(self, *args, **kwargs):
        qr_image = qrcode.make(self.full_name)
        qr_image = qr_image.convert('RGB')
        canvas_size = (310, 310)
        qr_offset = Image.new('RGB', canvas_size, 'white')
        qr_width, qr_height = qr_image.size
        x = (canvas_size[0] - qr_width) // 2
        y = (canvas_size[1] - qr_height) // 2
        qr_offset.paste(qr_image, (x, y))
        files_name = f'{self.full_name}-{self.id}-qr.png'
        stream = BytesIO()
        qr_offset.save(stream, 'PNG')
        self.qr_code_url.save(files_name, ContentFile(stream.getvalue()), save=False)
        qr_offset.close()
        stream.close()
        
        super().save(*args, **kwargs)


class Tariff(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) 
    max_visits = models.PositiveIntegerField()  # Максимальное количество посещений
    is_active = models.BooleanField(default=True)  # Активен ли тариф

    def __str__(self):
        return self.name


class Membership(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='memberships')
    tariff = models.ForeignKey(Tariff, on_delete=models.CASCADE, related_name='memberships')
    start_date = models.DateField(auto_now_add=True)  # Дата начала членства
    visit_count = models.PositiveIntegerField(default=0)  # Счётчик посещений

    def is_active(self):
        """
        Проверка активности членства.
        Учитывается только лимит посещений и статус тарифа.
        """
        # Проверка на максимальное количество посещений
        if self.tariff.max_visits and self.visit_count >= self.tariff.max_visits:
            return False
        
        # Проверка активности тарифа
        return self.tariff.is_active

    def add_visit(self):
        """
        Добавляет посещение, если членство активно и не превышен лимит посещений.
        """
        if self.is_active():
            self.visit_count += 1
            self.save()
            return True
        return False

    def __str__(self):
        return f"{self.client.full_name} - {self.tariff.name}"
