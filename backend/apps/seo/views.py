from xml.sax.saxutils import escape

from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.cache import cache_control
from django.views.decorators.http import require_GET

from apps.projects.models import Project


@require_GET
@cache_control(max_age=3600, public=True)
def sitemap_xml(request):
    """Lists the homepage and every active project page of the React site."""
    base = settings.FRONTEND_URL
    locations = [f"{base}/"]
    for slug in Project.objects.filter(is_active=True).values_list("slug", flat=True):
        locations.append(f"{base}/projects/{slug}")

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    lines += [f"  <url><loc>{escape(loc)}</loc></url>" for loc in locations]
    lines.append("</urlset>")
    return HttpResponse("\n".join(lines) + "\n", content_type="application/xml")


@require_GET
@cache_control(max_age=3600, public=True)
def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /api/",
        "",
        f"Sitemap: {settings.FRONTEND_URL}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines) + "\n", content_type="text/plain")