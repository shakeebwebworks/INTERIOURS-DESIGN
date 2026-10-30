from rest_framework.generics import RetrieveAPIView

from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    throttle_classes = []  # read-only public data that every page load needs

    def get_object(self):
        return SiteSettings.load()