from rest_framework import serializers
from .models import contacts

class Contactserializer(serializers.ModelSerializer):
    class Meta:
        model=contacts
        fields="__all__"
        