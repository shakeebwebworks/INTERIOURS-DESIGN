from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Project
from .serializers import ProjectDetailSerializer, ProjectListSerializer


class ProjectListView(ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        queryset = Project.objects.filter(is_active=True)
        if self.request.query_params.get("featured", "").lower() == "true":
            queryset = queryset.filter(is_featured=True)
        return queryset


class ProjectDetailView(RetrieveAPIView):
    serializer_class = ProjectDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Project.objects.filter(is_active=True).prefetch_related("images")