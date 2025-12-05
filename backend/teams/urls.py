from django.urls import path
from .views import TeamLoginView, TeamCurrentView , TeamRefreshTokenView

urlpatterns = [
    path('login/', TeamLoginView.as_view(), name='team-login'),
    path('my/', TeamCurrentView.as_view(), name='team-current'),
     path('refresh/', TeamRefreshTokenView.as_view(), name='team-refresh'), 
]