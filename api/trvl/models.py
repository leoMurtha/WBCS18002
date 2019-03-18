from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework.serializers import JSONField


"""
A model is the django-python representation of SQL table.
"""

class Airport(models.Model):
    """Instace: {code*, name}, pk=code"""

    code = models.CharField(max_length=10, primary_key=True)
    name = models.TextField()

    def __str__(self):
        return self.name


class Carrier(models.Model):
    """Instace: {code*, name}, pk=code"""
    code = models.CharField(max_length=10, primary_key=True)
    name = models.TextField()

    def __str__(self):
        return self.name


class FlightStatistics(models.Model):
    """Instace: {id*, cancelled, on_time, total, delayed, diverted}"""

    cancelled = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    on_time = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    total = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    delayed = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    diverted = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return str(self.id)


class DelayCountStatistics(models.Model):
    """Instace: {late_aircraft, weather, security, national_aviation_system, carrier}"""

    late_aircraft = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    weather = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    security = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    national_aviation_system = models.IntegerField(
        validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    carrier = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return self.id


class DelayTimeStatistics(models.Model):
    """Instace: {late_aircraft, weather, security, national_aviation_system, carrier}"""
    late_aircraft = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    weather = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    security = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)
    national_aviation_system = models.IntegerField(
        validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    carrier = models.IntegerField(validators=[MinValueValidator(
        0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return self.id


class Statistics(models.Model):
    """Instance: {airport_code, carrier_code, month, year, flight, delay_count, delay_time}"""
    airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='airport')
    carrier = models.ForeignKey(Carrier, on_delete=models.CASCADE, related_name='carrier')
    month = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.IntegerField(validators=[MinValueValidator(
        1900, message='Invalid year: year < 1900.')])
    # statistics linkage
    flight = models.ForeignKey(
        FlightStatistics,null=True, on_delete=models.DO_NOTHING)
    delay_count = models.ForeignKey(
        DelayCountStatistics,null=True, on_delete=models.DO_NOTHING)
    delay_time = models.ForeignKey(
        DelayTimeStatistics,null=True, on_delete=models.DO_NOTHING)

    # Guaranteeing the "primary key" of the tuple
    class Meta:
        unique_together = ('airport', 'carrier', 'month', 'year')

    def __str__(self):
        return '%s_%s_%s_%s' % (self.airport, self.carrier, self.month, self.year)
