from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Sum
from .models import Flag, FlagSubmission
from .serializers import FlagSubmitSerializer, LeaderboardSerializer
from teams.models import Team
import hashlib

from django.contrib.auth.hashers import make_password

class FlagSubmitView(APIView):
    """Submit a flag code."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = FlagSubmitSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        flag_code = serializer.validated_data['flag_code']
        
        # Get team from JWT token
        team_id = request.auth.get('team_id')
        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
        # Hash submitted flag using SHA256 (NOT Django password hasher!)
        submitted_hash = hashlib.sha256(flag_code.encode()).hexdigest()
        
        # Direct database lookup
        try:
            matching_flag = Flag.objects.get(code_hash=submitted_hash, is_used=False)
        except Flag.DoesNotExist:
            return Response({
                'error': 'Invalid flag code or already used'
            }, status=status.HTTP_404_NOT_FOUND)
        

        if FlagSubmission.objects.filter(team=team, flag__stand=matching_flag.stand).exists():
            return Response({
                'error': f'You already submitted a flag from {matching_flag.stand.name}. Only one flag per stand allowed!'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        
        # Mark flag as used
        matching_flag.is_used = True
        matching_flag.save()
        
        # Create submission
        FlagSubmission.objects.create(
            team=team,
            flag=matching_flag,
            awarded_points=matching_flag.base_points
        )
        
        return Response({
            'success': True,
            'message': 'Flag submitted successfully!',
            'points_earned': matching_flag.base_points,
            'stand': matching_flag.stand.name
        }, status=status.HTTP_201_CREATED)
    
class LeaderboardView(APIView):
    """
    Get game leaderboard.
    
    GET /api/game/leaderboard/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Calculate team stats
        teams = Team.objects.annotate(
            total_points=Sum('flag_submissions__awarded_points'),
            total_gems=Count('flag_submissions', distinct=True)
        ).filter(total_points__isnull=False).order_by('-total_gems' , '-total_points')
        
        # Build leaderboard data
        leaderboard = []
        for rank, team in enumerate(teams, start=1):
            leaderboard.append({
                'rank': rank,
                'team_name': team.name,
                'total_gems': team.total_gems or 0,
                'total_points': team.total_points or 0
            })
        
        serializer = LeaderboardSerializer(leaderboard, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TeamStatsView(APIView):
    """
    Get current team's statistics.
    
    GET /api/game/team-stats/
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get team from token
        team_id = request.auth.get('team_id')
        try:
            team = Team.objects.annotate(
                total_points=Sum('flag_submissions__awarded_points'),
                total_gems=Count('flag_submissions', distinct=True)
            ).get(id=team_id)
        except Team.DoesNotExist:
            return Response({'error': 'Team not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate rank
        better_teams = Team.objects.annotate(
            total_points=Sum('flag_submissions__awarded_points'),
            total_gems=Count('flag_submissions', distinct=True)
        ).filter(
            total_points__gt=team.total_points or 0
        ).count()
        
        rank = better_teams + 1
        
        return Response({
            'team_name': team.name,
            'total_gems': team.total_gems or 0,
            'total_points': team.total_points or 0,
            'rank': rank
        }, status=status.HTTP_200_OK)

