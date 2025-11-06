from django.db import models
from django.contrib.auth.models import User
import hashlib

class Gem(models.Model):
    """Represents a gem type (e.g., Blue Gem, Pink Gem)"""
    GEM_TYPES = [
        ('blue', 'Blue Gem'),
        ('pink', 'Pink Gem'),
        ('green', 'Green Gem'),
        ('yellow', 'Yellow Gem'),
        ('red', 'Red Gem'),
    ]
    
    KINGDOM_CHOICES = [
        ('candy', 'Candy Kingdom'),
        ('ice', 'Ice Kingdom'),
        ('lumpy', 'Lumpy Space'),
        ('fire', 'Fire Kingdom'),
        ('grass', 'Grasslands'),
    ]
    
    name = models.CharField(max_length=100)
    gem_type = models.CharField(max_length=20, choices=GEM_TYPES, unique=True)
    kingdom = models.CharField(max_length=50, choices=KINGDOM_CHOICES)
    description = models.TextField()
    points = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['kingdom', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_gem_type_display()})"


class Flag(models.Model):
    """Physical flag that represents a gem - each flag can be used only once"""
    gem = models.ForeignKey(Gem, on_delete=models.CASCADE, related_name='physical_flags')
    flag_code_hash = models.CharField(max_length=64, unique=True)
    is_used = models.BooleanField(default=False)
    used_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='used_flags')
    used_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['gem', 'created_at']
    
    def __str__(self):
        status = "Used" if self.is_used else "Available"
        return f"Flag for {self.gem.name} - {status}"
    
    def set_flag_code(self, raw_code):
        """Hash the flag code before storing"""
        self.flag_code_hash = hashlib.sha256(raw_code.encode()).hexdigest()
    
    def verify_flag_code(self, submitted_code):
        """Verify submitted flag against hash"""
        return self.flag_code_hash == hashlib.sha256(submitted_code.encode()).hexdigest()
