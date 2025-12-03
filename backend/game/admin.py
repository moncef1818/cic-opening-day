from django.contrib import admin
from .models import Flag, FlagSubmission


@admin.register(Flag)
class FlagAdmin(admin.ModelAdmin):
    list_display = ('id', 'stand', 'base_points', 'is_used', 'created_at')
    list_filter = ('stand', 'base_points', 'is_used')
    ordering = ('stand', 'base_points')
    readonly_fields = ('created_at',)
    
    def save_model(self, request, obj, form, change):
        # If code_hash was manually entered, assume it needs hashing
        # (In practice, you'll import pre-hashed flags via script)
        super().save_model(request, obj, form, change)


@admin.register(FlagSubmission)
class FlagSubmissionAdmin(admin.ModelAdmin):
    list_display = ('team', 'flag', 'awarded_points', 'submitted_at')
    list_filter = ('team', 'submitted_at')
    ordering = ('-submitted_at',)
    readonly_fields = ('submitted_at',)
