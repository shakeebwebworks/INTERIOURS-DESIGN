from rest_framework.generics import ListAPIView

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True)