import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProject } from "../api/client.js";
import Button from "../components/common/Button.jsx";
import Reveal from "../components/common/Reveal.jsx";
import SmartImage from "../components/common/SmartImage.jsx";
import { CONSULTATION_LINK } from "../utils/navLinks.js";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL, truncate, useSeo } from "../utils/seo.js";
import "../styles/projects.css";

function Gallery({ images, title }) {
  const [active, setActive] = useState(null);
  const closeRef = useRef(null);
  const count = images.length;
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i + 1) % count);
      if (event.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, count]);

  if (count === 0) return null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.id}
            className="gallery-item img-zoom"
            aria-label={`Open image ${index + 1} of ${count}: ${image.alt_text}`}
            onClick={() => setActive(index)}
          >
            <SmartImage key={image.image} src={image.image} alt={image.alt_text} />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox-btn lightbox-close"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>

          {count > 1 && (
            <button
              type="button"
              className="lightbox-btn lightbox-prev"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active - 1 + count) % count);
              }}
            >
              <i className="bi bi-chevron-left" aria-hidden="true" />
            </button>
          )}

          <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <SmartImage
              key={images[active].image}
              src={images[active].image}
              alt={images[active].alt_text}
              className="lightbox-img"
              loading="eager"
            />
            <figcaption>
              {images[active].alt_text} &middot; {active + 1} / {count}
            </figcaption>
          </figure>

          {count > 1 && (
            <button
              type="button"
              className="lightbox-btn lightbox-next"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active + 1) % count);
              }}
            >
              <i className="bi bi-chevron-right" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", project: null, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", project: null, error: "" });

    getProject(slug, { signal: controller.signal })
      .then((project) => setState({ status: "ready", project, error: "" }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({
          status: error.status === 404 ? "notfound" : "error",
          project: null,
          error: error.message,
        });
      });

    return () => controller.abort();
  }, [slug, attempt]);

  // SEO tags for this project (null while loading leaves the current tags alone)
  const loaded = state.project;
  let seoConfig = null;

  if (loaded) {
    const pageUrl = `${SITE_URL}/projects/${loaded.slug}`;
    seoConfig = {
      title: `${loaded.title} | ${loaded.style} Interior | Haven & Hue (Demo)`,
      description: truncate(
        `${loaded.summary} ${loaded.style} interior project in ${loaded.location}. Demonstration content.`,
        155
      ),
      path: `/projects/${loaded.slug}`,
      image: loaded.cover_image || DEFAULT_IMAGE,
      jsonLd: [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: loaded.title, item: pageUrl },
          ],
        },
        {
          "@type": "CreativeWork",
          name: loaded.title,
          description: loaded.summary,
          url: pageUrl,
          image: [loaded.cover_image, ...loaded.images.map((item) => item.image)].filter(Boolean),
          dateCreated: loaded.year ? String(loaded.year) : undefined,
          publisher: { "@type": "Organization", name: SITE_NAME },
        },
      ],
    };
  } else if (state.status === "notfound") {
    seoConfig = {
      title: "Project not found | Haven & Hue (Demo)",
      description: "This project could not be found.",
      path: `/projects/${slug}`,
      noindex: true,
    };
  }

  useSeo(seoConfig);

  if (state.status === "loading") {
    return (
      <div className="container section-pad d-flex justify-content-center align-items-center gap-3">
        <div className="spinner-border text-secondary" role="status" aria-hidden="true" />
        <span>Loading project...</span>
      </div>
    );
  }

  if (state.status === "notfound") {
    return (
      <div className="container section-pad text-center">
        <span className="eyebrow">Project not found</span>
        <h1 className="mb-3">We could not find that project</h1>
        <p className="mb-4">It may have been removed or the link may be incorrect.</p>
        <Button to={{ pathname: "/", hash: "#projects" }} variant="primary">
          See all projects
        </Button>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="container section-pad">
        <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
          <span>We could not load this project. {state.error}</span>
          <button type="button" className="btn-hh btn-hh-outline" onClick={() => setAttempt((n) => n + 1)}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { project } = state;
  const facts = [
    ["Location", project.location],
    ["Design style", project.style],
    project.area_sqft && ["Area", `${project.area_sqft.toLocaleString("en-IN")} sq ft`],
    project.duration_months && ["Duration", `${project.duration_months} months`],
    project.year && ["Completed", String(project.year)],
  ].filter(Boolean);
  const paragraphs = (project.description || "").split("\n").filter(Boolean);

  return (
    <article>
      <div className="container pt-5">
        <Link to={{ pathname: "/", hash: "#projects" }} className="back-link">
          <i className="bi bi-arrow-left" aria-hidden="true" /> All projects
        </Link>

        <header className="detail-header">
          <span className="eyebrow">{project.style}</span>
          <h1>{project.title}</h1>
          <p className="project-location mb-0">
            <i className="bi bi-geo-alt" aria-hidden="true" /> {project.location}
          </p>
        </header>

        <div className="img-zoom detail-cover">
          <SmartImage key={project.cover_image} src={project.cover_image} alt={project.cover_alt} loading="eager" />
        </div>
      </div>

      <section className="section-pad pb-0">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <Reveal>
                <h2 className="h3-like">About this project</h2>
                <p className="lead-text">{project.summary}</p>
                {paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </Reveal>
            </div>

            <div className="col-lg-4 offset-lg-1">
              <Reveal delay={100}>
                <aside className="hh-card facts-card" aria-label="Project details">
                  <dl className="mb-0">
                    {facts.map(([label, value]) => (
                      <div key={label} className="fact-row">
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="demo-note mb-0">Demonstration project. Fictional content.</p>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {project.images.length > 0 && (
        <section className="section-pad pb-0" aria-labelledby="gallery-title">
          <div className="container">
            <Reveal>
              <h2 id="gallery-title" className="h3-like mb-4">
                Project gallery
              </h2>
              <Gallery images={project.images} title={project.title} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="container">
          <div className="cta-band text-center">
            <h2>Planning something similar?</h2>
            <p>Tell us about your home and we will suggest the right approach, timeline and budget range.</p>
            <Button to={CONSULTATION_LINK} variant="accent">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}