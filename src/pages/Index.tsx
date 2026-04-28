import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SECTIONS, SectionId } from "@/lib/portfolio";
import { ChevronDown, Leaf } from "lucide-react";

const MacbookCanvas = lazy(() =>
  import("@/components/Macbook3D").then((m) => ({ default: m.MacbookCanvas })),
);

/**
 * Scroll choreography
 * --------------------
 * The MacBook is the entire site. It's pinned (sticky) for the whole journey:
 *
 *   [ INTRO ][ STORY ][ HOME ][ ABOUT ][ SKILLS ][ EXPERIENCE ][ PROJECTS ][ CONTACT ]
 *
 * - INTRO slice  : lid animates from half-closed → fully open
 * - STORY slice  : captions appear outside, screen animation plays (VSC -> Chrome)
 * - SECTION slice: one slice per section. When the user is inside a slice,
 *                  the corresponding page renders inside the MacBook screen
 *                  and the URL bar updates.
 * Each slice = 1 viewport of scroll, so the user has time to read each page.
 */
const INTRO_SLICES = 1; // intro takes 1 viewport
const STORY_SLICES = 2; // story sequence takes 2 viewports
const SECTION_SLICES = 1; // each section takes 1 viewport

const Index = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [openAmount, setOpenAmount] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const totalSlices = INTRO_SLICES + STORY_SLICES + SECTIONS.length * SECTION_SLICES;

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;

      // How many slices we've scrolled through (0 .. totalSlices)
      const sliceProgress = progress * totalSlices;

      // Lid: opens during the very first slice
      const open = Math.min(sliceProgress / INTRO_SLICES, 1);
      setOpenAmount(open);

      // Story Progress (0 to 1 over the 2 STORY_SLICES)
      let sp = 0;
      if (sliceProgress > INTRO_SLICES) {
        sp = Math.min((sliceProgress - INTRO_SLICES) / STORY_SLICES, 1);
      }
      setStoryProgress(sp);

      // Section: index 0..SECTIONS.length-1
      if (sliceProgress < INTRO_SLICES + STORY_SLICES) {
        setActiveSection("home"); // keep home active during story
      } else {
        const sectionFloat = (sliceProgress - (INTRO_SLICES + STORY_SLICES)) / SECTION_SLICES;
        const idx = Math.min(Math.floor(sectionFloat), SECTIONS.length - 1);
        setActiveSection(SECTIONS[idx].id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalSlices]);

  // Click handler: scroll to the middle of the requested section's slice
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const a = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (id === "top") return;
      const idx = SECTIONS.findIndex((s) => s.id === id);
      if (idx === -1) return;
      e.preventDefault();
      const el = stageRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      // Middle of the slice for this section
      const sliceCenter = INTRO_SLICES + STORY_SLICES + idx * SECTION_SLICES + SECTION_SLICES * 0.5;
      const ratio = sliceCenter / totalSlices;
      const top = el.offsetTop + total * ratio;
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [totalSlices]);

  return (
    <div id="top" className="relative bg-gradient-sky">
      <Navbar activeSection={activeSection} />

      {/* The ENTIRE site is one tall scroll stage.
          The MacBook lives in a sticky container and stays pinned the whole time.
          Stage height = (intro + story + every section) × 1 viewport each. */}
      <section
        ref={stageRef}
        className="relative"
        style={{ height: `${totalSlices * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Decorative backdrop */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
            <div
              className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* The 3D MacBook — fills the viewport */}
          <div className="absolute inset-0 z-10">
            <Suspense
              fallback={
                <div className="h-full w-full grid place-items-center text-muted-foreground text-sm">
                  Loading 3D scene…
                </div>
              }
            >
              <MacbookCanvas openAmount={openAmount} activeSection={activeSection} storyProgress={storyProgress} />
            </Suspense>
          </div>

          {/* Intro overlay — fades out as the lid opens */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[15%] z-20 flex justify-center transition-opacity duration-500"
            style={{ opacity: Math.max(0, 1 - openAmount * 1.6) }}
          >
            <div className="text-center">
              <p className="font-display text-2xl sm:text-3xl text-foreground/90 mb-2">
                Welcome.
              </p>
              <div className="inline-flex flex-col items-center gap-1 text-xs text-muted-foreground animate-float">
                <span>Scroll to open the laptop</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* YouTube-style center captions */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[20%] z-20 flex justify-center">
            {storyProgress > 0 && storyProgress < 0.25 && (
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-lg sm:text-xl max-w-lg text-center animate-in fade-in zoom-in duration-300 pointer-events-auto">
                Oh hi, didn't see you there.
              </div>
            )}
            {storyProgress >= 0.25 && storyProgress < 0.5 && (
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-lg sm:text-xl max-w-lg text-center animate-in fade-in zoom-in duration-300 pointer-events-auto">
                Was building my portfolio, wanna see?
              </div>
            )}
          </div>

          {/* Bottom HUD — opening % during intro, then segmented progress */}
          <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-30 flex justify-center">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-3 shadow-soft pointer-events-auto">
              <Leaf className="h-3.5 w-3.5 text-primary" />
              {openAmount < 1 ? (
                <span className="font-mono text-xs text-muted-foreground">
                  Opening · {Math.round(openAmount * 100)}%
                </span>
              ) : storyProgress > 0 && storyProgress < 1 ? (
                <span className="font-mono text-xs text-muted-foreground">
                  Loading Experience · {Math.round(storyProgress * 100)}%
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  {SECTIONS.map((s) => (
                    <span
                      key={s.id}
                      className={`h-1.5 rounded-full transition-all ${
                        s.id === activeSection
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground capitalize">
                    {activeSection}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
