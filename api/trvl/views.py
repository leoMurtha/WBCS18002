from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
from rest_framework.request import Request


class AirportView(viewsets.ModelViewSet):
    queryset = models.Airport.objects.all()
    serializer_class = serializers.AirportDetailSerializer

    #def create(self, request):

    def list(self, request):
        airports = models.Airport.objects.only('name', 'code')
        data = serializers.AirportListSerializer(airports, many=True, context={'request': request}).data
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        airport = self.get_object()
        serializer = serializers.AirportDetailSerializer(airport, context={'request': request})
        #print(serializer.data)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        serializer = serializers.AirportDetailSerializer(
            instance=instance,
            data=request.data,
            context={'request': request}
        )
        
        carriers = set(dict(request.data)['carriers'])
        
        
        if serializer.is_valid(raise_exception=True):
            print(serializer.validated_data)
            for carrier in serializer.validated_data['carriers']:
                carriers.add(carrier)

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