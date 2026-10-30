import { useState } from "react";

import { useSiteSettings } from "../../context/SiteSettingsContext.jsx";
import { CONSULTATION_LINK } from "../../utils/navLinks.js";
import Button from "../common/Button.jsx";

export default function Hero() {
  const { settings, loaded } = useSiteSettings();
  // Remember which image failed, so a new image (after an admin change) gets a fresh try
  const [failedSrc, setFailedSrc] = useState(null);
  const showImage = loaded && settings.hero_image && failedSrc !== settings.hero_image;

  return (
    <section className="hero" aria-labelledby="hero-title">
      {showImage && (
        <img
          className="hero-img"
          src={settings.hero_image}
          alt={settings.hero_image_alt}
          fetchpriority="high"
          onError={() => setFailedSrc(settings.hero_image)}
        />
      )}

      <div className="container">
        <div className="hero-content">
          <span className="eyebrow">Interior design &amp; home renovation</span>
          <h1 id="hero-title">Homes designed to be lived in, beautifully.</h1>
          <p className="hero-text">
            Haven &amp; Hue is a design studio for people who want a home that feels calm, considered and
            truly their own, from the first sketch to the final handover.
          </p>
          <div className="hero-actions">
            <Button to={CONSULTATION_LINK} variant="accent">
              Book a Consultation
            </Button>
            <Button to={{ pathname: "/", hash: "#projects" }} variant="light">
              View Our Projects
            </Button>
          </div>
          <p className="hero-note">Fictional demo studio &middot; Bengaluru, India</p>
        </div>
      </div>
    </section>
  );
}