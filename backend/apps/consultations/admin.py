from django.contrib import admin

from .models import ConsultationRequest


@admin.register(ConsultationRequest)
class ConsultationRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name", "email", "phone", "project_type",
        "budget", "timeline", "status", "created_at",
    )
    list_filter = ("status", "project_type", "budget", "timeline", "created_at")
    list_editable = ("status",)
    search_fields = ("name", "email", "phone", "location", "message")
    readonly_fields = ("created_at",)
    date_hierarchy = "created_at"
    actions = ["mark_contacted", "mark_closed"]

    @admin.action(description="Mark selected as contacted")
    def mark_contacted(self, request, queryset):
        queryset.update(status=ConsultationRequest.Status.CONTACTED)

    @admin.action(description="Mark selected as closed")
    def mark_closed(self, request, queryset):
        queryset.update(status=ConsultationRequest.Status.CLOSED)