from django.db import models
from django.core.validators import RegexValidator
# Create your models here.

class contacts(models.Model):
    first_name=models.CharField(max_length=100,unique=True)
    last_name=models.CharField(max_length=100,unique=True)
    phone_number = models.CharField(
        max_length=15,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d+$',
                message="Phone number must contain only digits.",
                code='invalid_phone_number'
            )
        ]
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.phone_number}"