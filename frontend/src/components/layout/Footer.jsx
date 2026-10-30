import { Link } from "react-router-dom";

import { FOOTER_SERVICES, NAV_LINKS } from "../../utils/navLinks.js";

export default function Footer() {
  const year = new Date().getFullYear();

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
            <div className="footer-social" aria-label="Social media (demo links)">
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
            <h2 className="footer-title">Contact (demo details)</h2>
            <ul className="footer-list footer-contact">
              <li>
                <i className="bi bi-geo-alt" aria-hidden="true" /> Demo studio address, Bengaluru, Karnataka
              </li>
              <li>
                <i className="bi bi-telephone" aria-hidden="true" /> +91 00000 00000
              </li>
              <li>
                <i className="bi bi-envelope" aria-hidden="true" /> hello@havenandhue.example
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