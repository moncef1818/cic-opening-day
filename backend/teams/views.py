from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import TeamLoginSerializer, TeamSerializer
from .models import Team
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.exceptions import TokenError

@method_decorator(ratelimit(key='ip', rate='5/m', method='POST'), name='dispatch')
class TeamLoginView(APIView):
    """
    Team login endpoint.
    Authenticates team and returns JWT tokens with team_id in payload.
    
    POST /api/team/login/
    Body: {team_name, password}
    Response: {access token , refresh token, team: {...}}
    """
    permission_classes = []  # Public endpoint
    
    def post(self, request):
        serializer = TeamLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            team = serializer.validated_data['team']
            
            # Generate JWT tokens with team_id in payload
            refresh = RefreshToken.for_user(team)
            
            # Add custom claim: team_id instead of user_id
            refresh['team_id'] = team.id
            refresh['team_name'] = team.name
            
            # Prepare response
            team_data = TeamSerializer(team).data
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'team': team_data
            }, status=status.HTTP_200_OK)
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@method_decorator(ratelimit(key='ip', rate='10/m', method='POST'), name='dispatch')
class TeamRefreshTokenView(APIView):
    """Refresh access token using refresh token. Rate limited to 10/min."""
    permission_classes = []
    def post(self, request):
        refresh_token = request.data.get('refresh')
        
        if not refresh_token:
            return Response({
                'error': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Validate and decode refresh token
            token = RefreshToken(refresh_token)
            
            # Generate new access token
            new_access_token = str(token.access_token)
            
            return Response({
                'access': new_access_token
            }, status=status.HTTP_200_OK)
            
        except TokenError:
            return Response({
                'error': 'Invalid or expired refresh token'
            }, status=status.HTTP_401_UNAUTHORIZED)

class TeamCurrentView(APIView):
    """Get current team information from JWT token."""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Team is now available as request.user
        team = request.user
        serializer = TeamSerializer(team)
        return Response(serializer.data, status=status.HTTP_200_OK)

