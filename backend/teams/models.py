from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Team(models.Model):
    
    name = models.CharField(
        max_length=100,
        unique=True,
    )

    password = models.CharField(
        max_length=128
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta():
        ordering = ['name']
        verbose_name = "Team"
        verbose_name_plural = "Teams"
        
    def __str__(self):
        return self.name
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self,raw_password):
        return check_password(raw_password,check_password)

# Create your models here.
