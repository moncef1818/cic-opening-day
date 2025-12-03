from django.db import models
from django.contrib.auth.hashers import make_password, check_password as verify_password


class Team(models.Model):
    """
    Team model for Adventure Time CTF game.
    Teams login with shared credentials (name + password).
    Created by HR in Django admin before event.
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique team name (e.g., 'resists', 'ice_kings')"
    )
    password = models.CharField(
        max_length=128,
        help_text="Hashed password - use set_password() to set"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = "Team"
        verbose_name_plural = "Teams"
    
    def __str__(self):
        return self.name
    
    def set_password(self, raw_password):
        """Hash and set the team password."""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Verify the team password against the hashed version."""
        return verify_password(raw_password, self.password)  
