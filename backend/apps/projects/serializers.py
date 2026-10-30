from rest_framework import serializers

from .models import Project, ProjectImage


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ["id", "image", "alt_text"]


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "location", "style", "summary",
            "cover_image", "cover_alt", "year", "is_featured",
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "location", "style", "summary", "description",
            "area_sqft", "duration_months", "year", "cover_image", "cover_alt",
            "is_featured", "images",
        ]