import { useState } from "react";

import { CONSULTATION_LINK } from "../../utils/navLinks.js";
import Button from "../common/Button.jsx";

export default function Hero() {
  // If /images/hero.jpg is missing, the hero falls back to a solid walnut background.
  const [imageOk, setImageOk] = useState(true);

  return (
    <section className="hero" aria-labelledby="hero-title">
      {imageOk && (
        <img
          className="hero-img"
          src="/images/hero.jpg"
          alt="Bright living room with warm timber furniture, linen sofa and natural light"
          fetchpriority="high"
          onError={() => setImageOk(false)}
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