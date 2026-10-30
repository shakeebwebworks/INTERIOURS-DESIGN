from rest_framework import serializers

from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            "hero_image", "hero_image_alt", "studio_address", "phone", "email",
            "studio_hours", "instagram_url", "pinterest_url", "linkedin_url",
        ]