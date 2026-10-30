from datetime import timedelta

from django.core.validators import RegexValidator
from django.utils import timezone
from rest_framework import serializers

from .models import ConsultationRequest

phone_validator = RegexValidator(
    regex=r"^\+?[0-9\s\-()]{7,20}$",
    message="Enter a valid phone number (digits, spaces, +, -, brackets).",
)


class ConsultationRequestSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=20, validators=[phone_validator])

    class Meta:
        model = ConsultationRequest
        fields = [
            "name", "email", "phone", "project_type",
            "location", "budget", "timeline", "message",
        ]
        extra_kwargs = {"message": {"max_length": 2000}}

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your full name.")
        return value

    def validate_email(self, value):
        return value.strip().lower()

    def validate_location(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your project location.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Please tell us a little more (at least 10 characters).")
        if value.lower().count("http") > 2:
            raise serializers.ValidationError("Please remove extra links from your message.")
        return value

    def validate(self, attrs):
        window_start = timezone.now() - timedelta(minutes=10)
        already_sent = ConsultationRequest.objects.filter(
            email__iexact=attrs["email"],
            project_type=attrs["project_type"],
            created_at__gte=window_start,
        ).exists()
        if already_sent:
            raise serializers.ValidationError(
                "We have already received your request. Our team will contact you shortly."
            )
        return attrs