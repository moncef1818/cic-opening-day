from django.urls import path
from .views import TeamLoginView, TeamCurrentView

urlpatterns = [
    path('login/', TeamLoginView.as_view(), name='team-login'),
    path('my/', TeamCurrentView.as_view(), name='team-current'),
]