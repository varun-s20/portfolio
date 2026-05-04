import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SECTIONS, SectionId } from "@/lib/portfolio";
import { ChevronDown, Terminal } from "lucide-react";
import {
  Home,
  About,
  Skills,
  Experience,
  Projects,
  Contact,
} from "@/components/ScreenContent";

const MacbookCanvas = lazy(() =>
  import("@/components/Macbook3D").then((m) => ({ default: m.MacbookCanvas })),
);

/**
 * Scroll choreography
 * --------------------
 * Everything lives in ONE tall scroll stage. The sticky container shows
 * either the 3D MacBook or the fullscreen site depending on scroll position.
 *
 *   [ INTRO ][ STORY ][ FULLSCREEN sections… ]
 *
 * - INTRO slice  : lid animates from half-closed → fully open
 * - STORY slice  : captions appear, screen animation plays (VSC → Chrome)
 *   At the end of STORY, isFullScreen flips to true (sp >= 0.99).
 *   Scrolling back (sp < 0.97) flips it back to false.
 * - FULLSCREEN slices: one slice per section. The fullscreen container's
 *   scrollTop is driven by innerP derived from the outer scroll position.
 *   Scrolling back through all of them returns to 3D.
 */
const INTRO_SLICES = 1;
const STORY_SLICES = 2.5;
const SECTION_SLICES = 1.5;

const Index = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const fsContainerRef = useRef<HTMLDivElement>(null);

  const [openAmount, setOpenAmount] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Track innerP so we can drive the fullscreen container's scroll
  const innerPRef = useRef(0);
  // Ref-gated active section — avoids re-rendering Navbar on every scroll tick
  const activeSectionRef = useRef<SectionId>("home");
  // Pre-measured section start positions as fractions of maxScroll (measured at scrollTop=0)
  const sectionFractionsRef = useRef<{ id: SectionId; fraction: number }[]>([]);

  const totalSlices =
    INTRO_SLICES + STORY_SLICES + SECTIONS.length * SECTION_SLICES;

  // Sync active section from macbook inner scroll events
  useEffect(() => {
    const handleMacbookSection = (e: any) => {
      setActiveSection(e.detail);
    };
    window.addEventListener("macbook-section", handleMacbookSection);
    return () =>
      window.removeEventListener("macbook-section", handleMacbookSection);
  }, []);

  // Pre-measure section positions once content is rendered.
  // We reset scrollTop to 0 so all measurements are from the content origin,
  // then store each section's start as a fraction of maxScroll.
  useEffect(() => {
    const measure = () => {
      const fsEl = fsContainerRef.current;
      if (!fsEl) return;
      const maxScroll = fsEl.scrollHeight - fsEl.clientHeight;
      if (maxScroll <= 0) return;

      const saved = fsEl.scrollTop;
      fsEl.scrollTop = 0;
      const fsTop = fsEl.getBoundingClientRect().top;

      sectionFractionsRef.current = SECTIONS.map((s) => {
        const sEl = fsEl.querySelector(`#fs-${s.id}`) as HTMLElement | null;
        const absTop = sEl ? sEl.getBoundingClientRect().top - fsTop : 0;
        return { id: s.id, fraction: absTop / maxScroll };
      });

      fsEl.scrollTop = saved;
    };

    // Delay to let content fully render before measuring
    const timer = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // ── Main scroll driver ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const progress = total > 0 ? scrolled / total : 0;

      const sliceProgress = progress * totalSlices;

      // Lid
      const open = Math.min(sliceProgress / INTRO_SLICES, 1);
      setOpenAmount(open);

      // Story progress (0 → 1 over STORY_SLICES)
      let sp = 0;
      if (sliceProgress > INTRO_SLICES) {
        sp = Math.min((sliceProgress - INTRO_SLICES) / STORY_SLICES, 1);
      }
      setStoryProgress(sp);

      // Flip fullscreen on/off based on story progress
      // Use a small hysteresis band: enter at 0.99, exit at 0.95
      setIsFullScreen((prev) => {
        if (!prev && sp >= 0.99) return true;
        if (prev && sp < 0.95) return false;
        return prev;
      });

      // Inner progress (0 → 1 over section slices, after story ends)
      let innerP = 0;
      if (sliceProgress > INTRO_SLICES + STORY_SLICES) {
        innerP =
          (sliceProgress - (INTRO_SLICES + STORY_SLICES)) /
          (SECTIONS.length * SECTION_SLICES);
      }
      innerP = Math.min(Math.max(innerP, 0), 1);
      innerPRef.current = innerP;

      // Drive the fullscreen container's scrollTop directly from outer scroll
      const fsEl = fsContainerRef.current;
      if (fsEl) {
        const maxScroll = fsEl.scrollHeight - fsEl.clientHeight;
        fsEl.scrollTop = innerP * maxScroll;

        // Determine active section using pre-measured fractions — pure math,
        // no layout queries. Section is active when the scroll point (innerP
        // offset by 30% of the viewport relative to total content) has passed
        // the section's start fraction.
        const fractions = sectionFractionsRef.current;
        if (fractions.length > 0 && maxScroll > 0) {
          // How much of the content does 30% of the viewport represent?
          const viewportFraction = (fsEl.clientHeight * 0.3) / maxScroll;
          let nextSection: SectionId = fractions[0]?.id ?? "home";
          fractions.forEach(({ id, fraction }) => {
            if (innerP >= fraction - viewportFraction) nextSection = id;
          });
          if (nextSection !== activeSectionRef.current) {
            activeSectionRef.current = nextSection;
            setActiveSection(nextSection);
          }
        }
      }

      // Also keep the macbook inner screen in sync (for when 3D is visible)
      window.dispatchEvent(
        new CustomEvent("macbook-scroll", { detail: innerP }),
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [totalSlices]);


  // Navbar click handler: in fullscreen mode drive outer scroll to right section
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

      if (isFullScreen) {
        const el = stageRef.current;
        const fsEl = fsContainerRef.current;
        if (!el || !fsEl) return;
        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;

        // Use getBoundingClientRect to get the section's true position
        // relative to fsEl, regardless of nested div positioning.
        // Adjust for fsEl's current scrollTop to get the absolute content offset.
        const sectionEl = fsEl.querySelector(`#fs-${id}`) as HTMLElement | null;
        if (!sectionEl) return;

        const sectionRect = sectionEl.getBoundingClientRect();
        const fsRect = fsEl.getBoundingClientRect();
        // Distance from top of fs content (accounting for current scroll)
        const absoluteSectionTop = sectionRect.top - fsRect.top + fsEl.scrollTop;

        const maxFsScroll = fsEl.scrollHeight - fsEl.clientHeight;
        const targetInnerP = maxFsScroll > 0
          ? Math.min(absoluteSectionTop, maxFsScroll) / maxFsScroll
          : 0;

        const targetSliceProgress =
          INTRO_SLICES + STORY_SLICES + targetInnerP * SECTIONS.length * SECTION_SLICES;
        const targetProgress = targetSliceProgress / totalSlices;
        window.scrollTo({
          top: el.offsetTop + targetProgress * total,
          behavior: "smooth",
        });
        return;
      }

      // 3D mode: sync inner macbook screen
      window.dispatchEvent(new CustomEvent("navbar-click", { detail: id }));
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [totalSlices, isFullScreen]);

  // Outer scroll sync from inner macbook scroll
  useEffect(() => {
    const handleSync = (e: any) => {
      const targetP = e.detail;
      const el = stageRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const total = el.offsetHeight - vh;
      const storyEndProgress = (INTRO_SLICES + STORY_SLICES) / totalSlices;
      const sectionsTotalProgress =
        (SECTIONS.length * SECTION_SLICES) / totalSlices;
      const targetOuterProgress =
        storyEndProgress + targetP * sectionsTotalProgress;
      window.scrollTo({
        top: el.offsetTop + targetOuterProgress * total,
        behavior: "smooth",
      });
    };
    window.addEventListener("sync-outer-scroll", handleSync);
    return () => window.removeEventListener("sync-outer-scroll", handleSync);
  }, [totalSlices]);

  return (
    <div id="top" className="relative bg-gradient-sky">
      <Navbar activeSection={activeSection} />

      {/* The ENTIRE site is one tall scroll stage. */}
      <section
        ref={stageRef}
        className="relative"
        style={{ height: `${totalSlices * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* ── Decorative backdrop ── */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" />
            <div
              className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* ── 3D MacBook layer ── fades out when fullscreen */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-700"
            style={{ opacity: isFullScreen ? 0 : 1, pointerEvents: isFullScreen ? "none" : "auto" }}
          >
            <Suspense
              fallback={
                <div className="h-full w-full grid place-items-center text-muted-foreground text-sm">
                  Loading 3D scene…
                </div>
              }
            >
              <MacbookCanvas
                openAmount={openAmount}
                activeSection={activeSection}
                storyProgress={storyProgress}
                onMaximize={() => {}}
              />
            </Suspense>
          </div>

          {/* ── Fullscreen portfolio layer ── scroll-driven by outer scroll */}
          <div
            ref={fsContainerRef}
            className="absolute inset-0 z-20 overflow-hidden transition-opacity duration-700"
            style={{ opacity: isFullScreen ? 1 : 0, pointerEvents: isFullScreen ? "auto" : "none" }}
          >
            <div className="flex flex-col w-full bg-olive-paper text-white paper-texture pt-16">
              <section id="fs-home">
                <Home />
              </section>
              <div className="bg-white-paper text-olive torn-edge-top relative z-10 pb-20 pt-10">
                <section id="fs-about" className="pt-10">
                  <About />
                </section>
                <section id="fs-skills" className="pt-20">
                  <Skills />
                </section>
                <section id="fs-experience" className="pt-20">
                  <Experience />
                </section>
                <section id="fs-projects" className="pt-20">
                  <Projects />
                </section>
                <section id="fs-contact" className="pt-20">
                  <Contact />
                </section>
              </div>
            </div>
          </div>

          {/* ── Intro overlay ── fades as lid opens */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[15%] z-30 flex justify-center transition-opacity duration-500"
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

          {/* ── YouTube-style captions ── */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[20%] z-30 flex justify-center">
            {storyProgress > 0 && storyProgress < 0.25 && (
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-lg sm:text-xl max-w-lg text-center animate-in fade-in zoom-in duration-300">
                Oh hi, didn't see you there.
              </div>
            )}
            {storyProgress >= 0.25 && storyProgress < 0.5 && (
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-lg sm:text-xl max-w-lg text-center animate-in fade-in zoom-in duration-300">
                Was building my portfolio, wanna see?
              </div>
            )}
            {storyProgress >= 0.8 && storyProgress < 0.99 && (
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-lg sm:text-xl max-w-lg text-center animate-in fade-in zoom-in duration-300">
                Let me just do fullscreen for you...
              </div>
            )}
          </div>

          {/* ── Bottom HUD ── */}
          <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-30 flex justify-center">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-3 shadow-soft">
              <Terminal className="h-3.5 w-3.5 text-primary" />
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
