from django.db import models

class Stand(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True,
        help_text="the name of the stand"
    )

    game_type = models.CharField(
        max_length=100,
        help_text="Type of game/challenge (e.g., 'Arduino', 'Memory flip', 'Hacking room')"
    )

    duration_minutes = models.IntegerField(
        default=15,
        help_text="Recommended time for this challenge (minutes)"
    )


    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Stand"
        verbose_name_plural = "Stands"
    
    def __str__(self):
        return f"{self.name} ({self.game_type})"

