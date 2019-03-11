from rest_framework import serializers
from . import models

class AirportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Airport
        fields = ('id', 'url', 'name', 'code')