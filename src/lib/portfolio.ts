export type SectionId = "home" | "about" | "skills" | "experience" | "projects" | "contact";

export interface Section {
  id: SectionId;
  url: string;
  title: string;
  navLabel: string;
}

export const SECTIONS: Section[] = [
  { id: "home",       url: "varun.dev",            title: "Home",       navLabel: "Home" },
  { id: "about",      url: "varun.dev/about",      title: "About",      navLabel: "About" },
  { id: "skills",     url: "varun.dev/skills",     title: "Skills",     navLabel: "Skills" },
  { id: "experience", url: "varun.dev/experience", title: "Experience", navLabel: "Experience" },
  { id: "projects",   url: "varun.dev/projects",   title: "Projects",   navLabel: "Projects" },
  { id: "contact",    url: "varun.dev/contact",    title: "Contact",    navLabel: "Contact" },
];

export const SKILLS = [
  { group: "Frontend",    items: ["React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Framer Motion"] },
  { group: "3D & Visual", items: ["Three.js", "react-three-fiber", "WebGL", "Blender", "Shaders"] },
  { group: "Backend",     items: ["Node.js", "tRPC", "Postgres", "Supabase", "Redis"] },
  { group: "Tooling",     items: ["Vite", "Turborepo", "Docker", "Vitest", "Playwright"] },
];

export const EXPERIENCE = [
  {
    role: "Senior Creative Engineer",
    company: "Driftwood Studio",
    period: "2023 — Present",
    blurb: "Leading 3D & motion work across product launches for design-forward startups.",
  },
  {
    role: "Frontend Engineer",
    company: "Cedar & Co.",
    period: "2020 — 2023",
    blurb: "Built the design system and shipped the flagship analytics dashboard used by 30k teams.",
  },
  {
    role: "Full-stack Developer",
    company: "Atelier Numérique",
    period: "2018 — 2020",
    blurb: "Crafted bespoke websites for cultural institutions across France.",
  },
  {
    role: "Freelance Developer",
    company: "Independent",
    period: "2017 — 2018",
    blurb: "First clients, first lessons, first all-nighters. Worth every minute.",
  },
];

export const PROJECTS = [
  {
    title: "Forest Atlas",
    tag: "WebGL · Data viz",
    blurb: "An interactive 3D atlas mapping global reforestation projects in real time.",
    accent: "moss",
  },
  {
    title: "Driftwood Studio",
    tag: "SaaS · Design tool",
    blurb: "A collaborative shader playground used by 4k+ creative coders.",
    accent: "clay",
  },
  {
    title: "Lumen Notes",
    tag: "Product · Mobile",
    blurb: "A calm, plain-text journaling app with biometric encryption.",
    accent: "leaf",
  },
  {
    title: "Tideline",
    tag: "Brand · Web",
    blurb: "A poetic single-page site for an ocean-conservation non-profit.",
    accent: "moss",
  },
];
