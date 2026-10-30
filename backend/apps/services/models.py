from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=220)
    description = models.TextField(blank=True)
    icon = models.CharField(
        max_length=60,
        blank=True,
        help_text="Bootstrap Icons class name, e.g. bi-house-heart",
    )
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title