from rest_framework import serializers
from . import models

class AirportListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='airport-detail')

    class Meta:
        model = models.Airport
        fields = ('code', 'name', 'url')

class AirportDetailSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='airport-detail')
    
    class Meta:
        model = models.Airport
        fields = ('code', 'name', 'url')    

class CarrierListSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Carrier
        fields = ('name', 'code', 'url')


class CarrierDetailSerializer(serializers.ModelSerializer):
    airports = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='airport-detail'
    )
    class Meta:
        model = models.Carrier
        fields = ('name', 'code', 'url')

class StatisticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Statistics
        fields = '__all__'

class FlightStatisticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.FlightStatistics
        fields = '__all__'

class DelayCountStatisticsSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.DelayCountStatistics
        fields = '__all__'

class DelayTimeStatisticsSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.DelayTimeStatistics
        fields = '__all__'
