from rest_framework import serializers
from . import models

class AirportListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='airport-detail')

    class Meta:
        model = models.Airport
        fields = ('code', 'name', 'url')

class AirportDetailSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='airport-detail')
    
    # carriers = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='carrier-detail'
    # )
    
    class Meta:
        model = models.Airport
        fields = ('code', 'name', 'url', 'carriers')

class CarrierListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Carrier
        fields = ('name', 'code', 'url')


class CarrierDetailSerializer(serializers.HyperlinkedModelSerializer):
    airports = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='airport-detail'
    )
    class Meta:
        model = models.Carrier
        fields = ('name', 'code', 'url', 'airports')

