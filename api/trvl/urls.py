from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url

router = routers.DefaultRouter()

# Registering the view with airports endpoint
router.register('airports', views.AirportView)
router.register('carriers', views.CarrierView)
router.register('statistics', views.StatisticsView)

urlpatterns = [
    path('', include(router.urls)),
    path('statistics/flights/', views.FlightStatisticsView),
    url('statistics/delaycount', views.DelayCountStatisticsView),
    url('statistics/delaytime', views.DelayTimeStatisticsView)
]

#urlpatterns = format_suffix_patterns(urlpatterns)