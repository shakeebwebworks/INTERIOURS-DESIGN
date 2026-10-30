from django.urls import path

from .views import ConsultationCreateView

urlpatterns = [
    path("", ConsultationCreateView.as_view(), name="consultation-create"),
]