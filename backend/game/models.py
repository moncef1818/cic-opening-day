from django.db import models
from django.contrib.auth.hashers import make_password, check_password as django_check_password


class Flag(models.Model):
    """CTF flags at each stand - one-time use, stored as hash"""
    code_hash = models.CharField(max_length=128, unique=True, help_text="Hashed flag code")
    stand = models.ForeignKey('stands.Stand', on_delete=models.CASCADE, related_name='flags')
    base_points = models.IntegerField(
        choices=[(100, '100'), (200, '200'), (300, '300'), (400, '400'), (500, '500')]
    )
    is_used = models.BooleanField(default=False, help_text="Has this flag been claimed?")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['stand', 'base_points']
    
    def __str__(self):
        return f"{self.stand.name} - {self.base_points}pts - {'USED' if self.is_used else 'Available'}"
    
    def set_code(self, raw_code):
        """Hash and set the flag code."""
        self.code_hash = make_password(raw_code)
    
    def check_code(self, raw_code):
        """Verify the flag code against the hashed version."""
        return django_check_password(raw_code, self.code_hash)


class FlagSubmission(models.Model):
    """Track flag submissions by teams"""
    team = models.ForeignKey('teams.Team', on_delete=models.CASCADE, related_name='flag_submissions')
    flag = models.ForeignKey('Flag', on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)
    awarded_points = models.IntegerField(help_text="Points (same as flag base_points)")
    
    class Meta:
        unique_together = ('team', 'flag')
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.team.name} - {self.awarded_points}pts @ {self.flag.stand.name}"

# Create your models here.
