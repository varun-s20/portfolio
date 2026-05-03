export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "contact";

export interface Section {
  id: SectionId;
  url: string;
  title: string;
  navLabel: string;
}

export const SECTIONS: Section[] = [
  { id: "home", url: "varun.dev", title: "Home", navLabel: "Home" },
  { id: "about", url: "varun.dev/about", title: "About", navLabel: "About" },
  {
    id: "skills",
    url: "varun.dev/skills",
    title: "Skills",
    navLabel: "Skills",
  },
  {
    id: "experience",
    url: "varun.dev/experience",
    title: "Experience",
    navLabel: "Experience",
  },
  {
    id: "projects",
    url: "varun.dev/projects",
    title: "Projects",
    navLabel: "Projects",
  },
  {
    id: "contact",
    url: "varun.dev/contact",
    title: "Contact",
    navLabel: "Contact",
  },
];

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Typescript",
      "Angular",
      "HTML",
      "CSS",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", ".NET Core", "Java", "Python"],
  },
  {
    group: "Databases",
    items: ["Supabase", "PostgreSQL", "MongoDB", "MySQL", "SQL Server", "Firebase"],
  },
  {
    group: "Tools & Platforms",
    items: ["Git", "Figma", "Vercel", "Cloudflare", "Storybook", "Playwright", "Chromatic"],
  },
];

export const EXPERIENCE = [
  {
    role: "IT Manager",
    company: "Jyot",
    period: "Recent",
    date: "Dec 2025 — Jan 2026",
    blurb: "Developed a data management portal using Next.js and Supabase handling 400K+ records, reducing manual work by 60%. Engineered an email automation pipeline (Node.js, Amazon SES) sending 100K+ emails daily, and built an event/media platform with React and MongoDB.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Worley",
    period: "Past",
    date: "Jan 2025 — June 2025",
    blurb:
      "Built a comment extraction module using Angular, .NET Core, and SQL Server that reduced manual review workflows from 4 hours to under 30 minutes. Developed an Excel export system, file validation pipeline, and resolved 30+ critical bugs across multiple Agile sprint cycles.",
  },
  {
    role: "Freelance Web Developer",
    company: "TDOT Immigration",
    period: "Past",
    date: "Apr 2024 — July 2024",
    blurb:
      "Led end-to-end development of a client immigration portal using Next.js and Supabase. Managed a team of 4 developers, delivering 2 weeks ahead of schedule. Designed UI/UX from scratch in Figma (35% increase in engagement) and built a custom admin panel.",
  },
  
];

export const PROJECTS = [
  {
    title: "TabSense",
    tag: "AI · Extension",
    blurb:
      "AI-powered Chrome extension that intelligently organizes browser tabs using TypeScript, Spring, and Gemini API.",
    accent: "moss",
  },
  {
    title: "UI Lab",
    tag: "Library · UI",
    blurb: "A developer-focused UI component platform providing reusable, production-ready components and structured docs.",
    accent: "leaf",
  },
  {
    title: "Topology Visualizer",
    tag: "3D · WebGL",
    blurb: "Interactive 3D visualization tool for analyzing network latency built with Next.js and React Three Fiber.",
    accent: "clay",
  },
  {
    title: "NodeWeave",
    tag: "Workflow · Tool",
    blurb: "An infinite canvas workflow editor for building visual logic systems with draggable nodes and smart connections.",
    accent: "moss",
  },
];
