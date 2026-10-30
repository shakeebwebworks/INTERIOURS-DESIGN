import { Link, useLocation } from "react-router-dom";

import { useSeo } from "../utils/seo.js";

export default function NotFound() {
  const { pathname } = useLocation();

  useSeo({
    title: "Page not found | Haven & Hue (Demo)",
    description: "The page you are looking for could not be found.",
    path: pathname,
    noindex: true,
  });

  return (
    <div className="container section-pad text-center">
      <span className="eyebrow">Error 404</span>
      <h1 className="mb-3">This page can't be found</h1>
      <p className="mb-4">The page you're looking for may have moved or no longer exists.</p>
      <Link to="/" className="btn-hh btn-hh-primary">
        Return home
      </Link>
    </div>
  );
}