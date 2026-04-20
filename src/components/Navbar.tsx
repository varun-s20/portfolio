import { ThemeToggle } from "./ThemeToggle";
import { SECTIONS, SectionId } from "@/lib/portfolio";
import { Leaf } from "lucide-react";

interface Props {
  activeSection?: SectionId;
}

export function Navbar({ activeSection }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-forest shadow-soft">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Varun <span className="text-muted-foreground font-normal">Singh</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5 shadow-soft">
          {SECTIONS.filter((s) => s.id !== "home").map((s) => {
            const isActive = activeSection === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                }`}
              >
                {s.navLabel}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft"
          >
            Let's talk
          </a>
        </div>
      </div>
    </header>
  );
}
