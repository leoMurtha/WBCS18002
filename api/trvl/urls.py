from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.DefaultRouter()

# Registering the view with airports endpoint
router.register('airports', views.AirportView)
router.register('carriers', views.CarrierView)

urlpatterns = [
    path('', include(router.urls))
]

#urlpatterns = format_suffix_patterns(urlpatterns)