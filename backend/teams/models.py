from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
    
    @property
    def member_count(self):
        return self.team_members.count()
    
    @property
    def total_points(self):
        return sum(gem.points for gem in self.collected_gems.all())

class TeamMember(models.Model):
    """Extends User with team relationship"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='team_profile')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='team_members')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['joined_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.team.name}"


