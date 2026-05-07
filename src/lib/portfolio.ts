import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiAngular,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiDotnet,
  SiPython,
  SiSupabase,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiFigma,
  SiVercel,
  SiCloudflare,
  SiStorybook,
  SiChromatic,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { TbTestPipe } from "react-icons/tb";

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "contact";

export interface Skill {
  name: string;
  Icon: IconType;
  color: string;
}

export interface Section {
  id: SectionId;
  url: string;
  title: string;
  navLabel: string;
} 

export const SECTIONS: Section[] = [
  { id: "home", url: "varunsingh.com", title: "Home", navLabel: "Home" },
  {
    id: "about",
    url: "varunsingh.com/about",
    title: "About",
    navLabel: "About",
  },
  {
    id: "skills",
    url: "varunsingh.com/skills",
    title: "Skills",
    navLabel: "Skills",
  },
  {
    id: "experience",
    url: "varunsingh.com/experience",
    title: "Experience",
    navLabel: "Experience",
  },
  {
    id: "projects",
    url: "varunsingh.com/projects",
    title: "Projects",
    navLabel: "Projects",
  },
  {
    id: "contact",
    url: "varunsingh.com/contact",
    title: "Contact",
    navLabel: "Contact",
  },
];

export const SKILLS: { group: string; items: Skill[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { name: "Typescript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss, color: "#1572B6" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: ".NET Core", Icon: SiDotnet, color: "#512BD4" },
      { name: "Java", Icon: FaJava, color: "#E76F00" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "SQL Server", Icon: DiMsqlServer, color: "#CC2927" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    group: "Tools & Platforms",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Vercel", Icon: SiVercel, color: "#000000" },
      { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },
      { name: "Storybook", Icon: SiStorybook, color: "#FF4785" },
      { name: "Playwright", Icon: TbTestPipe, color: "#2EAD33" },
      { name: "Chromatic", Icon: SiChromatic, color: "#FC521F" },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "IT Manager",
    company: "Jyot",
    period: "Recent",
    date: "Dec 2025 — Jan 2026",
    blurb:
      "Developed a data management portal using Next.js and Supabase handling 400K+ records, reducing manual work by 60%. Engineered an email automation pipeline (Node.js, Amazon SES) sending 100K+ emails daily, and built an event/media platform with React and MongoDB.",
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
    image: "/projects/tabsense-img.webp",
    link: "https://chromewebstore.google.com/detail/tabsense/pgnhdikopgdnekgcdaabhffbppabbfcn",
  },
  {
    title: "UI Lab",
    tag: "Library · UI",
    blurb:
      "A developer-focused UI component platform providing reusable, production-ready components and structured docs.",
    accent: "leaf",
    image: "/projects/uilab-img.webp",
    link: "https://ui-lab-s20.netlify.app/",
  },
  {
    title: "Topology Visualizer",
    tag: "3D · WebGL",
    blurb:
      "Interactive 3D visualization tool for analyzing network latency built with Next.js and React Three Fiber.",
    accent: "clay",
    image: "/projects/latency-img.webp",
    link: "https://latencytopology.netlify.app/",
  },
  {
    title: "NodeWeave",
    tag: "Workflow · Tool",
    blurb:
      "An infinite canvas workflow editor for building visual logic systems with draggable nodes and smart connections.",
    accent: "moss",
    image: "/projects/nodeweave-img.webp",
    link: "https://nodeweave.vercel.app/",
  },
];
