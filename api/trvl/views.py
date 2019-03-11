from django.shortcuts import render
from rest_framework import viewsets
from . import models
from .serializers import AirportSerializer

class AirportView(viewsets.ModelViewSet):
    queryset = models.Airport.objects.all()
    serializer_class = AirportSerializer

