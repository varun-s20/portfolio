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
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  active: SectionId;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function ScreenContent({ active }: Props) {
  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide bg-gradient-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {active === "home" && <Home />}
          {active === "about" && <About />}
          {active === "skills" && <Skills />}
          {active === "experience" && <Experience />}
          {active === "projects" && <Projects />}
          {active === "contact" && <Contact />}
        </motion.div>
      </AnimatePresence>
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 sm:p-14 max-w-4xl mx-auto w-full min-h-full flex flex-col justify-center"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/90 mb-4 font-semibold"
      >
        <Sparkles className="h-4 w-4" /> {eyebrow}
      </motion.div>
      <motion.h2
        variants={itemVariants}
        className="font-display text-4xl sm:text-[3.5rem] leading-[1.1] font-semibold tracking-tight mb-12 text-foreground"
      >
        {title}
      </motion.h2>
      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.div>
  );
}

function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-full w-full p-6 sm:p-14 flex flex-col justify-center overflow-hidden max-w-5xl mx-auto"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 80% 20%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(500px 280px at 10% 80%, hsl(var(--accent) / 0.18), transparent 60%)",
        }}
      />
      
      <div className="relative z-10 w-full flex flex-col items-start mt-8 sm:mt-0">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold mb-8 border border-primary/20 backdrop-blur-md shadow-sm ring-1 ring-primary/5"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)_/_0.6)]" />
          Available for new opportunities
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-[5rem] lg:text-[6rem] font-bold tracking-[-0.04em] leading-[1.05] mb-6 text-foreground"
        >
          Crafting <span className="text-gradient-forest italic font-serif">digital</span>
          <br className="hidden sm:block" /> experiences that
          <br className="hidden sm:block" /> connect & convert.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed font-medium"
        >
          Senior UI/UX Designer & Frontend Developer. I build immersive, high-performance web applications using React, Tailwind, and Framer Motion to elevate brands and drive engagement.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 text-sm"
        >
          <a
            href="#"
            className="group relative flex items-center justify-center px-8 py-4 font-semibold text-primary-foreground bg-primary rounded-full overflow-hidden transition-transform active:scale-95 shadow-glow hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)_/_0.5)]"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              Let's build together
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </a>
          <a
            href="#"
            className="group flex items-center justify-center px-8 py-4 font-semibold text-foreground bg-card/50 hover:bg-card border border-border border-b-2 rounded-full backdrop-blur-md transition-all active:scale-95 hover:border-primary/40 hover:text-primary z-10"
          >
            View my work
          </a>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="absolute bottom-10 left-6 sm:left-14 flex items-center gap-3 text-xs text-muted-foreground font-mono font-medium tracking-wide"
      >
        <span className="animate-pulse bg-primary/20 p-1.5 rounded-full">
          <ArrowRight className="h-3 w-3 text-primary rotate-90" />
        </span>
        Keep scrolling
      </motion.div>
    </motion.div>
  );
}

function About() {
  return (
    <SectionShell eyebrow="Hello" title="Bridging design & logic.">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-3 space-y-6 text-[15px] sm:text-[17px] text-muted-foreground leading-[1.8]">
          <p>
            I'm Varun — a software developer who sits at the intersection of
            <span className="text-foreground font-semibold">
              {" "}
              design, motion, and engineering
            </span>
            . Over the last 7 years, I've transformed complex requirements into seamless, intuitive interfaces that people love to use.
          </p>
          <p>
            My approach focuses on combining robust structural components with fluid micro-interactions. Whether it's architecting a scalable design system or perfecting a hover state, I care deeply about the details that make software feel <span className="italic text-foreground">premium</span>.
          </p>
          <p>
            When I'm not pushing pixels or wrangling React components, I'm experimenting with Three.js, exploring minimalist architecture, or brewing the perfect pour-over coffee.
          </p>
        </div>
        <aside className="lg:col-span-2 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-soft transition-shadow hover:bg-card/60 hover:border-primary/30">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50">
            <div className="h-14 w-14 rounded-full bg-gradient-forest p-[2px]">
               <div className="h-full w-full bg-background rounded-full border-2 border-background overflow-hidden relative">
                 <div className="absolute inset-0 bg-primary/10"></div>
                 {/* Placeholder for avatar */}
                 <div className="absolute bottom-0 inset-x-0 h-1/2 bg-primary/30 rounded-t-full"></div>
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary/40 rounded-full"></div>
               </div>
            </div>
            <div>
              <div className="font-semibold text-foreground text-lg">Varun</div>
              <div className="text-sm text-muted-foreground">Product Engineer</div>
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground font-medium"><MapPin className="h-4 w-4" /> Location</span>
              <span className="text-foreground font-semibold">Lyon, France</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground font-medium"><Briefcase className="h-4 w-4" /> Experience</span>
              <span className="text-foreground font-semibold">7+ Years</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground font-medium"><Sparkles className="h-4 w-4" /> Core Focus</span>
              <span className="text-foreground font-semibold">UI Engineering</span>
            </div>
          </div>
          <a href="#contact" className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.98]">
             <Mail className="h-4 w-4" /> Get in touch
          </a>
        </aside>
      </div>
    </SectionShell>
  );
}

function Skills() {
  return (
    <SectionShell eyebrow="Toolbelt" title="Craft & technology.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {SKILLS.map((g, i) => (
          <motion.div
            key={g.group}
            whileHover={{ y: -6 }}
            className="group rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-8 hover:bg-card/80 hover:border-primary/40 transition-all shadow-sm hover:shadow-soft"
          >
            <div className="text-xs uppercase tracking-widest text-primary font-bold mb-5 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary/80 shadow-[0_0_8px_hsl(var(--primary))]"></div>
              {g.group}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((it) => (
                <span
                  key={it}
                  className="text-sm px-4 py-2 rounded-xl bg-background text-foreground border border-border/50 font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-default"
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

function Experience() {
  return (
    <SectionShell eyebrow="Journey" title="Professional path.">
      <div className="relative border-l-2 border-border/60 ml-4 space-y-10 sm:space-y-14 pb-6 mt-4">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="pl-8 sm:pl-12 relative group"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[11px] top-1.5 h-5 w-5 rounded-full bg-background border-[3px] border-border group-hover:border-primary transition-colors duration-300 z-10" />
            <span className="absolute -left-[5px] top-[10px] h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 z-20" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {e.role}{" "}
                <span className="text-muted-foreground/80 font-medium font-sans text-xl">
                  @ {e.company}
                </span>
              </h3>
              <span className="text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full self-start sm:self-auto">
                {e.period}
              </span>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl group-hover:text-foreground/90 transition-colors">
              {e.blurb}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.div 
        whileHover={{ x: 5 }}
        className="mt-8 flex items-center gap-3 text-sm text-foreground font-semibold cursor-pointer group w-fit"
      >
        <Briefcase className="h-5 w-5 text-primary" /> 
        <span className="border-b border-foreground/30 group-hover:border-primary transition-colors pb-0.5">View full résumé</span>
        <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      </motion.div>
    </SectionShell>
  );
}

function Projects() {
  return (
    <SectionShell eyebrow="Selected work" title="Featured projects.">
      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-sm p-6 sm:p-10 hover:border-primary/50 hover:bg-card/80 hover:shadow-soft transition-all duration-300 overflow-hidden"
          >
            {/* Subtle dynamic background glow */}
            <div 
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
              style={{ backgroundColor: `hsl(var(--${p.accent}))` }}
            />
            
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="h-2.5 w-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: `hsl(var(--${p.accent}))`, boxShadow: `0 0 12px hsl(var(--${p.accent}))` }} 
                />
                <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-bold font-mono bg-background/50 px-2 py-0.5 rounded-md border border-border/50">
                  {p.tag}
                </div>
              </div>
              <div className="font-display text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                {p.title}
              </div>
              <div className="text-base text-muted-foreground max-w-xl leading-relaxed sm:pr-8">
                {p.blurb}
              </div>
            </div>
            
            <div className="relative z-10 flex-shrink-0 mt-2 sm:mt-0 bg-background rounded-full p-4 sm:p-5 border border-border group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transition-all duration-300">
              <ArrowUpRight className="h-6 w-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}

function Contact() {
  return (
    <SectionShell eyebrow="Say hi" title="Ready to collaborate?">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Whether you have a complex web application to build, a 3D interface to prototype, or just want to chat about the future of front-end — my inbox is always open.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                   <Mail className="h-5 w-5" />
                 </div>
                 <div>
                   <div className="text-sm font-semibold text-foreground mb-1">Email directly</div>
                   <a href="mailto:hello@varun.dev" className="text-muted-foreground hover:text-primary transition-colors">hello@varun.dev</a>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 sm:mt-auto pt-8 border-t border-border/60">
            <div className="text-sm font-semibold text-foreground mb-4">Connect elsewhere</div>
            <div className="flex gap-3">
              {[
                { Icon: Github, href: "#", name: "GitHub" },
                { Icon: Linkedin, href: "#", name: "LinkedIn" },
                { Icon: Twitter, href: "#", name: "Twitter" },
              ].map(({ Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="grid place-items-center h-12 w-12 rounded-2xl border border-border/80 bg-card/40 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-soft transition-all duration-300 active:scale-95"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-card/40 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-10 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

