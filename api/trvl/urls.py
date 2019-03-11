from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

# Registering the view with airports endpoint
router.register('airports', views.AirportView)

urlpatterns = [
    path('', include(router.urls))
]