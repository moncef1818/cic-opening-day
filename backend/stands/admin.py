from django.contrib import admin
from .models import Gem, Flag

@admin.register(Gem)
class GemAdmin(admin.ModelAdmin):
    list_display = ('name', 'gem_type', 'kingdom', 'points', 'is_active')
    list_filter = ('gem_type', 'kingdom', 'is_active')
    search_fields = ('name', 'description')

@admin.register(Flag)
class FlagAdmin(admin.ModelAdmin):
    list_display = ('gem', 'is_used', 'used_by', 'used_at', 'created_at')
    list_filter = ('is_used', 'gem__gem_type', 'gem__kingdom')
    search_fields = ('gem__name', 'used_by__username')
    readonly_fields = ('flag_code_hash', 'used_at', 'created_at')
