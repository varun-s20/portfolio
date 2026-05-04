import { useEffect, useRef } from "react";
import { SectionId, SKILLS, PROJECTS, EXPERIENCE } from "@/lib/portfolio";
import { ContactForm } from "./ContactForm";
import {
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Briefcase,
  Mail,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Props {
  active: SectionId;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.95, rotate: -2 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export function ScreenContent({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleNavbarClick = (e: any) => {
      const id = e.detail;
      if (containerRef.current) {
        const el = containerRef.current.querySelector(
          `#section-${id}`,
        ) as HTMLElement;
        if (el) {
          const maxScroll =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;

          const targetScroll =
            el.getBoundingClientRect().top -
            containerRef.current.getBoundingClientRect().top +
            containerRef.current.scrollTop;

          const targetP = maxScroll > 0 ? targetScroll / maxScroll : 0;

          window.dispatchEvent(
            new CustomEvent("sync-outer-scroll", { detail: targetP }),
          );
        }
      }
    };
    window.addEventListener("navbar-click", handleNavbarClick);
    return () => window.removeEventListener("navbar-click", handleNavbarClick);
  }, []);

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (containerRef.current) {
        const p = e.detail;
        const maxScroll =
          containerRef.current.scrollHeight - containerRef.current.clientHeight;
        containerRef.current.scrollTop = p * maxScroll;
      }
    };
    window.addEventListener("macbook-scroll", handleScroll);
    return () => window.removeEventListener("macbook-scroll", handleScroll);
  }, []);

  useEffect(() => {
    const visibleHeights = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleHeights.set(entry.target.id, entry.intersectionRect.height);
        });

        // Find the section that occupies the most vertical space in the viewport
        let maxVisibleHeight = 0;
        let activeId = "";

        visibleHeights.forEach((height, id) => {
          if (height > maxVisibleHeight) {
            maxVisibleHeight = height;
            activeId = id.replace("section-", "");
          }
        });

        if (activeId) {
          window.dispatchEvent(
            new CustomEvent("macbook-section", { detail: activeId }),
          );
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
        root: containerRef.current,
      },
    );

    const sections = containerRef.current?.querySelectorAll("[id^='section-']");
    sections?.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-olive-paper text-white container"
    >
      <div id="section-home" className="paper-texture">
        <Home />
      </div>

      <div className="bg-white-paper text-olive torn-edge-top relative z-10 pb-20 pt-10">
        <div id="section-about" className="pt-10">
          <About />
        </div>
        <div id="section-skills" className="pt-20">
          <Skills />
        </div>
        <div id="section-experience" className="pt-20">
          <Experience />
        </div>
        <div id="section-projects" className="pt-20">
          <Projects />
        </div>
        <div id="section-contact" className="pt-20">
          <Contact />
        </div>
      </div>
    </div>
  );
}

function SectionShell({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex-1 w-full flex flex-col relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="p-6 sm:p-14 max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center z-10"
      >
        <motion.div
          variants={itemVariants}
          className={`inline-flex items-center gap-2 text-sm md:text-base font-handwriting tracking-wider mb-2 text-blue-600 font-bold`}
          style={{ "--rand": Math.random() } as React.CSSProperties}
        >
          <span className="rotate-[-2deg] bg-yellow-100 px-2 py-1 rounded-md border border-black/10 shadow-sm font-mono">
            {"<"} {eyebrow} {"/>"}
          </span>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className={`font-display text-5xl sm:text-6xl lg:text-7xl leading-[1] font-black tracking-tight mb-12 uppercase text-olive`}
          style={{ "--rand": Math.random() } as React.CSSProperties}
        >
          {title}
        </motion.h2>
        <motion.div variants={itemVariants}>{children}</motion.div>
      </motion.div>
    </div>
  );
}

const StarburstSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path
      d="M50 0L58 35L95 20L72 50L95 80L58 65L50 100L42 65L5 80L28 50L5 20L42 35Z"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
    />
  </svg>
);

export function Home() {
  return (
    <div className="min-h-screen w-full p-6 sm:p-14 flex flex-col justify-center items-center relative overflow-hidden mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-2 items-center w-full relative z-10">
        {/* Left: Avatar Doodle */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: -3, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative w-64 h-64 lg:w-80 lg:h-80 hover:rotate-0 transition-transform duration-300 group"
          >
            {/* Cutout background */}
            <div
              className="absolute inset-[-10px] bg-white rounded-3xl shadow-xl transition-all group-hover:scale-105"
              style={{
                clipPath: "polygon(3% 2%, 96% 4%, 98% 95%, 4% 98%, 0% 50%)",
              }}
            />
            {/* The doodle itself */}
            <div className="absolute inset-0 bg-blue-600 border-[6px] border-black overflow-hidden flex items-center justify-center rounded-[30px]">
              {/* Abstract face placeholder mimicking the reference */}
              <div className="absolute -left-6 top-1/4 w-12 h-20 bg-[#FF9A8B] border-[6px] border-black rounded-full z-10" />
              <div className="w-full h-full relative">
                <div className="absolute inset-x-0 -bottom-10 h-[110%] bg-[#FFCCAA] rounded-t-[100px] border-[6px] border-black" />
                <div className="absolute inset-x-0 -top-10 h-3/4 bg-black rounded-b-[100px] z-20" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-500 rounded-full z-30" />
              </div>
            </div>
            {/* Doodle scribble lines */}
            <svg
              viewBox="0 0 100 100"
              className="absolute -top-16 -right-10 w-32 h-32 text-yellow-accent -z-10 pointer-events-none hidden md:block"
            >
              <path
                d="M10 90 L 50 10 L 50 80 L 0 20 L 00 90"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Right: Typography */}
        <div className="flex flex-col items-start justify-center">
          <motion.h1
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-[4rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-black tracking-tight leading-[0.8] text-white flex flex-col items-center md:items-start"
          >
            <span className="flex items-center">VARUN</span>
            <span>SINGH</span>
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 md:mt-10 flex flex-col items-center md:items-start gap-4"
          >
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-handwriting text-yellow-accent font-bold">
              <span className="text-yellow-accent -mt-1 font-mono"></span>Full
              Stack Developer
            </div>
            <div className="mt-2 text-white max-w-lg text-sm lg:text-base opacity-90 leading-relaxed font-medium text-center md:text-left">
              I build scalable web applications, developer tools, and
              data-driven systems that solve real-world problems — from
              enterprise workflow automation to AI-powered products.
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <a
                href="#projects"
                className="border-2 border-white text-white px-5 py-2 rounded-full text-sm lg:text-base font-bold bg-transparent hover:bg-white hover:text-olive transition-colors cursor-pointer"
              >
                View Projects
              </a>
              <a
                href="https://drive.google.com/file/d/1K38d2V9J8d6oICKIXJdHHZ_hbuhebRA0/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-5 py-2 rounded-full text-sm lg:text-base font-bold bg-transparent hover:bg-white hover:text-olive transition-colors cursor-pointer"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <SectionShell eyebrow="Hello" title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start relative z-10">
        <div className="lg:col-span-3 space-y-6 text-lg sm:text-xl text-olive/80 leading-relaxed font-sans font-medium">
          <p className="bg-white p-4 shadow-sm border border-black/5 rotate-[-1deg]">
            I’m a full stack developer with experience building both
            enterprise-grade platforms and startup products.
          </p>
          <p className="bg-white p-4 shadow-sm border border-black/5 rotate-[1deg] ml-4">
            I work across modern technologies like React, Next.js, Angular,
            Node.js, and .NET to create systems that are scalable, efficient,
            and user-focused. My work focuses on solving real problems — whether
            that’s automating complex workflows, improving performance at scale,
            or designing intuitive user experiences.
          </p>
          <p className="bg-white p-4 shadow-sm border border-black/5 rotate-[-1deg]">
            As a freelance developer, I led and delivered a full product ahead
            of schedule. I’ve also built AI-powered tools, developer platforms,
            and high-scale data systems handling hundreds of thousands of
            records.
          </p>
          <p className="font-handwriting text-2xl text-olive/70 mt-8 rotate-[1deg]">
            I enjoy working at the intersection of engineering, product, and
            design — building solutions that are both technically strong and
            genuinely useful.
          </p>
        </div>

        <aside className="lg:col-span-2 relative mt-8 lg:-mt-36 group cursor-default">
          <div className="polaroid mx-auto w-[280px] sm:w-[320px] hover:animate-jitter transition-transform z-20">
            <div className="tape" />
            <div className="aspect-square bg-olive mb-4 border-2 border-black/10 overflow-hidden relative group-hover:border-yellow-accent transition-colors">
              <div className="absolute inset-0 paper-texture opacity-30" />
              {/* Abstract avatar placeholder */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-blue-600 rounded-t-[100px] border-[6px] border-black" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-accent rounded-[40px] border-[6px] border-black shadow-lg">
                <div className="absolute top-4 left-4 w-4 h-6 bg-black rounded-full" />
                <div className="absolute top-4 right-4 w-4 h-6 bg-black rounded-full" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-black rounded-full" />
              </div>
            </div>
            <div className="font-handwriting text-3xl text-center text-blue-700 font-bold rotate-[-2deg]">
              Varun Singh
            </div>
            <div className="text-center text-xs text-olive/60 font-mono mt-1">
              Frontend Focused Full Stack Developer
            </div>
          </div>

          <div className="mt-8 bg-[#fffbe6] p-5 border-2 border-dashed border-olive/30 rotate-[2deg] relative z-20">
            <h3 className="font-handwriting text-2xl font-bold text-blue-600 mb-2">
              🎓 Education
            </h3>
            <p className="font-mono text-sm font-bold text-olive">
              B.Tech in Computer Engineering
            </p>
            <p className="text-xs text-olive/80 mb-2 mt-1">
              MPSTME, NMIMS, Mumbai
            </p>
            <p className="text-xs text-olive/80 mb-2 font-mono">
              Sep 2021 – Aug 2025
            </p>
            <p className="font-mono text-xs text-olive bg-yellow-accent/40 inline-block px-2 py-1">
              CGPA: 3.57 / 4
            </p>
          </div>

          <div className="mt-6 bg-[#f4fbff] p-5 border-2 border-dashed border-olive/30 rotate-[-1deg] relative z-20">
            <h3 className="font-handwriting text-2xl font-bold text-blue-600 mb-2">
              🏆 Achievements
            </h3>
            <ul className="text-sm text-olive/80 space-y-3 font-medium">
              <li className="flex items-start gap-2">
                <span>🥈</span> 2nd Place — HighSchoolHacks (MLH)
              </li>
              <li className="flex items-start gap-2">
                <span>🌟</span> Top 10 Finalist — HackOverflow 6.0
              </li>
            </ul>
          </div>

          {/* Decorative doodle */}
          <svg
            viewBox="0 0 100 100"
            className="absolute -bottom-10 -left-10 w-24 h-24 text-yellow-accent -z-10 rotate-12"
          >
            <path
              d="M50 10 Q 60 50 90 50 Q 60 50 50 90 Q 40 50 10 50 Q 40 50 50 10 Z"
              fill="currentColor"
            />
          </svg>
        </aside>
      </div>
    </SectionShell>
  );
}

export function Skills() {
  return (
    <SectionShell eyebrow="Toolbelt" title="Softwares">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 relative z-10">
        {SKILLS.map((g, i) => (
          <motion.div
            key={g.group}
            className="polaroid hover:animate-jitter cursor-default"
            style={{ "--rand": (i % 3) * 0.5 } as React.CSSProperties}
          >
            <div
              className="tape"
              style={{ backgroundColor: "rgba(255, 222, 0, 0.6)" }}
            />
            <div className="font-handwriting text-2xl text-blue-700 font-bold mb-4 border-b-2 border-dashed border-olive/20 pb-2">
              {g.group}
            </div>
            <div className="flex flex-wrap gap-3">
              {g.items.map((it, j) => (
                <span
                  key={it}
                  className="bg-olive text-white px-3 py-1.5 rounded-md font-mono text-sm font-semibold shadow-md transform transition-transform hover:scale-110"
                  style={{
                    transform: `rotate(${(j % 2 === 0 ? 1 : -1) * 2}deg)`,
                  }}
                >
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

export function Experience() {
  return (
    <SectionShell eyebrow="Journey" title="Experience">
      <div className="mb-10 bg-[#f4fbff] border-2 border-dashed border-blue-200 p-6 sm:p-8 rotate-[1deg] shadow-sm relative z-20">
        <h3 className="font-handwriting text-3xl font-bold text-blue-600 mb-6 border-b-2 border-dashed border-blue-200 pb-2">
          Impact Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 font-medium text-olive/90 text-sm sm:text-base">
          <div className="flex items-start gap-3">
            <span className="text-xl">⏱️</span>{" "}
            <span>Led and delivered full-stack projects ahead of schedule</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>{" "}
            <span>Built systems handling 300K–400K records efficiently</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📧</span>{" "}
            <span>Designed email pipelines sending 100K+ emails daily</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📈</span>{" "}
            <span>Improved user engagement by 35% through UI/UX redesign</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🚀</span>{" "}
            <span>Reduced engineering workflow time by over 70%</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🏢</span>{" "}
            <span>
              Delivered production-ready features in enterprise environments
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-l-4 border-dashed border-olive/20 ml-6 space-y-12 sm:space-y-16 pb-6 mt-8 z-10">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pl-8 sm:pl-12 relative group"
          >
            <span className="absolute -left-[14px] top-0 h-6 w-6 rounded-full bg-yellow-accent border-4 border-olive group-hover:scale-125 transition-transform duration-300 z-10 shadow-md" />

            <div className="flex items-center gap-4 mb-4">
              <div className="sticker border-olive text-olive font-mono text-xs px-2 py-1 rotate-[-2deg]">
                {e.period}
              </div>
              {e.date && (
                <span className="font-mono text-xs font-bold text-olive/40 tracking-wider uppercase">
                  {e.date}
                </span>
              )}
            </div>
            <h3 className="font-display text-3xl font-black text-olive leading-none mb-2">
              {e.role}
            </h3>
            <div className="font-handwriting text-2xl text-blue-600 font-bold mb-3">
               {e.company}
            </div>
            <p className="text-base sm:text-lg text-olive/80 leading-relaxed max-w-2xl bg-white p-4 shadow-sm border border-black/5 rotate-[1deg]">
              {e.blurb}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

export function Projects() {
  return (
    <SectionShell eyebrow="Selected work" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 relative z-10">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            className="polaroid hover:animate-jitter group block w-full"
            style={{ "--rand": i % 2 === 0 ? 0.8 : 0.2 } as React.CSSProperties}
          >
            <div className="tape" />
            <div
              className={`aspect-[4/3] bg-${p.accent} mb-4 border-4 border-olive overflow-hidden relative paper-texture`}
            >
              {/* Abstract project visuals */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/20 rounded-full blur-xl absolute" />
                <span className="font-display text-4xl text-olive font-black mix-blend-overlay rotate-12 opacity-50">
                  {p.title.split(" ")[0]}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-handwriting text-3xl text-blue-700 font-bold">
                  {p.title}
                </h3>
                <div className="bg-yellow-accent text-olive text-[10px] font-bold font-mono px-2 py-1 border-2 border-olive rounded-sm rotate-[3deg]">
                  {p.tag}
                </div>
              </div>
              <p className="text-olive/80 text-sm font-medium leading-snug mt-2">
                {p.blurb}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}

export function Contact() {
  return (
    <SectionShell eyebrow="Say hi" title="Contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        <div className="flex flex-col justify-center">
          <p className="text-lg sm:text-xl text-olive/90 leading-relaxed mb-8 font-medium max-w-md bg-white p-6 border border-black/5 shadow-sm rotate-[-1deg] lg:-mt-16">
            Have an opportunity, an idea, or just want to connect? I’m always
            open to building something meaningful or discussing new
            opportunities.
          </p>

          <div className="flex flex-col gap-5 mt-4">
            <a
              href="mailto:varun17593@gmail.com"
              className="flex items-center gap-3 sticker hover:animate-jitter rotate-[2deg] self-start"
              style={{ "--rand": 0.9 } as React.CSSProperties}
            >
              <Mail className="h-5 w-5" /> varun17593@gmail.com
            </a>
            <div
              className="flex items-center gap-3 sticker hover:animate-jitter rotate-[-1deg] self-start"
              style={{ "--rand": 0.4 } as React.CSSProperties}
            >
              <span className="font-mono text-lg">📱</span> +91 9580868588
            </div>
            <div
              className="flex gap-4 items-center sticker rotate-[1deg] self-start"
              style={{ "--rand": 0.1 } as React.CSSProperties}
            >
              <a
                href="https://www.linkedin.com/in/varun-singh-802816213"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5" />{" "}
                <span className="font-bold">LinkedIn</span>
              </a>
              <a
                href="https://github.com/varun-s20"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors flex items-center gap-2 ml-4"
              >
                <Github className="h-5 w-5" />{" "}
                <span className="font-bold">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="polaroid hover:animate-jitter w-full max-w-md ml-auto"
            style={{ "--rand": 0.5 } as React.CSSProperties}
          >
            <div className="tape" />
            <h3 className="font-handwriting text-3xl text-olive font-bold mb-6 text-center border-b-2 border-dashed border-olive/20 pb-4">
              Drop a note 📝
            </h3>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder=" name"
                  className="w-full bg-transparent border-0 border-b-2 border-olive/30 focus:border-blue-600 focus:ring-0 px-0 py-2 text-olive font-handwriting text-xl placeholder:text-olive/40"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder=" email"
                  className="w-full bg-transparent border-0 border-b-2 border-olive/30 focus:border-blue-600 focus:ring-0 px-0 py-2 text-olive font-handwriting text-xl placeholder:text-olive/40"
                />
              </div>
              <div>
                <textarea
                  placeholder="tell me about your idea..."
                  rows={3}
                  className="w-full bg-transparent border-0 border-b-2 border-olive/30 focus:border-blue-600 focus:ring-0 px-0 py-2 text-olive font-handwriting text-xl placeholder:text-olive/40 resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full bg-olive text-white font-bold font-mono py-3 rounded-md shadow-[4px_4px_0_0_#FFDE00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#FFDE00] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
              >
                SEND_MESSAGE()
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
