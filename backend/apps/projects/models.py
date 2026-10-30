from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models

MAX_IMAGE_MB = 5
image_extensions = FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "webp"])


def validate_image_size(file):
    if file.size > MAX_IMAGE_MB * 1024 * 1024:
        raise ValidationError(f"Image is too large. Maximum size is {MAX_IMAGE_MB} MB.")


class Project(models.Model):
    title = models.CharField(max_length=140)
    slug = models.SlugField(unique=True)
    location = models.CharField(max_length=120)
    style = models.CharField(max_length=80, help_text="e.g. Japandi, Modern Classic")
    summary = models.CharField(max_length=260)
    description = models.TextField(blank=True)
    area_sqft = models.PositiveIntegerField(null=True, blank=True)
    duration_months = models.PositiveSmallIntegerField(null=True, blank=True)
    year = models.PositiveSmallIntegerField(null=True, blank=True)
    cover_image = models.ImageField(
        upload_to="projects/covers/",
        blank=True,
        validators=[image_extensions, validate_image_size],
        help_text="Main photo. Landscape, about 1600px wide, JPG/PNG/WebP, max 5 MB.",
    )
    cover_alt = models.CharField(max_length=200, help_text="Describe the cover photo (used for accessibility and SEO)")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="projects/gallery/",
        validators=[image_extensions, validate_image_size],
    )
    alt_text = models.CharField(max_length=200, help_text="Describe this photo")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.title} - image {self.order}"