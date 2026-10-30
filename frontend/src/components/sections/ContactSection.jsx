import ConsultationForm from "../forms/ConsultationForm.jsx";
import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import "../../styles/contact.css";

// All details below are DEMO placeholders for a fictional company.
const DETAILS = [
  { icon: "bi-geo-alt", label: "Studio", value: "Demo studio address, Bengaluru, Karnataka, India" },
  { icon: "bi-telephone", label: "Phone", value: "+91 00000 00000" },
  { icon: "bi-envelope", label: "Email", value: "hello@havenandhue.example" },
  { icon: "bi-clock", label: "Studio hours", value: "Monday to Saturday, 10:00 - 18:00" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-pad" aria-labelledby="contact-title">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <Reveal>
              <SectionHeading
                id="contact-title"
                align="left"
                eyebrow="Contact"
                title="Book a consultation"
                text="Share a few details about your home and we will get back to you to arrange a first conversation."
              />

              <dl className="contact-list">
                {DETAILS.map((item) => (
                  <div className="contact-row" key={item.label}>
                    <dt>
                      <i className={`bi ${item.icon}`} aria-hidden="true" />
                      <span className="visually-hidden">{item.label}</span>
                    </dt>
                    <dd>
                      <small>{item.label}</small>
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="contact-social" aria-label="Social media (demo links)">
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram (demo link)">
                  <i className="bi bi-instagram" aria-hidden="true" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Pinterest (demo link)">
                  <i className="bi bi-pinterest" aria-hidden="true" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn (demo link)">
                  <i className="bi bi-linkedin" aria-hidden="true" />
                </a>
              </div>

              <p className="demo-note mt-4 mb-0">
                Contact details on this page are demonstration placeholders for a fictional studio.
              </p>
            </Reveal>
          </div>

          <div className="col-lg-7">
            <Reveal delay={100}>
              <div className="hh-card consult-card">
                <h3>Tell us about your project</h3>
                <p className="consult-intro">It takes about two minutes. Fields marked * are required.</p>
                <ConsultationForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}