from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import TeamLoginSerializer, TeamSerializer
from .models import Team


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


class TeamCurrentView(APIView):
    """
    Get current team information from JWT token.
    
    GET /api/teams/my/
    Headers: Authorization: Bearer <access_token>
    Response: {id, name, created_at}
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Extract team_id from JWT token
        token = request.auth
        team_id = token.get('team_id') if token else None
        
        if not team_id:
            return Response(
                {'error': 'Invalid token: team_id not found'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            team = Team.objects.get(id=team_id)
            serializer = TeamSerializer(team)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Team.DoesNotExist:
            return Response(
                {'error': 'Team not found'},
                status=status.HTTP_404_NOT_FOUND
            )
