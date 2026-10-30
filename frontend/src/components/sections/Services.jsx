import { useEffect, useState } from "react";

import { getServices } from "../../api/client.js";
import { CONSULTATION_LINK } from "../../utils/navLinks.js";
import Button from "../common/Button.jsx";
import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

export default function Services() {
  const [state, setState] = useState({ status: "loading", items: [], error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", items: [], error: "" });

    getServices({ signal: controller.signal })
      .then((items) => setState({ status: "ready", items, error: "" }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ status: "error", items: [], error: error.message });
      });

    return () => controller.abort();
  }, [attempt]);

  return (
    <section id="services" className="section-pad" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Interior design and renovation services"
            text="From a single room to a complete home renovation, every service is planned, priced and delivered with the same attention to detail."
          />
        </Reveal>

        <div className="mt-5" aria-live="polite">
          {state.status === "loading" && (
            <div className="d-flex justify-content-center align-items-center gap-3 py-5">
              <div className="spinner-border text-secondary" role="status" aria-hidden="true" />
              <span>Loading services...</span>
            </div>
          )}

          {state.status === "error" && (
            <div className="alert alert-danger d-flex flex-wrap align-items-center justify-content-between gap-3" role="alert">
              <span>We could not load our services right now. {state.error}</span>
              <button type="button" className="btn-hh btn-hh-outline" onClick={() => setAttempt((n) => n + 1)}>
                Try again
              </button>
            </div>
          )}

          {state.status === "ready" && (
            <div className="row g-4">
              {state.items.map((service, index) => (
                <div className="col-md-6 col-lg-3" key={service.id}>
                  <Reveal delay={(index % 4) * 90} className="h-100">
                    <article className="hh-card service-card">
                      <span className="service-icon">
                        <i className={`bi ${service.icon || "bi-house"}`} aria-hidden="true" />
                      </span>
                      <h3>{service.title}</h3>
                      <p>{service.short_description}</p>
                    </article>
                  </Reveal>
                </div>
              ))}

              <div className="col-md-6 col-lg-3">
                <Reveal delay={(state.items.length % 4) * 90} className="h-100">
                  <article className="hh-card service-card service-card-cta">
                    <div>
                      <h3>Not sure where to start?</h3>
                      <p>Tell us about your space and we will suggest the right next step.</p>
                    </div>
                    <Button to={CONSULTATION_LINK} variant="accent" className="mt-4">
                      Book a Consultation
                    </Button>
                  </article>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}