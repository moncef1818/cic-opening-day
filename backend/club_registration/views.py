from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import ClubMember
from .serializers import ClubMemberSerializer

class ClubRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = ClubMemberSerializer(data = request.data)

        if serializer.is_valid():
            member = serializer.save()
            return Response({
                'success': True,
                'message': 'Registration successful! Welcome to Cyber Innovators Club! 🎉',
                'member': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Registration failed. Please check your information.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)



# Create your views here.
