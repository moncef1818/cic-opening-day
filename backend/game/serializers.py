from rest_framework import serializers
from .models import Flag, FlagSubmission


class FlagSubmitSerializer(serializers.Serializer):
    """Serializer for flag submission input with validation"""
    flag_code = serializers.CharField(max_length=200)
    
    def validate_flag_code(self, value):
        # Check format: CIC{...}
        if not re.match(r'^CIC\{.+\}$', value):
            raise serializers.ValidationError(
                "Invalid flag format. Must start with CIC{ and end with }"
            )
        
        # Check minimum length (prevent empty flags like CIC{})
        if len(value) < 10:
            raise serializers.ValidationError(
                "Flag is too short"
            )
        
        return value


class FlagSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for flag submission response"""
    team_name = serializers.CharField(source='team.name', read_only=True)
    stand_name = serializers.CharField(source='flag.stand.name', read_only=True)
    
    class Meta:
        model = FlagSubmission
        fields = ['id', 'team_name', 'stand_name', 'awarded_points', 'submitted_at']
        read_only_fields = ['id', 'submitted_at']


class LeaderboardSerializer(serializers.Serializer):
    """Serializer for leaderboard data"""
    rank = serializers.IntegerField()
    team_name = serializers.CharField()
    total_gems = serializers.IntegerField()
    total_points = serializers.IntegerField()


class TeamStatsSerializer(serializers.Serializer):
    """Serializer for team statistics"""
    team_name = serializers.CharField()
    total_gems = serializers.IntegerField()
    total_points = serializers.IntegerField()
    rank = serializers.IntegerField()
