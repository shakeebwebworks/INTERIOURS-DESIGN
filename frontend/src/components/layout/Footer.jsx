import { Link } from "react-router-dom";

import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import { FOOTER_SERVICES, NAV_LINKS } from "../../utils/navLinks.js";

const SOCIALS = [
  ["instagram_url", "bi-instagram", "Instagram"],
  ["pinterest_url", "bi-pinterest", "Pinterest"],
  ["linkedin_url", "bi-linkedin", "LinkedIn"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useSiteSettings();
  const socials = SOCIALS.filter(([key]) => settings[key]);
  const isDemo = settings.email.endsWith(".example");

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="brand-name footer-brand">
              Haven <em>&amp;</em> Hue
            </div>
            <p className="mt-3 pe-lg-4">
              A fictional premium interior design and home renovation studio, created as a demonstration
              website for portfolio purposes.
            </p>
            {socials.length > 0 && (
              <div className="footer-social">
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
          </div>

          <div className="col-6 col-lg-2">
            <h2 className="footer-title">Explore</h2>
            <ul className="footer-list">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="footer-title">Services</h2>
            <ul className="footer-list">
              {FOOTER_SERVICES.map((name) => (
                <li key={name}>
                  <Link to={{ pathname: "/", hash: "#services" }}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <h2 className="footer-title">{isDemo ? "Contact (demo details)" : "Contact"}</h2>
            <ul className="footer-list footer-contact">
              <li>
                <i className="bi bi-geo-alt" aria-hidden="true" /> {settings.studio_address}
              </li>
              <li>
                <i className="bi bi-telephone" aria-hidden="true" />{" "}
                <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>
              </li>
              <li>
                <i className="bi bi-envelope" aria-hidden="true" />{" "}
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">
            &copy; {year} Haven &amp; Hue Interiors. Fictional company and demonstration content, not a real
            business.
          </p>
        </div>
      </div>
    </footer>
  );
}