from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
from . import models


class AirportSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='airport-detail')

    class Meta:
        model = models.Airport
        fields = ('code', 'name', 'url')


class CarrierSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='carrier-detail')

    class Meta:
        model = models.Carrier
        fields = ('code', 'name', 'url')


# class CarrierDetailSerializer(serializers.ModelSerializer):
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


class DelayCountStatisticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.DelayCountStatistics
        fields = '__all__'


class DelayTimeStatisticsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.DelayTimeStatistics
        fields = '__all__'


class StatisticsSerializer(serializers.ModelSerializer):
    # Using nest serializer for handling get and post
    # Using serializers instead of the model fields
    url = serializers.HyperlinkedIdentityField(view_name='statistics-detail')
    flight = FlightStatisticsSerializer(allow_null=True)
    delay_count = DelayCountStatisticsSerializer(allow_null=True)
    delay_time = DelayTimeStatisticsSerializer(allow_null=True)

    class Meta:
        model = models.Statistics
        fields = ('url','airport', 'carrier', 'month', 'year',
                  'flight', 'delay_time', 'delay_count')

    def create(self, validated_data):
        flight_statistics = models.FlightStatistics.objects.create(
            **(validated_data.pop('flight')))
        delay_time_statistics = models.DelayTimeStatistics.objects.create(
            **(validated_data.pop('delay_time')))
        delay_count_statistics = models.DelayCountStatistics.objects.create(
            **(validated_data.pop('delay_count')))
        print(flight_statistics)

        statistics = models.Statistics.objects.create(**validated_data, flight=flight_statistics,
                                                      delay_time=delay_time_statistics, delay_count=delay_count_statistics)
        
        return statistics

    def update(self, instance, validated_data):
        flight, _ = models.FlightStatistics.objects.update_or_create(id=instance.flight.id, defaults=validated_data.pop('flight'))
        delay_time, _ = models.DelayTimeStatistics.objects.update_or_create(id=instance.delay_time.id, defaults=validated_data.pop('delay_time'))
        delay_count, _ = models.DelayCountStatistics.objects.update_or_create(id=instance.delay_count.id, defaults=validated_data.pop('delay_count'))
        new_instance, _ = models.Statistics.objects.update_or_create(id=instance.id, defaults=validated_data)
        
        return new_instance
