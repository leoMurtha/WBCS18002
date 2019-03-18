import re
from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from drf_writable_nested import NestedCreateMixin, NestedUpdateMixin


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
    serializer_class = serializers.AirportSerializer
    
    def list(self, request):
        # Getting only name and code, the carriers will show up only on the airport detail
        airports = models.Airport.objects.all()
        # Getting the data in the proper way -> serialized
        data = self.serializer_class(airports, many=True, context={'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # Get the instance of the given airport by its code
        airport = self.get_object()
        statistics = models.Statistics.objects.filter(airport=airport.code)     

        serializer = self.serializer_class(airport, context={'request': request})
        data = serializer.data

        data['statistics'] = statistics
        # Waiting for statistics and routes
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        serializer = self.serializer_class(
            instance=instance,
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(carriers=carriers)
        
        return Response(serializer.data)

class CarrierView(viewsets.ModelViewSet):
    '''
    
    '''
    queryset = models.Carrier.objects.all()
    serializer_class = serializers.CarrierSerializer

    def list(self, request):
        # getting carriers list from database
        #carriers = models.Carrier.objects.only('code', 'name') 
        carriers = self.queryset
        # serializing carrier data
        #data = serializers.CarrierSerializer(carriers, many=True, context={'request': request}).data
        serializer = self.serializer_class(carriers, many=True, context={'request': request})
        data = serializer.data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # loading carrier general data
        carrier = self.get_object()
        serializer = self.serializer_class(carrier, context={'request': request})
        general_data = serializer.data
        # loading related airports data
        carrier_id = carrier.code
        airports = models.Statistics.objects.filter(carrier = carrier_id)
        airports_serializer = serializers.AirportSerializer(airports, many=True, context={'request': request})
        airports_data = airports_serializer.data
        #print(airports_data) # DEBUG

        return Response(general_data)

class StatisticsView(viewsets.ModelViewSet, NestedCreateMixin, NestedUpdateMixin):
    queryset = models.Statistics.objects.all()
    serializer_class = serializers.StatisticsSerializer