from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Team

class TeamLoginSerialzer(serializers.Serializer):
    """
    hada serializer bach team ydir login nhar lou3ba
    n7tajou nvalidiw name ta3 team wel password
    """
    team_name = serializers.CharField(max_length=100)
    password = serializers.CharField(
        write_only = True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        """ Check team name wel password esq y existiw"""

        team_name = data.get('team_name')
        password = data.get('password') 

        try:
            team = Team.objects.get(name = team_name)
        except Team.DoesNotExist:
            raise serializers.ValidationError(
                {"team_name": "Team not found."}
            )
        if not team.check_password(password):
            raise serializers.ValidationError(
                {"password": "Invalid password."}
            )
        
        data['team'] = team

        return data

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model.
    Returns team information (without password) ll authenticated users    """
    class Meta:
        model = Team
        fields = ['id', 'name', 'created_at']
        read_only_fields = ['id', 'created_at']
