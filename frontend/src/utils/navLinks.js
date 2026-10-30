// Shared by the Navbar and Footer. Sections are added step by step;
// links to sections that do not exist yet simply do nothing for now.
export const NAV_LINKS = [
  { label: "Home", to: { pathname: "/", hash: "" } },
  { label: "Services", to: { pathname: "/", hash: "#services" } },
  { label: "Projects", to: { pathname: "/", hash: "#projects" } },
  { label: "About", to: { pathname: "/", hash: "#about" } },
  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
];

export const CONSULTATION_LINK = { pathname: "/", hash: "#contact" };

export const FOOTER_SERVICES = [
  "Interior Design",
  "Home Renovation",
  "Modular Kitchens",
  "Living Room Design",
  "Bedroom Design",
  "Bathroom Renovation",
  "Space Planning",
];