from django.contrib import admin
from .models import Stand

@admin.register(Stand)
class StandAdmin(admin.ModelAdmin):
    """Admin interface for Stand management."""
    list_display = ('name', 'game_type', 'duration_minutes', 'created_at')
    search_fields = ('name', 'game_type')
    list_filter = ('duration_minutes',)
    ordering = ('name',)
    
# Register your models here.
