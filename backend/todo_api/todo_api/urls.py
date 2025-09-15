from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet
from tasks.auth_views import register
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'api/tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/register', register),
    path('api/auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # API
    path('', include(router.urls)),
]
