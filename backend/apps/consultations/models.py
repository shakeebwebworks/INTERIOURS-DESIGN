from django.db import models


class ConsultationRequest(models.Model):
    class ProjectType(models.TextChoices):
        INTERIOR_DESIGN = "interior_design", "Interior design"
        HOME_RENOVATION = "home_renovation", "Home renovation"
        MODULAR_KITCHEN = "modular_kitchen", "Modular kitchen"
        LIVING_ROOM = "living_room", "Living room design"
        BEDROOM = "bedroom", "Bedroom design"
        BATHROOM = "bathroom", "Bathroom renovation"
        SPACE_PLANNING = "space_planning", "Space planning"
        OTHER = "other", "Other"

    class Budget(models.TextChoices):
        UNDER_5L = "under_5l", "Under ₹5 lakh"
        FIVE_TO_10L = "5_10l", "₹5 - 10 lakh"
        TEN_TO_25L = "10_25l", "₹10 - 25 lakh"
        TWENTYFIVE_TO_50L = "25_50l", "₹25 - 50 lakh"
        ABOVE_50L = "above_50l", "Above ₹50 lakh"
        NOT_SURE = "not_sure", "Not sure yet"

    class Timeline(models.TextChoices):
        ASAP = "asap", "As soon as possible"
        ONE_TO_THREE = "1_3_months", "1 - 3 months"
        THREE_TO_SIX = "3_6_months", "3 - 6 months"
        SIX_PLUS = "6_plus_months", "6+ months"
        FLEXIBLE = "flexible", "Flexible"

    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        CLOSED = "closed", "Closed"

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    project_type = models.CharField(max_length=30, choices=ProjectType.choices)
    location = models.CharField(max_length=120)
    budget = models.CharField(max_length=20, choices=Budget.choices)
    timeline = models.CharField(max_length=20, choices=Timeline.choices)
    message = models.TextField(max_length=2000)

    status = models.CharField(max_length=12, choices=Status.choices, default=Status.NEW)
    internal_notes = models.TextField(blank=True, help_text="Only visible in the admin")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.get_project_type_display()} ({self.created_at:%d %b %Y})"