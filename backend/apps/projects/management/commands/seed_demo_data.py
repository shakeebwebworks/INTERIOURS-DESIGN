from django.core.management.base import BaseCommand

from apps.projects.models import Project, ProjectImage
from apps.services.models import Service

SERVICES = [
    {"title": "Interior Design", "slug": "interior-design", "icon": "bi-house-heart",
     "short_description": "Complete interior concepts, from mood boards to material selection.",
     "description": "We design cohesive, livable interiors tailored to your lifestyle, covering layouts, finishes, furniture, lighting and styling."},
    {"title": "Home Renovation", "slug": "home-renovation", "icon": "bi-hammer",
     "short_description": "Full and partial renovations managed from demolition to handover.",
     "description": "Structural updates, flooring, electrical, plumbing and finishing, coordinated by a single accountable team."},
    {"title": "Modular Kitchens", "slug": "modular-kitchens", "icon": "bi-grid-1x2",
     "short_description": "Smart, durable kitchens designed around how you cook.",
     "description": "Ergonomic layouts, quality hardware and finishes, with storage planned for everyday use."},
    {"title": "Living Room Design", "slug": "living-room-design", "icon": "bi-lamp",
     "short_description": "Warm, welcoming living spaces made for gathering and relaxing.",
     "description": "Furniture planning, lighting layers, feature walls and decor that balance comfort with character."},
    {"title": "Bedroom Design", "slug": "bedroom-design", "icon": "bi-moon-stars",
     "short_description": "Calm, restful bedrooms with considered storage and lighting.",
     "description": "Wardrobes, headboard walls, soft lighting and textures designed for better rest."},
    {"title": "Bathroom Renovation", "slug": "bathroom-renovation", "icon": "bi-droplet",
     "short_description": "Modern bathrooms with proper waterproofing and fittings.",
     "description": "Layout updates, premium fittings, tiling and ventilation done to last."},
    {"title": "Space Planning", "slug": "space-planning", "icon": "bi-bounding-box",
     "short_description": "Smarter layouts that make every square foot work harder.",
     "description": "Furniture and circulation planning that improves flow, light and usable space before any work begins."},
]

PROJECTS = [
    {"title": "The Linen House", "slug": "the-linen-house", "location": "Indiranagar, Bengaluru",
     "style": "Japandi", "year": 2025, "area_sqft": 1850, "duration_months": 5, "is_featured": True,
     "cover_alt": "Japandi living room with light oak furniture and linen upholstery",
     "summary": "A calm 3BHK apartment layered with oak, linen and soft stone.",
     "description": "Demo project. A family apartment reworked around natural light, warm timber and a restrained palette, with a custom kitchen and built-in storage throughout."},
    {"title": "Terracotta Court", "slug": "terracotta-court", "location": "Jubilee Hills, Hyderabad",
     "style": "Contemporary Warm", "year": 2025, "area_sqft": 2400, "duration_months": 7, "is_featured": True,
     "cover_alt": "Warm contemporary living room with terracotta accents and walnut joinery",
     "summary": "A duplex home with terracotta accents and walnut joinery.",
     "description": "Demo project. Double-height living space, handcrafted joinery and earthy tones create a home that feels grounded and elegant."},
    {"title": "Walnut & Stone Residence", "slug": "walnut-and-stone-residence", "location": "Koregaon Park, Pune",
     "style": "Modern Classic", "year": 2024, "area_sqft": 3100, "duration_months": 9, "is_featured": True,
     "cover_alt": "Modern classic living room with walnut panelling and stone surfaces",
     "summary": "A villa renovation blending classic proportions with modern detail.",
     "description": "Demo project. Full renovation of a villa with new layouts, refined moldings, stone surfaces and bespoke furniture."},
    {"title": "The Quiet Studio", "slug": "the-quiet-studio", "location": "Bandra West, Mumbai",
     "style": "Minimalist", "year": 2024, "area_sqft": 780, "duration_months": 3, "is_featured": False,
     "cover_alt": "Minimalist studio apartment with white walls and compact storage",
     "summary": "A compact studio apartment planned for calm and clever storage.",
     "description": "Demo project. Space planning and multi-functional furniture turn a small footprint into a flexible, uncluttered home."},
]


class Command(BaseCommand):
    help = "Loads clearly fictional demo services and projects. Safe to run again: it never touches uploaded photos."

    def handle(self, *args, **options):
        for order, data in enumerate(SERVICES, start=1):
            Service.objects.update_or_create(
                slug=data["slug"], defaults={**data, "order": order, "is_active": True}
            )

        # Clean out old text-path "images" from the earlier version of this project
        Project.objects.filter(cover_image__startswith="/images/").update(cover_image="")
        ProjectImage.objects.filter(image__startswith="/images/").delete()

        for order, data in enumerate(PROJECTS, start=1):
            Project.objects.update_or_create(
                slug=data["slug"], defaults={**data, "order": order, "is_active": True}
            )

        self.stdout.write(self.style.SUCCESS("Demo services and projects loaded. Upload photos in the admin."))