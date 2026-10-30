from django.contrib import admin
from django.utils.html import format_html

from .models import Project, ProjectImage


def thumbnail(image_field, height=70):
    if image_field:
        return format_html(
            '<img src="{}" alt="" style="height:{}px;width:auto;border-radius:4px;">',
            image_field.url,
            height,
        )
    return "-"


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ("image", "preview", "alt_text", "order")
    readonly_fields = ("preview",)

    @admin.display(description="Preview")
    def preview(self, obj):
        return thumbnail(obj.image) if obj.pk else "-"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("cover_thumb", "title", "location", "style", "is_featured", "is_active", "order")
    list_display_links = ("cover_thumb", "title")
    list_editable = ("is_featured", "is_active", "order")
    list_filter = ("is_featured", "is_active", "style")
    search_fields = ("title", "location", "style")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("cover_preview",)
    inlines = [ProjectImageInline]

    @admin.display(description="Cover")
    def cover_thumb(self, obj):
        return thumbnail(obj.cover_image, 48)

    @admin.display(description="Current cover")
    def cover_preview(self, obj):
        return thumbnail(obj.cover_image, 140)