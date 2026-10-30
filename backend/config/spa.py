from pathlib import Path

from django.conf import settings
from django.http import FileResponse, Http404


def spa_index(request, *args, **kwargs):
    """Serves the built React page, so links like /projects/<slug> work when opened directly."""
    index = Path(settings.FRONTEND_DIST_DIR) / "index.html"
    if not index.is_file():
        raise Http404("The frontend build was not found.")
    return FileResponse(open(index, "rb"), content_type="text/html; charset=utf-8")