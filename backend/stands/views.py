from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Stand
from .serializers import StandSerializer

class StandListView(APIView):
    """
    Get list of all stands.
    
    GET /api/stands/
    Response: [{id, name, game_type, description, duration_minutes}, ...]
    """
    permission_classes = [IsAuthenticated]

    def get(self , request):
        stands = Stand.objects.all()
        serializer = StandSerializer(stands,many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
