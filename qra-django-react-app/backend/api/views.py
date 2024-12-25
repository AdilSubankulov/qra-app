from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ClientSerializer, MyTokenObtainPairSerializer, TariffSerializer, MembershipSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .models import Client, Tariff, Membership
from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status

# Представление для создания пользователя
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Представление для получения токена
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    
# Представление для работы с тарифами
class TariffViewSet(viewsets.ModelViewSet):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer
    permission_classes = [AllowAny]

# Представление для работы с членствами
class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.select_related('client', 'tariff')
    serializer_class = MembershipSerializer
    permission_classes = [AllowAny]

    # Переопределяем создание членства
    def perform_create(self, serializer):
        client_id = self.request.data.get('client')
        tariff_id = self.request.data.get('tariff')

        # Проверяем существование клиента
        try:
            client = Client.objects.get(id=client_id)
        except Client.DoesNotExist:
            raise serializers.ValidationError("Client with the provided ID does not exist")

        # Проверяем существование тарифа
        try:
            tariff = Tariff.objects.get(id=tariff_id)
        except Tariff.DoesNotExist:
            raise serializers.ValidationError("Tariff with the provided ID does not exist")

        # Сохраняем членство с привязанным клиентом и тарифом
        serializer.save(client=client, tariff=tariff)

    # Действие для добавления посещения
    @action(detail=True, methods=['post'])
    def add_visit(self, request, pk=None):
        membership = self.get_object()

        # Пытаемся добавить посещение
        if membership.add_visit():
            return Response({"status": "Visit added"})
        return Response({"status": "Limit reached or membership not active"}, status=400)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from PIL import Image
import os
import cv2
import numpy as np
from pyzbar.pyzbar import decode
from .models import Client

class QRCodeValidationView(APIView):

    def post(self, request, *args, **kwargs):
        # Получаем путь к изображению из тела запроса
        qr_code_path = request.data.get('qr_code_path', None)
        
        if not qr_code_path:
            return Response({"error": "QR code path is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Проверяем, что файл существует
        file_path = os.path.join(settings.MEDIA_ROOT, qr_code_path.lstrip('/media/'))
        if not os.path.exists(file_path):
            return Response({"error": "QR code file not found."}, status=status.HTTP_404_NOT_FOUND)

        # Используем OpenCV или pyzbar для декодирования QR-кода
        try:
            image = cv2.imread(file_path)
            decoded_objects = decode(image)

            if not decoded_objects:
                return Response({"error": "QR code could not be decoded."}, status=status.HTTP_400_BAD_REQUEST)

            # Извлекаем данные из QR-кода
            qr_data = decoded_objects[0].data.decode('utf-8')

            # Пытаемся найти клиента по данным из QR-кода
            try:
                client = Client.objects.get(qr_code=qr_data)
            except ObjectDoesNotExist:
                return Response({"error": "Client not found."}, status=status.HTTP_404_NOT_FOUND)

            # Проверяем количество посещений
            if client.memberships.filter(visit_count__gte=client.memberships.first().tariff.max_visits).exists():
                return Response({"error": "This client's subscription has reached the maximum visits."}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Client validated successfully."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
