import { useEffect, useState } from "react";
import { SectionId, SECTIONS } from "@/lib/portfolio";
import { ScreenContent } from "./ScreenContent";
import { ArrowLeft, ArrowRight, RotateCw, Lock } from "lucide-react";

interface Props { active: SectionId }

/**
 * BrowserScreen — the semi-3D UI rendered "inside" the MacBook screen.
 * Includes a faux browser chrome with a typewriter URL effect on section change.
 */
export function BrowserScreen({ active }: Props) {
  const section = SECTIONS.find((s) => s.id === active)!;
  const [typedUrl, setTypedUrl] = useState(section.url);

  useEffect(() => {
    let i = 0;
    setTypedUrl("");
    const interval = window.setInterval(() => {
      i++;
      setTypedUrl(section.url.slice(0, i));
      if (i >= section.url.length) window.clearInterval(interval);
    }, 28);
    return () => window.clearInterval(interval);
  }, [section.url]);

  return (
    <div className="h-full w-full bg-gradient-screen flex flex-col overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(8_70%_62%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(40_80%_60%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(130_45%_55%)]" />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground/70">
          <ArrowLeft className="h-3.5 w-3.5" />
          <ArrowRight className="h-3.5 w-3.5" />
          <RotateCw className="h-3 w-3" />
        </div>
        <div className="flex-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/70 border border-border/60 text-[11px] font-mono text-muted-foreground">
          <Lock className="h-2.5 w-2.5 text-primary" />
          <span className="truncate">{typedUrl}</span>
          <span className="w-1.5 h-3 bg-primary/70 ml-0.5 animate-blink" />
        </div>
        <div className="flex gap-1">
          {SECTIONS.map((s) => (
            <span
              key={s.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${s.id === active ? "bg-primary" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 relative">
        <ScreenContent active={active} />
      </div>
    </div>
  );
}
