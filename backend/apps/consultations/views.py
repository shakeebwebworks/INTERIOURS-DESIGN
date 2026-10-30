from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .serializers import ConsultationRequestSerializer

SUCCESS_MESSAGE = "Thank you! Your consultation request has been received. We will contact you soon."


class ConsultationCreateView(APIView):
    # Public form: no login, so no session auth. Protected by CORS, throttling,
    # server-side validation, duplicate detection and a honeypot field.
    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "consultation"

    def post(self, request):
        # Honeypot: bots fill hidden fields, humans never see them.
        if request.data.get("website"):
            return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_201_CREATED)

        serializer = ConsultationRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": SUCCESS_MESSAGE}, status=status.HTTP_201_CREATED)