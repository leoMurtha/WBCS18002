from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework.serializers import JSONField

class Carrier(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    name = models.TextField()
    
    def __str__(self):
        return self.name

class Airport(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    name = models.TextField()
    
    def __str__(self):
        return self.name

class FlightStatistics(models.Model):
    cancelled = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    on_time = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    total = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    delayed = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    diverted = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return str(self.id)

class DelayCountStatistics(models.Model):
    late_aircraft = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    weather = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    security = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    national_aviation_system = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    carrier = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return self.name

class DelayTimeStatistics(models.Model):
    late_aircraft = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    weather = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    security = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    national_aviation_system = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)
    carrier = models.IntegerField(validators=[MinValueValidator(0, message='Invalid value: negative.')], default=0)

    def __str__(self):
        return self.name

class Statistics(models.Model):
    airport = models.ForeignKey(Airport, on_delete=models.CASCADE)
    carrier = models.ForeignKey(Carrier, on_delete=models.CASCADE)
    month = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)])
    year = models.IntegerField(validators=[MinValueValidator(1900, message='Invalid year: year < 1900.')])
    # statistics linkage
    flight_statistic = models.ForeignKey(FlightStatistics, on_delete=models.DO_NOTHING)
    delay_count_statistic = models.ForeignKey(DelayCountStatistics, on_delete=models.DO_NOTHING)
    delay_time_statistic = models.ForeignKey(DelayTimeStatistics, on_delete=models.DO_NOTHING)
    
    # Guaranteeing the "primary key" of the tuple
    class Meta:    
        unique_together = ('airport', 'carrier', 'month', 'year')

    def __str__(self):
        return '%s_%s_%s_%s' % (self.airport, self.carrier, self.month, self.year)