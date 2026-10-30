from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.html import format_html

from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    readonly_fields = ("hero_preview",)
    fieldsets = (
        ("Homepage photo", {"fields": ("hero_image", "hero_preview", "hero_image_alt")}),
        ("Studio contact details", {"fields": ("studio_address", "phone", "email", "studio_hours")}),
        ("Social links", {"fields": ("instagram_url", "pinterest_url", "linkedin_url")}),
    )

    @admin.display(description="Current photo")
    def hero_preview(self, obj):
        if obj and obj.hero_image:
            return format_html('<img src="{}" alt="" style="height:140px;width:auto;border-radius:4px;">', obj.hero_image.url)
        return "No photo uploaded yet (the default is used)."

    # There is only one settings record, so skip the list page and go straight to editing it.
    def changelist_view(self, request, extra_context=None):
        obj = SiteSettings.load()
        return redirect(reverse("admin:siteconfig_sitesettings_change", args=[obj.pk]))

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False