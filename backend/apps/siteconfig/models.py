from django.db import models

from apps.projects.models import image_extensions, validate_image_size


class SiteSettings(models.Model):
    """One single row that holds the editable homepage photo and contact details."""

    hero_image = models.ImageField(
        upload_to="site/",
        blank=True,
        validators=[image_extensions, validate_image_size],
        help_text="Homepage photo. Wide landscape, about 1920px, JPG/PNG/WebP, max 5 MB. Leave empty to use the default.",
    )
    hero_image_alt = models.CharField(
        max_length=200,
        default="Bright living room with warm timber furniture and natural light",
        help_text="Describe the hero photo (used for accessibility and SEO)",
    )
    studio_address = models.CharField(max_length=200, default="Demo studio address, Bengaluru, Karnataka, India")
    phone = models.CharField(max_length=30, default="+91 00000 00000")
    email = models.EmailField(default="hello@havenandhue.example")
    studio_hours = models.CharField(max_length=120, default="Monday to Saturday, 10:00 - 18:00")
    instagram_url = models.URLField(blank=True, default="https://www.instagram.com/", help_text="Leave empty to hide the icon")
    pinterest_url = models.URLField(blank=True, default="https://www.pinterest.com/", help_text="Leave empty to hide the icon")
    linkedin_url = models.URLField(blank=True, default="https://www.linkedin.com/", help_text="Leave empty to hide the icon")

    class Meta:
        verbose_name = "site settings"
        verbose_name_plural = "site settings"

    def __str__(self):
        return "Site settings"

    def save(self, *args, **kwargs):
        self.pk = 1  # always the same single row
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj