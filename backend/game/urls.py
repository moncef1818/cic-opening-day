from django.urls import path
from .views import FlagSubmitView, LeaderboardView, TeamStatsView

urlpatterns = [
    path('flags/submit/', FlagSubmitView.as_view(), name='flag-submit'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('team-stats/', TeamStatsView.as_view(), name='team-stats'),
]
