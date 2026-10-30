import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import ConsultationForm from "../forms/ConsultationForm.jsx";
import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import "../../styles/contact.css";

const SOCIALS = [
  ["instagram_url", "bi-instagram", "Instagram"],
  ["pinterest_url", "bi-pinterest", "Pinterest"],
  ["linkedin_url", "bi-linkedin", "LinkedIn"],
];

export default function ContactSection() {
  const { settings } = useSiteSettings();
  const isDemo = settings.email.endsWith(".example");

  const details = [
    { icon: "bi-geo-alt", label: "Studio", value: settings.studio_address },
    {
      icon: "bi-telephone",
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/[^\d+]/g, "")}`,
    },
    { icon: "bi-envelope", label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: "bi-clock", label: "Studio hours", value: settings.studio_hours },
  ];
  const socials = SOCIALS.filter(([key]) => settings[key]);

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
                {details.map((item) => (
                  <div className="contact-row" key={item.label}>
                    <dt>
                      <i className={`bi ${item.icon}`} aria-hidden="true" />
                      <span className="visually-hidden">{item.label}</span>
                    </dt>
                    <dd>
                      <small>{item.label}</small>
                      {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {socials.length > 0 && (
                <div className="contact-social">
                  {socials.map(([key, icon, name]) => (
                    <a
                      key={key}
                      href={settings[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} (opens in a new tab)`}
                    >
                      <i className={`bi ${icon}`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}

              {isDemo && (
                <p className="demo-note mt-4 mb-0">
                  Contact details on this page are demonstration placeholders for a fictional studio.
                </p>
              )}
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