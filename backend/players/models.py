from django.db import models
from django.utils import timezone
from teams.models import Team
from stands.models import Gem, Flag


# Create your models here.

class TeamGemCollection(models.Model):
    """Tracks which gems each team has collected - one gem type per team"""
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='collected_gems')
    gem = models.ForeignKey(Gem, on_delete=models.CASCADE, related_name='collected_by_teams')
    flag_used = models.ForeignKey(Flag, on_delete=models.SET_NULL, null=True, related_name='team_collection')
    collected_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = [('team', 'gem')]  # Team can only collect each gem once
        ordering = ['-collected_at']
    
    def __str__(self):
        return f"{self.team.name} collected {self.gem.name}"

