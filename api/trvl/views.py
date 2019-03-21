import numpy as np
from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView


class CarrierView(viewsets.ModelViewSet):
    queryset = models.Carrier.objects.all()
    serializer_class = serializers.CarrierSerializer

    def get_airports(self, request, carrier_id):
        # loading carrier related airports
        airports_models = models.Statistics.objects.filter(
            carrier=carrier_id).distinct('airport').values('airport')
        # extracting code
        codes = []
        for item in airports_models:
            codes.append(item['airport'])
        # loading data
        airports = models.Airport.objects.filter(code__in=codes)
        airports_serializer = serializers.AirportSerializer(
            airports, many=True, context={'request': request})

        return airports_serializer.data

    def list(self, request):
        # getting carriers list from database
        carriers = self.queryset
        # serializing carrier data
        serializer = self.serializer_class(
            carriers, many=True, context={'request': request})
        data = serializer.data

        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        # retriving specific carrier data
        carrier = self.get_object()
        serializer = self.serializer_class(
            carrier, context={'request': request})
        carrier_data = serializer.data

        carrier_data['statistics'] = '%sstatistics?type=minimal' % (
            request.build_absolute_uri())

        # loading related airports list
        airports_data = self.get_airports(request, carrier.code)

        return Response({'Carrier': carrier_data,
                         'Airports': airports_data})

    @action(detail=True, methods=['get'])
    def statistics(self, request, *args, **kwargs):
        '''
        /carrier/:id/statistics/
        /carrier/:id/statistics?type=:'minimal'&airport=:airport_code
        /carrier/:id/statistics?type=:'flights'&airport=:airport_code
        /carrier/:id/statistics?type=:'delay_minutes'&airport=:airport_code
        /carrier/:id/statistics?type=:'delay_count'&airport=:airport_code
        '''
        # loading carrier data
        carrier_model = self.get_object()
        carrier_serializer = self.serializer_class(
            carrier_model, context={'request': request})
        carrier_data = carrier_serializer.data

        # extracting querys
        statistics_type = self.request.query_params.get('type', None)
        airport = self.request.query_params.get('airport', None)
        month = self.request.query_params.get('month', None)
        year = self.request.query_params.get('year', None)

        # loading statistics relations between airport(s) and carrier based on dates(month,year)
        if not month and not year and not airport:
            statistics_model = models.Statistics.objects.filter(
                carrier=carrier_model.code)
        elif not month and not year:
            statistics_model = models.Statistics.objects.filter(
                airport=airport, carrier=carrier_model.code)
        elif not airport:
            statistics_model = models.Statistics.objects.filter(
                carrier=carrier_model.code, month=month, year=year)
        else:
            statistics_model = models.Statistics.objects.filter(
                airport=airport, carrier=carrier_model.code, month=month, year=year)

        # loading airports codes
        airports = []
        if not airport:
            for item in statistics_model.values('airport'):
                airports.append(item['airport'])
        else:
            airports.append(airport)

        # loading airport(s) data
        airport_model = models.Airport.objects.filter(code__in=airports)
        airport_serializer = serializers.AirportSerializer(
            airport_model, many=True, context={'request': request})
        airports_data = airport_serializer.data

        # extracting date(s)
        months = statistics_model.values('month')
        years = statistics_model.values('year')

        if statistics_type == 'flights' or statistics_type == 'minimal':
            # extracting flights statistics ids
            flights_id = statistics_model.values('flight')
            flights_codes = []
            for id in flights_id:
                flights_codes.append(id['flight'])

            # loading flights serializer
            if statistics_type == 'minimal':
                flights_model = models.FlightStatistics.objects.filter(
                    pk__in=flights_codes).values('id', 'cancelled', 'on_time', 'delayed')
            else:
                flights_model = models.FlightStatistics.objects.filter(
                    pk__in=flights_codes)

            serializer = serializers.FlightStatisticsSerializer(
                flights_model, many=True, context={'request': request})

            statistics_data = serializer.data
        elif statistics_type == "delay_minutes":
            # extracting delay minutes statistics ids
            delay_time_id = statistics_model.values('delay_time')
            delay_time_codes = []
            for id in delay_time_id:
                delay_time_codes.append(id['delay_time'])

            # loading delay_time serializer
            delay_time_model = models.DelayTimeStatistics.objects.filter(
                pk__in=delay_time_codes)
            serializer = serializers.DelayTimeStatisticsSerializer(
                delay_time_model, many=True, context={'request': request})

            statistics_data = serializer.data

        elif statistics_type == "delay_count":
            # extracting delay count statistics ids
            delay_count_id = statistics_model.values('delay_count')
            delay_count_codes = []
            for id in delay_count_id:
                delay_count_codes.append(id['delay_count'])

            # loading delay_count serializer
            delay_count_model = models.DelayCountStatistics.objects.filter(
                pk__in=delay_count_codes)
            serializer = serializers.DelayCountStatisticsSerializer(
                delay_count_model, many=True, context={'request': request})

            statistics_data = serializer.data
        else:
            # loading all statistics data
            statistics_type = "all"

            serializer = serializers.StatisticsSerializer(
                statistics_model, many=True, context={'request': request})
            statistics_data = serializer.data
            # removing repeated data
            for statistic in statistics_data:
                statistic.pop('airport')
                statistic.pop('carrier')
                statistic.pop('month')
                statistic.pop('year')

        
        
        # joining statistics_data and months dates
        data = []
        for i in range(len(airports_data)):
            # if statistics_type == 'minimal':
            #     url = 'http://%s/carriers/%s/statistics?type=minimal&airport=%s'
        
            data.append({'airport': airports_data[i],
                         'date': {'month': months[i]['month'], 'year': years[i]['year']},
                         'statistics': statistics_data[i]})

        return Response({'carrier': carrier_data,
                         statistics_type+'_statistics': data})


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
        # loading airport related carriers codes
        carriers_id = models.Statistics.objects.filter(
            airport=airport_id).distinct('carrier').values('carrier')
        # extracting codes
        carrier_code = []
        for id in carriers_id:
            carrier_code.append(id['carrier'])
        # loading carrier list
        carriers = models.Carrier.objects.filter(code__in=carrier_code)
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
        serializer = self.serializer_class(
            airport, context={'request': request})
        airport_data = serializer.data
        airport_data['routes'] = 'http://%s/api/airports/%s/routes/' % (
            request.get_host(), airport_data['code'])

        # statistics = models.Statistics.objects.filter(airport=airport.code)

        # loading carriers
        carriers_data = self.get_carriers(
            request=request, airport_id=airport.code)

        for carrier in carriers_data:
            carrier['statistics'] = 'http://%s/api/carriers/%s/statistics?type=minimal&airport=%s' % (
                request.get_host(), carrier['code'], airport_data['code'])

        return Response({'Airport': airport_data,
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
        serializer = self.serializer_class(
            airport, context={'request': request})
        data = {'airport': serializer.data}
        data['airport']['routes'] = 'http://%s/api/airports/%s/routes/' % (
            request.get_host(), airport.code)
        data['url'] = request.build_absolute_uri()

        # Getting all carriers operating the specified airport
        carriers = self.get_carriers(request, airport.code)
        # Using sets for hashing and unique list
        carriers_codes = set([carrier['code'] for carrier in carriers])

        destination = self.request.query_params.get('destination', None)
        if destination:
            # Retrieving the destination from the database
            destination = models.Airport.objects.get(code=destination)
            destination_serializer = self.serializer_class(
                destination, context={'request': request})

            data['destination'] = destination_serializer.data

            carrier = self.request.query_params.get('carrier', None)

            if not carrier:
                # Filtering only mutual carriers <-> route
                mutual_carriers = [carrier for carrier in self.get_carriers(
                    request, destination.code) if carrier['code'] in carriers_codes]
            else:
                # For the sake of DRY using mutual_carriers as a list of one carrier
                carrier = models.Carrier.objects.get(code=carrier).__dict__
                # Removing state because of error JSON not serializable
                carrier.pop('_state')
                mutual_carriers = [carrier]

            # For each mutual carrier get the descriptive means about the flight route
            for carrier in mutual_carriers:
                carrier['url'] = 'http://%s/api/carriers/%s' % (
                    request.get_host(), carrier['code'])

                carrier.update({'statistics': {'route': 'http://%s/api/airports/%s/routes?destination=%s&carrier=%s' % (request.get_host(), airport.code, destination.code, carrier['code']),
                                               'delay_time': {'late_aircraft': {}, 'carrier': {
                                               }}, 'delay_count': {'late_aircraft': {}, 'carrier': {}}}})

                # Getting all possible statistics from the mutual carrier and aiports
                statistics = models.Statistics.objects.filter(
                    airport=airport.code, carrier=carrier['code']).values('delay_count', 'delay_time')

                carrier_statistics = []

                # Loading the actual carrier statistics values from the database
                for statistic in statistics:
                    carrier_statistics.append({'delay_time': models.DelayTimeStatistics.objects.get(
                        id=statistic['delay_time']).__dict__, 'delay_count': models.DelayTimeStatistics.objects.get(id=statistic['delay_count']).__dict__})

                # Calculating the descriptive means using numpy and updating the carrier data
                for delay in ['delay_count', 'delay_time']:
                    for delay_type in ['late_aircraft', 'carrier']:
                        agg_statistic = np.array(
                            [statistic[delay][delay_type] for statistic in carrier_statistics])

                        carrier['statistics'][delay][delay_type].update({'mean': np.mean(
                            agg_statistic), 'median': np.median(agg_statistic), 'standard_deviation': np.std(agg_statistic)})

            data['carriers'] = mutual_carriers
        else:

            routes = set()
            for carrier in carriers:
                routes.update(['http://%s/api/airports/%s/routes?destination=%s' % (self.request.get_host(), airport.code, destination['code'])
                               for destination in CarrierView().get_airports(request=request, carrier_id=carrier['code']) if destination['code'] != airport.code])

            data['routes'] = routes

        return Response(data)


class StatisticsView(viewsets.ModelViewSet):
    queryset = models.Statistics.objects.all()
    serializer_class = serializers.StatisticsSerializer
