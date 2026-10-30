import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from "../../api/client.js";
import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import SmartImage from "../common/SmartImage.jsx";
import "../../styles/projects.css";

export default function FeaturedProjects() {
  const [state, setState] = useState({ status: "loading", items: [], error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", items: [], error: "" });

    getProjects({ signal: controller.signal })
      .then((items) => setState({ status: "ready", items, error: "" }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ status: "error", items: [], error: error.message });
      });

    return () => controller.abort();
  }, [attempt]);

  return (
    <section id="projects" className="section-pad bg-beige" aria-labelledby="projects-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="Selected work"
            title="Featured projects"
            text="A look at recent homes we have designed and renovated. All projects shown are fictional demonstration content."
          />
        </Reveal>

        <div className="mt-5" aria-live="polite">
          {state.status === "loading" && (
            <div className="d-flex justify-content-center align-items-center gap-3 py-5">
              <div className="spinner-border text-secondary" role="status" aria-hidden="true" />
              <span>Loading projects...</span>
            </div>
          )}

          {state.status === "error" && (
            <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
              <span>We could not load our projects right now. {state.error}</span>
              <button type="button" className="btn-hh btn-hh-outline" onClick={() => setAttempt((n) => n + 1)}>
                Try again
              </button>
            </div>
          )}

          {state.status === "ready" && state.items.length === 0 && (
            <p className="text-center">New projects will be added soon.</p>
          )}

          {state.status === "ready" && state.items.length > 0 && (
            <div className="row g-4 g-lg-5">
              {state.items.map((project, index) => {
                const wide = index % 4 === 0 || index % 4 === 3;
                return (
                  <div className={`col-md-6 ${wide ? "col-lg-8" : "col-lg-4"}`} key={project.id}>
                    <Reveal delay={(index % 2) * 100} className="h-100">
                      <article className="project-card">
                        <div className="img-zoom project-media">
                          <SmartImage key={project.cover_image} src={project.cover_image} alt={project.cover_alt} />
                        </div>
                        <div className="project-card-body">
                          <span className="chip">{project.style}</span>
                          <h3 className="mt-3 mb-2">
                            <Link to={`/projects/${project.slug}`} className="project-link stretched-link">
                              {project.title}
                            </Link>
                          </h3>
                          <p className="project-location">
                            <i className="bi bi-geo-alt" aria-hidden="true" /> {project.location}
                          </p>
                          <p className="mb-0">{project.summary}</p>
                        </div>
                      </article>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}