import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS, SectionId } from "@/lib/portfolio";

interface Props {
  activeSection?: SectionId;
}

const DotsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="5" cy="5" r="1.6" />
    <circle cx="11" cy="5" r="1.6" />
    <circle cx="5" cy="11" r="1.6" />
    <circle cx="11" cy="11" r="1.6" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 4 L12 12 M12 4 L4 12" />
  </svg>
);

export function Navbar({ activeSection }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3 sm:pt-4">
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 bg-background/40 backdrop-blur-sm cursor-default"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="mx-auto w-full max-w-7xl overflow-hidden"
        style={{ borderRadius: open ? 28 : 999 }}
      >
        <div className="flex items-center justify-between gap-3 pl-3 pr-2 sm:pl-4 sm:pr-3 py-2">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="flex items-center shrink-0 "
          >
            <img
              src="/logo-varun.webp"
              alt="Varun"
              className="h-12 w-auto select-none "
              draggable={false}
            />
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-foreground text-background text-[13px] font-medium tracking-tight hover:opacity-90 transition-opacity"
            >
              Let's talk!
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid place-items-center h-9 w-9 rounded-full bg-card/85 supports-[backdrop-filter]:bg-card/70 backdrop-blur-xl border border-border/60 transition-colors hover:bg-foreground/5"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="grid place-items-center"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="dots"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="grid place-items-center"
                  >
                    <DotsIcon className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 px-6 sm:px-10 pt-6 pb-8 sm:pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-16 gap-y-1 sm:gap-y-2">
                  {SECTIONS.map((s, i) => {
                    const isActive = activeSection === s.id;
                    return (
                      <motion.a
                        key={s.id}
                        href={`#${s.id}`}
                        // onClick={() => setOpen(false)}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.06 + i * 0.04,
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`group flex items-baseline justify-between gap-4 py-2 sm:py-3 border-b border-border/30 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 transition-colors ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/35  hover:text-foreground"
                        }`}
                      >
                        <span className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[0.95]">
                          {s.navLabel}
                        </span>
                        <span
                          className={`hidden sm:block font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity ${
                            isActive
                              ? "opacity-60"
                              : "opacity-0 group-hover:opacity-50"
                          }`}
                        >
                          0{i + 1}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
