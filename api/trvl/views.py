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
    carrier_regex = re.compile(r'http://(?:.*)/api/carriers/([a-zA-Z]+)/', re.I | re.U | re.M)
    #def create(self, request):

    def list(self, request):
        # Getting only name and code, the carriers will show up only on the airport detail
        airports = models.Airport.objects.only('name', 'code')
        # Getting the data in the proper way -> serialized
        data = serializers.AirportListSerializer(airports, many=True, context={'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # Get the instance of the given airport by its code
        airport = self.get_object()
        serializer = serializers.AirportDetailSerializer(airport, context={'request': request})
        
        # Overriding the original data for more features
        data = serializer.data
        # Creating the carrier links 
        data['carriers'] = ['http://%s/api/carriers/%s/' % (request.get_host(), carrier) for carrier in data['carriers']]
        
        return Response(data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        serializer = serializers.AirportDetailSerializer(
            instance=instance,
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid(raise_exception=True):
            # Getting the user inputed carriers after it was validated by the serializer
            carriers = set(request.data['carriers'])    

            # Adding new carriers to the current airport list of carriers without deleting the old ones
            for carrier in serializer.validated_data['carriers']:
                carriers.add(carrier)

            # Saving alterations to the db
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

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
        
    #     serializer = serializers.AirportDetailSerializer(
    #         instance=instance,
    #         data=request.data,
    #         context={'request': request}
    #     )
        
    #     carriers = set(request.data['carriers'])    

    #     if serializer.is_valid(raise_exception=True):
    #         for carrier in serializer.validated_data['carriers']:
    #             carriers.add(carrier)

    #         serializer.save(carriers=carriers)
            
    #     return Response(serializer.data)