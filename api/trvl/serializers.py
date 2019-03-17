from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
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


class CarrierSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='carrier-detail')

    class Meta:
        model = models.Carrier
        fields = ('code', 'name', 'url')


#class CarrierDetailSerializer(serializers.ModelSerializer):
#    url = serializers.HyperlinkedIdentityField(view_name='carrier-detail')
#
#    #airports = serializers.HyperlinkedRelatedField(
#    #    many=True,
#    #    read_only=True,
#    #    view_name='airport-detail'
#    #)
#
#    class Meta:
#        model = models.Carrier
#        fields = ('name', 'code', 'url')


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


class StatisticsSerializer(WritableNestedModelSerializer):
    # Using nest serializer for handling get and post
    # Using serializers instead of the model fields
    flight = FlightStatisticsSerializer(many=False)
    delaycount = DelayCountStatisticsSerializer(many=False)
    delaytime = DelayTimeStatisticsSerializer(many=False)

    class Meta:
        model = models.Statistics
        fields = ('airport', 'carrier', 'month', 'year',
                  'flight', 'delaytime', 'delaycount')
