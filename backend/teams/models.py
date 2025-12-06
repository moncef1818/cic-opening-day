from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class Team(models.Model):
    """
    Team model with authentication capabilities.
    Compatible with Django's authentication system.
    """
 

    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Required for Django auth compatibility
    is_active = models.BooleanField(default=True)
    is_authenticated = True  # Property for authentication checks
    
    class Meta:
        db_table = 'teams_team'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def set_password(self, raw_password):
        """Hash and set password"""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Verify password against hash"""
        return check_password(raw_password, self.password)
    
    def save(self, *args, **kwargs):
        """Auto-hash password if not already hashed"""
        if self.password and not self.password.startswith('pbkdf2_'):
            self.set_password(self.password)
        super().save(*args, **kwargs)
    
    # Required properties for JWT/DRF authentication
    @property
    def is_anonymous(self):
        return False
    
    @property
    def is_authenticated(self):
        return True
    
    # These make Team compatible with User model expectations
    @property
    def pk(self):
        return self.id
