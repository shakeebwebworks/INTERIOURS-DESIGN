import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";

const STEPS = [
  {
    title: "Consultation",
    text: "We talk through your home, daily routines, taste and budget, then agree what a successful project looks like.",
  },
  {
    title: "Planning",
    text: "Site measurements, space planning and a written scope with timelines and cost ranges, so there are no surprises later.",
  },
  {
    title: "Design",
    text: "Mood boards, 3D visuals, material samples and detailed drawings, all approved by you before anything is ordered.",
  },
  {
    title: "Execution",
    text: "Our coordinators manage trades, deliveries and quality checks, with regular progress updates from site.",
  },
  {
    title: "Final handover",
    text: "A full walkthrough, resolution of every snag, finishing touches and care guidance, so you move into a finished home.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-pad" aria-labelledby="process-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            title="Our process, from first call to handover"
            text="A clear five-step approach keeps your project on track, on budget and easy to follow."
          />
        </Reveal>

        <ol className="process-list mt-5">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 90} className="process-step">
              <span className="process-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p className="mb-0">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}