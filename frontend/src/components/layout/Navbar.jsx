import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { CONSULTATION_LINK, NAV_LINKS } from "../../utils/navLinks.js";
import Button from "../common/Button.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close the mobile menu after every navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash, location.key]);

  // Add a soft shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHomeClick = (item) => {
    if (item.to.hash === "" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="container d-flex align-items-center justify-content-between" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Haven and Hue Interiors, home">
          <span className="brand-name">
            Haven <em>&amp;</em> Hue
          </span>
          <span className="brand-sub">Interiors</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={`bi ${open ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
        </button>

        <div id="primary-menu" className={`nav-menu ${open ? "is-open" : ""}`}>
          <ul className="nav-list">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="nav-link-hh" onClick={() => handleHomeClick(item)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button to={CONSULTATION_LINK} variant="accent" className="nav-cta">
            Book a Consultation
          </Button>
        </div>
      </nav>
    </header>
  );
}