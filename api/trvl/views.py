import re
from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
from rest_framework.request import Request


class AirportView(viewsets.ModelViewSet):
    """
    retrieve:
    Return the given airport.

    list:
    Returns json/csv list of links to the available airports in the USA.

    create:
    Create a new user instance.

    update:
    Updates the specified airport.

    partial_update:
    Does the partial update of the airport.

    delete:
    Deletes the specified airport.
    """
    queryset = models.Airport.objects.all()
    serializer_class = serializers.AirportDetailSerializer
    
    def list(self, request):
        # Getting only name and code, the carriers will show up only on the airport detail
        airports = models.Airport.objects.all()
        # Getting the data in the proper way -> serialized
        data = serializers.AirportListSerializer(airports, many=True, context={'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # Get the instance of the given airport by its code
        airport = self.get_object()

        serializer = serializers.AirportDetailSerializer(airport, context={'request': request})

        # Waiting for statistics and routes
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        serializer = serializers.AirportDetailSerializer(
            instance=instance,
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(carriers=carriers)
        
        return Response(serializer.data)

class CarrierView(viewsets.ModelViewSet):
    queryset = models.Carrier.objects.all()
    serializer_class = serializers.CarrierDetailSerializer

    def list(self, request):
        carriers = models.Carrier.objects.only('name', 'code')
        data = serializers.CarrierListSerializer(carriers, many=True, context={'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        carrier = self.get_object()
        serializer = serializers.CarrierDetailSerializer(carrier, context={'request': request})
        print(serializer.data)
        return Response(serializer.data)