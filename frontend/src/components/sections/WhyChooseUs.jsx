import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

const FEATURES = [
  {
    icon: "bi-clipboard-check",
    title: "Transparent process",
    text: "Clear scopes, itemised costs and regular updates, so you always know where your project stands.",
  },
  {
    icon: "bi-palette",
    title: "Tailored designs",
    text: "No templates. Every layout, palette and detail is shaped around your home, habits and taste.",
  },
  {
    icon: "bi-gem",
    title: "Quality materials",
    text: "Durable woods, stone, hardware and finishes, chosen to look good and last, with samples shown first.",
  },
  {
    icon: "bi-people",
    title: "Project coordination",
    text: "One accountable team manages every trade, delivery and deadline, so you are not chasing anyone.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad" aria-labelledby="why-title">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <Reveal>
              <SectionHeading
                id="why-title"
                align="left"
                eyebrow="Why choose us"
                title="Design you can trust from start to finish"
                text="Beautiful results come from a well-run process. Here is what you can expect when you work with us."
              />
            </Reveal>
          </div>

          <div className="col-lg-8">
            <div className="row g-4">
              {FEATURES.map((feature, index) => (
                <div className="col-md-6" key={feature.title}>
                  <Reveal delay={(index % 2) * 100} className="h-100">
                    <article className="hh-card service-card">
                      <span className="service-icon">
                        <i className={`bi ${feature.icon}`} aria-hidden="true" />
                      </span>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </article>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}