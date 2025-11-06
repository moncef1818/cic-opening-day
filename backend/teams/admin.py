from django.contrib import admin
from .models import Team, TeamMember

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'member_count', 'total_points', 'created_at')
    search_fields = ('name',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'team', 'joined_at')
    list_filter = ('team',)
    search_fields = ('user__username', 'team__name')
