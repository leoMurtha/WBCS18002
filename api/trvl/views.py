import re
from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from drf_writable_nested import NestedCreateMixin, NestedUpdateMixin
from rest_framework.generics import GenericAPIView

class CarrierView(viewsets.ModelViewSet):
    queryset = models.Carrier.objects.all()
    serializer_class = serializers.CarrierSerializer

    def get_airports(self, request, carrier_id):
        airports_id = models.Statistics.objects.filter(carrier=carrier_id).distinct('airport').values('airport')
        #print(airports_id) # DEBUG
        # loading related airports data
        airport_code = []
        for id in airports_id:
            airport_code.append(id['airport'])
        airports = models.Airport.objects.filter(code__in = airport_code)
        #print(airports) # DEBUG
        airports_serializer = serializers.AirportSerializer(
           airports, many=True, context={'request': request})
        
        return airports_serializer.data
        

    def list(self, request):
        # getting carriers list from database
        #carriers = models.Carrier.objects.only('code', 'name')
        carriers = self.queryset
        # serializing carrier data
        #data = serializers.CarrierSerializer(carriers, many=True, context={'request': request}).data
        serializer = self.serializer_class(
            carriers, many=True, context={'request': request})
        data = serializer.data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # loading carrier general data
        carrier = self.get_object()
        serializer = self.serializer_class(
            carrier, context={'request': request})
        general_data = serializer.data

        # loading related airports ids
        carrier_id = carrier.code
        
        airports_data = self.get_airports(request, carrier_id)
        #print(general_data) # DEBUG
        #print(airports_data) # DEBUG

        return Response({'Carrier': general_data,
                         'Airports': airports_data})



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

    def get_carriers(self, request, airport_id):
        carriers_id = models.Statistics.objects.filter(airport=airport_id).distinct('carrier').values('carrier')
        #print(carriers_id) # DEBUG
        # loading related airports data
        carrier_code = []
        for id in carriers_id:
            carrier_code.append(id['carrier'])
        #print(carrier_code) # DEBUG
        carriers = models.Carrier.objects.filter(code__in = carrier_code)
        #print(carriers) # DEBUG
        carriers_serializer = serializers.CarrierSerializer(
           carriers, many=True, context={'request': request})
        
        return carriers_serializer.data

    def list(self, request):
        # Getting only name and code, the carriers will show up only on the airport detail
        airports = models.Airport.objects.all()
        # Getting the data in the proper way -> serialized
        data = self.serializer_class(airports, many=True, context={
                                     'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # Get the instance of the given airport by its code
        airport = self.get_object()
        statistics = models.Statistics.objects.filter(airport=airport.code)

        serializer = self.serializer_class(
            airport, context={'request': request})
        general_data = serializer.data

        carriers_data = self.get_carriers(request=request, airport_id=airport.code)
        
        #print(general_data) # DEBUG
        #print(airports_data) # DEBUG

        return Response({'Airport': general_data,
                         'Carriers': carriers_data})

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

    @action(detail=True, methods=['get'])
    def routes(self, request, *args, **kwargs):
        """Routes method:
        Gets the route for the given airport.
        A route is basically a airport <-carrier-> airport relationship
        """
        airport = self.get_object()
        destination = self.request.query_params.get('destination', None)

        if destination:
            pass
        else:
            carriers = self.get_carriers(request, airport.code)

            routes = set()
            for carrier in carriers:
                routes.update([destination['url'] for destination in CarrierView().get_airports(request=request, carrier_id=carrier['code']) if destination['code'] != airport.code])

        serializer = self.serializer_class(airport, context={'request': request})
        data = serializer.data
        data['routes'] = routes

        return Response(data)


class StatisticsView(viewsets.ModelViewSet):
    queryset = models.Statistics.objects.all()
    serializer_class = serializers.StatisticsSerializer
