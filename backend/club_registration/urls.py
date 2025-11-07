from django.urls import path
from .views import ClubRegistrationView

urlpatterns = [
    path('register/', ClubRegistrationView.as_view(), name='club_register'),
]