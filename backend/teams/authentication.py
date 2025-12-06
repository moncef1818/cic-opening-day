from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import Team


class TeamJWTAuthentication(JWTAuthentication):
    """Custom JWT authentication for Team model"""
    
    def get_user(self, validated_token):
        """
        Override to get Team instead of User from token.
        Returns Team instance which now has is_authenticated property.
        """
        try:
            team_id = validated_token.get('team_id')
            if team_id is None:
                raise InvalidToken('Token contained no team_id')
            
            team = Team.objects.get(id=team_id, is_active=True)
            return team
        except Team.DoesNotExist:
            raise InvalidToken('Team not found or inactive')
