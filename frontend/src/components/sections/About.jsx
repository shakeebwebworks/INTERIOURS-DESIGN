import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

const EXPERTISE = [
  "Residential interiors",
  "Full home renovation",
  "Modular kitchens",
  "Space planning",
  "Custom joinery",
  "Lighting design",
];

const PRINCIPLES = [
  {
    title: "Listen first",
    text: "Every design starts with how you live, not with a trend.",
  },
  {
    title: "Say it in writing",
    text: "Scope, materials, costs and timelines are agreed before work begins.",
  },
  {
    title: "Finish properly",
    text: "We obsess over the details that make a home feel complete.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-beige" aria-labelledby="about-title">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <Reveal>
              <SectionHeading
                id="about-title"
                align="left"
                eyebrow="About the studio"
                title="A design studio built around how you live"
              />
              <div className="about-story mt-4">
                <p>
                  Haven &amp; Hue began with a simple belief: a home should feel calm the moment you walk
                  in, and stay easy to live in for years. We blend warm materials, honest craftsmanship and
                  careful planning to create interiors that are personal, practical and quietly beautiful.
                </p>
                <p>
                  Our team combines interior designers, project coordinators and trusted craftspeople, so
                  the person who designs your home is also accountable for how it is built.
                </p>
              </div>

              <h3 className="about-subtitle">Areas of expertise</h3>
              <ul className="expertise-list">
                {EXPERTISE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="demo-note mt-4 mb-0">
                Haven &amp; Hue Interiors is a fictional studio created for portfolio demonstration.
              </p>
            </Reveal>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <Reveal delay={120}>
              <div className="about-card">
                <span className="eyebrow about-card-eyebrow">Our approach</span>
                <ol className="principle-list">
                  {PRINCIPLES.map((item, index) => (
                    <li key={item.title}>
                      <span className="principle-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}