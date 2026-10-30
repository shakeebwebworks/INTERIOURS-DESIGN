export default function SectionHeading({ eyebrow, title, text, align = "center", id }) {
  return (
    <div className={`section-heading ${align === "center" ? "text-center mx-auto" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {text && <p className="mt-3 mb-0">{text}</p>}
    </div>
  );
}