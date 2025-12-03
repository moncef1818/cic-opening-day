from rest_framework import serializers
from .models import Stand


class StandSerializer(serializers.ModelSerializer):
    """
    Serializer for Stand model.
    Returns stand information for teams.
    """
    class Meta:
        model = Stand
        fields = ['id', 'name', 'game_type', 'description', 'duration_minutes']
        read_only_fields = ['id']
