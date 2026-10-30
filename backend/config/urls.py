from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from apps.seo.views import robots_txt, sitemap_xml
from config.spa import spa_index

admin.site.site_header = "Haven & Hue Interiors - Admin"
admin.site.site_title = "Haven & Hue Admin"
admin.site.index_title = "Manage inquiries, projects and services"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/services/", include("apps.services.urls")),
    path("api/projects/", include("apps.projects.urls")),
    path("api/consultations/", include("apps.consultations.urls")),
    path("api/site-settings/", include("apps.siteconfig.urls")),
    path("sitemap.xml", sitemap_xml, name="sitemap"),
    path("robots.txt", robots_txt, name="robots"),
]

# Serve uploaded photos while developing (does nothing when DEBUG is False)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# When a built React site is configured (FRONTEND_DIST_DIR), Django serves it for every other path.
# Not active in normal development, where Vite serves the frontend.
if settings.FRONTEND_DIST_DIR:
    urlpatterns += [re_path(r"^(?!api/|admin/|static/|media/).*$", spa_index)]