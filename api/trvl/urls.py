from django.urls import path, include
from . import views
from rest_framework import routers
from django.conf.urls import url

router = routers.DefaultRouter()

# Registering the view with airports endpoint
router.register('airports', views.AirportView)
router.register('carriers', views.CarrierView)
router.register('statistics', views.StatisticsView)

urlpatterns = [
    path('', include(router.urls))
]
