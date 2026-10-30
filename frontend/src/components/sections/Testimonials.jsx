import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

// SAMPLE content only. Replace with genuine client reviews (with permission) when available.
const TESTIMONIALS = [
  {
    quote:
      "Every cost and timeline was written down from the first meeting. There were no surprises, and the kitchen is exactly what we imagined.",
    name: "Meera & Arjun S.",
    detail: "Modular kitchen, Bengaluru",
  },
  {
    quote:
      "They listened to how we actually live and designed around it. Our living room finally feels calm and complete.",
    name: "Farhan K.",
    detail: "Living room design, Hyderabad",
  },
  {
    quote:
      "One point of contact managed every trade on site. The bathroom is beautifully finished and the whole process felt organised.",
    name: "Neha P.",
    detail: "Bathroom renovation, Pune",
  },
];

function initials(name) {
  return name
    .replace("&", " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad bg-beige" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Client voices"
            title="What homeowners say"
            text="These are sample testimonials written for this demonstration. Genuine client reviews will replace them."
          />
        </Reveal>

        <div className="row g-4 mt-4">
          {TESTIMONIALS.map((item, index) => (
            <div className="col-lg-4" key={item.name}>
              <Reveal delay={index * 100} className="h-100">
                <figure className="hh-card testimonial-card">
                  <span className="sample-badge">Sample testimonial</span>
                  <i className="bi bi-quote testimonial-mark" aria-hidden="true" />
                  <blockquote className="testimonial-quote">
                    <p>{item.quote}</p>
                  </blockquote>
                  <figcaption className="testimonial-person">
                    <span className="avatar" aria-hidden="true">
                      {initials(item.name)}
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}