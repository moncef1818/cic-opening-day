from django.urls import path
from .views import FlagSubmitView, LeaderboardView, TeamStatsView , EventPhaseView

urlpatterns = [
    path('flags/submit/', FlagSubmitView.as_view(), name='flag-submit'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
    path('team-stats/', TeamStatsView.as_view(), name='team-stats'),
    path('phase/', EventPhaseView.as_view(), name='event-phase'),
]
