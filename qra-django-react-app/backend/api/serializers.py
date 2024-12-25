from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Client, Membership, Tariff

# Сериализатор для User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Сериализатор для токенов
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Вызываем стандартную валидацию для получения токенов
        data = super().validate(attrs)
        # Добавляем username в ответ
        data['username'] = self.user.username
        return data

# Сериализатор для Tariff
class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = ['id', 'name', 'price', 'max_visits', 'is_active']  # Исключаем поля is_morning и is_evening, если они не нужны

# Сериализатор для Membership
class MembershipSerializer(serializers.ModelSerializer):
    tariff = TariffSerializer(read_only=True)
    
    class Meta:
        model = Membership
        fields = ['id', 'tariff', 'visit_count']  # Мы оставляем только информацию о тарифе и количестве посещений

# Сериализатор для Client
class ClientSerializer(serializers.ModelSerializer):
    memberships = MembershipSerializer(many=True, read_only=True) 
    qr_code_url = serializers.SerializerMethodField() # Включаем информации о членствах

    class Meta:
        model = Client
        fields = ['id', 'full_name', 'qr_code_url','memberships']  # Содержимое всех членств клиента
        
    def get_qr_code_url(self, obj):
        if obj.qr_code_url:  # Проверяем, есть ли QR-код
            return obj.qr_code_url.url  # Возвращаем URL
        return None
