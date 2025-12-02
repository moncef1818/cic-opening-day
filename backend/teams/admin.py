from django.contrib import admin
from .models import Team

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    """
    Admin Pannel for team Managment 
    Yst3mlouha Jma3at HR bch yrigistriw l teams
    """
    list_display = ('id','name','created_at')
    search_fields = ('name',)
    readonly_fields = ('created_at',)
    ordering = ('name',)

        # Override save to handle password hashing in admin
    def save_model(self, request, obj, form, change):
        # If password was changed in admin, hash it
        if 'password' in form.changed_data:
            obj.set_password(form.cleaned_data['password'])
        else:
            super().save_model(request, obj, form, change)




# Register your models here.
