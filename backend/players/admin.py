from django.contrib import admin
from .models import TeamGemCollection

@admin.register(TeamGemCollection)
class TeamGemCollectionAdmin(admin.ModelAdmin):
    list_display = ('team', 'gem', 'collected_at')
    list_filter = ('gem__gem_type', 'collected_at')
    search_fields = ('team__name', 'gem__name')
