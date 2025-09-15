from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    username = (request.data.get('username') or '').strip()
    password = (request.data.get('password') or '').strip()
    if not username or not password:
        return Response({'error': 'username & password required'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'username taken'}, status=status.HTTP_400_BAD_REQUEST)
    User.objects.create(username=username, password=make_password(password))
    return Response({'status': 'ok'}, status=status.HTTP_201_CREATED)
