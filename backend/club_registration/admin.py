from django.contrib import admin
from .models import ClubMember

@admin.register(ClubMember)
class ClubMemberAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'school', 'year', 'department_choice_1', 'registered_at')
    list_filter = ('year', 'school', 'department_choice_1', 'department_choice_2')
    search_fields = ('first_name', 'last_name', 'email', 'discord')
    readonly_fields = ('registered_at',)
