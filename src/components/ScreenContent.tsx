import { SectionId, SKILLS, PROJECTS, EXPERIENCE } from "@/lib/portfolio";
import { ContactForm } from "./ContactForm";
import { Github, Linkedin, Twitter, MapPin, Sparkles, ArrowUpRight, ArrowRight, Briefcase } from "lucide-react";

interface Props { active: SectionId }

export function ScreenContent({ active }: Props) {
  return (
    <div key={active} className="h-full w-full overflow-y-auto scrollbar-hide animate-fade-in">
      {active === "home" && <Home />}
      {active === "about" && <About />}
      {active === "skills" && <Skills />}
      {active === "experience" && <Experience />}
      {active === "projects" && <Projects />}
      {active === "contact" && <Contact />}
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
    <div className="p-6 sm:p-10">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/80 mb-2">
        <Sparkles className="h-3 w-3" /> {eyebrow}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Home() {
  return (
    <div className="relative h-full w-full p-6 sm:p-10 flex flex-col justify-center bg-gradient-screen overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 80% 20%, hsl(var(--primary) / 0.18), transparent 60%), radial-gradient(500px 280px at 10% 80%, hsl(var(--accent) / 0.18), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Available · Spring 2026
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tighter leading-[0.95] mb-4">
          Hi, I'm <span className="text-gradient-forest italic">Varun</span>.
          <br />I build calm, <br className="sm:hidden" />meaningful software.
        </h1>
        <p className="max-w-md text-sm sm:text-base text-muted-foreground mb-6">
          A creative software developer blending product engineering, motion, and 3D
          into experiences that feel handmade.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-muted border border-border">React · TypeScript</span>
          <span className="px-2.5 py-1 rounded-full bg-muted border border-border">Three.js · WebGL</span>
          <span className="px-2.5 py-1 rounded-full bg-muted border border-border">Design systems</span>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <span>Keep scrolling</span>
          <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <SectionShell eyebrow="Hello" title="A creative engineer rooted in craft.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sm:col-span-2 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            I'm Varun — a software developer who sits at the intersection of
            <span className="text-foreground font-medium"> design, motion, and engineering</span>.
            For the past 7 years I've shipped products for early-stage startups
            and the occasional Fortune 500, with a soft spot for tactile,
            slightly-imperfect interfaces.
          </p>
          <p>
            When I'm not coding I'm hiking, writing little Three.js demos, or
            tending to an unreasonable number of houseplants.
          </p>
        </div>
        <aside className="rounded-xl border border-border bg-card/60 p-4 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Lyon, France
          </div>
          <div className="text-foreground"><span className="text-muted-foreground">Years coding · </span>7</div>
          <div className="text-foreground"><span className="text-muted-foreground">Stack · </span>TS · React · 3D</div>
          <div className="text-foreground"><span className="text-muted-foreground">Status · </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Open to projects
            </span>
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}

function Skills() {
  return (
    <SectionShell eyebrow="Toolbelt" title="What I build with.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKILLS.map((g) => (
          <div key={g.group} className="rounded-xl border border-border bg-card/60 p-4 hover:bg-card/90 transition-colors">
            <div className="text-xs uppercase tracking-wider text-primary mb-3">{g.group}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground/80 border border-border">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function Experience() {
  return (
    <SectionShell eyebrow="Journey" title="Where I've worked.">
      <ol className="relative border-l border-border/80 ml-2 space-y-5">
        {EXPERIENCE.map((e) => (
          <li key={e.company} className="pl-5 relative">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-gradient-forest ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="font-display text-base font-semibold">
                {e.role} <span className="text-muted-foreground font-normal">· {e.company}</span>
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">{e.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{e.blurb}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Briefcase className="h-3.5 w-3.5" /> Full résumé available on request.
      </div>
    </SectionShell>
  );
}

function Projects() {
  return (
    <SectionShell eyebrow="Selected work" title="A few things I'm proud of.">
      <div className="space-y-3">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            href="#"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card/60 p-4 hover:border-primary/50 hover:bg-card transition-all"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div>
              <div className="text-[11px] uppercase tracking-widest text-accent mb-1">{p.tag}</div>
              <div className="font-display text-lg font-semibold">{p.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5 max-w-md">{p.blurb}</div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </a>
        ))}
      </div>
    </SectionShell>
  );
}

function Contact() {
  return (
    <SectionShell eyebrow="Say hi" title="Let's make something good.">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
        <div className="sm:col-span-2 space-y-4">
          <p className="text-sm text-muted-foreground">
            Whether it's a 3D landing page, a gnarly product problem, or a coffee chat — drop a line.
          </p>
          <div className="flex gap-2">
            {[
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Twitter, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} className="grid place-items-center h-9 w-9 rounded-full border border-border bg-card/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="sm:col-span-3">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  );
}
