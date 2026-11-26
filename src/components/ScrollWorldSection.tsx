"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL_WORLD_CHAPTERS } from "@/data/plotlyData";
import { ArrowDownRight, Compass, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CALLOUTS = [
  { label: "Zero Double Bookings", x: "16%", y: "24%" },
  { label: "Unique Consumer No.", x: "66%", y: "20%" },
  { label: "Bank-Confirmed Paid", x: "20%", y: "66%" },
  { label: "Phone Buyer Portal", x: "68%", y: "64%" },
];

export function ScrollWorldSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const panels = gsap.utils.toArray<HTMLElement>(".sw-scene-layer");
      const copyCards = gsap.utils.toArray<HTMLElement>(".sw-copy-panel");
      const calloutDots = gsap.utils.toArray<HTMLElement>(".sw-callout-dot");
      const total = panels.length;

      panels.forEach((panel, i) => {
        gsap.set(panel, {
          autoAlpha: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 0.9,
          clipPath:
            i === 0
              ? "inset(0% 0% 0% 0% round 20px)"
              : "inset(8% 8% 8% 8% round 28px)",
          transformOrigin: "center center",
        });
      });

      copyCards.forEach((card, i) => {
        gsap.set(card, {
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 28,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.95,
          pin: stageRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveIndex(idx);
          },
        },
      });

      // Architectural callout pins settle gently on entry
      if (calloutDots.length) {
        tl.fromTo(
          calloutDots,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.06, duration: 0.25, ease: "power2.out" },
          0.05
        );
      }

      panels.forEach((panel, i) => {
        const img = panel.querySelector("img");
        const startPos = i;

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.0, yPercent: 0 },
            { scale: 1.14, yPercent: -2.2, duration: 0.88, ease: "none" },
            startPos
          );
        }

        if (i < total - 1) {
          const nextPanel = panels[i + 1];
          const currentCopy = copyCards[i];
          const nextCopy = copyCards[i + 1];

          tl.to(
            panel,
            {
              autoAlpha: 0,
              scale: 1.07,
              duration: 0.32,
              ease: "power1.inOut",
            },
            startPos + 0.7
          )
            .to(
              nextPanel,
              {
                autoAlpha: 1,
                scale: 1,
                clipPath: "inset(0% 0% 0% 0% round 20px)",
                duration: 0.38,
                ease: "power2.out",
              },
              startPos + 0.66
            )
            .to(
              currentCopy,
              { autoAlpha: 0, y: -18, duration: 0.22, ease: "power1.in" },
              startPos + 0.68
            )
            .to(
              nextCopy,
              { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" },
              startPos + 0.78
            );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const jumpToChapter = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const absTop = rect.top + window.scrollY;
    const scrollable = container.offsetHeight - window.innerHeight;
    const targetY = absTop + (scrollable * idx) / Math.max(1, SCROLL_WORLD_CHAPTERS.length - 1);

    if (window.__plotlyLenis) {
      window.__plotlyLenis.scrollTo(targetY, { duration: 1.1 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  if (reducedMotion) {
    return (
      <section id="scroll-world" className="py-20 bg-[#F5F4EE] border-y border-[#DAD8CC]">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
              ← SCROLL WORLD ARCHITECTURE
            </p>
            <h2 className="font-display-h2 mt-3 text-[32px] sm:text-[44px] text-[#0B2E2A]">
              One continuous record from plot map to bank confirmation.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {SCROLL_WORLD_CHAPTERS.map((ch) => (
              <article
                key={ch.id}
                className="rounded-3xl border border-[#DAD8CC] bg-white overflow-hidden"
              >
                <img src={ch.image} alt={ch.title} className="w-full aspect-video object-cover" />
                <div className="p-6">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B7C63]">
                    {ch.step} · {ch.eyebrow}
                  </span>
                  <h3 className="font-display-h3 mt-2 text-[24px] text-[#0B2E2A]">{ch.title}</h3>
                  <p className="mt-2 text-[16px] text-[#4A5653] leading-relaxed">{ch.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activeChapter = SCROLL_WORLD_CHAPTERS[activeIndex] ?? SCROLL_WORLD_CHAPTERS[0];

  return (
    <section
      id="scroll-world"
      ref={containerRef}
      aria-label="Plotly Scroll-World Fly-Through"
      className="relative bg-[#F5F4EE] border-y border-[#DAD8CC]"
      style={{ height: `${SCROLL_WORLD_CHAPTERS.length * 100}vh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-5 px-4 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0 survey-grid opacity-80" />
        <div
          className="pointer-events-none absolute inset-0 transition-colors duration-700"
          style={{
            background:
              activeChapter.accent === "#F2A93B"
                ? "radial-gradient(circle at 68% 44%, rgba(242,169,59,0.14), transparent 58%)"
                : "radial-gradient(circle at 68% 44%, rgba(27,124,99,0.12), transparent 58%)",
          }}
        />

        {/* Top Stage Bar */}
        <div className="relative z-20 mx-auto w-full max-w-[1360px] flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#DAD8CC] bg-white/92 backdrop-blur-sm px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0B2E2A]">
            <Compass className="h-3.5 w-3.5 text-[#1B7C63]" />
            <span>Scroll-World Fly-Through</span>
            <span className="text-[#DAD8CC]">|</span>
            <span className="tabular-nums text-[#1B7C63]">
              Scene {activeChapter.step} / 0{SCROLL_WORLD_CHAPTERS.length}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#DAD8CC] bg-white/92 backdrop-blur-sm px-4 py-1.5 text-[12px] font-medium text-[#4A5653]">
            <Layers className="h-3.5 w-3.5 text-[#135047]" />
            <span className="tabular-nums">Flight {Math.round(progress * 100)}%</span>
          </div>
        </div>

        {/* Main Split Stage */}
        <div className="relative z-10 mx-auto w-full max-w-[1360px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-2">
          {/* Left Copy Column */}
          <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] flex items-center">
            {SCROLL_WORLD_CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                className="sw-copy-panel absolute inset-0 flex flex-col justify-center"
                aria-hidden={activeIndex !== idx}
              >
                <div className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#F2A93B]" />
                  <span>
                    {ch.step} · {ch.eyebrow}
                  </span>
                </div>

                <h2 className="font-display-h2 mt-3 text-[28px] sm:text-[38px] xl:text-[44px] text-[#0B2E2A]">
                  {ch.title}
                </h2>

                <p className="mt-3.5 text-[15px] sm:text-[17px] text-[#4A5653] leading-[1.6]">
                  {ch.body}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {ch.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#DAD8CC] bg-white px-3 py-1 text-[12px] font-medium text-[#0F1C1A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Scrubbed Diorama Frame + Precision-Drop Callout Markers */}
          <div className="lg:col-span-7 relative flex items-center gap-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-2 sm:p-3 shadow-[0_24px_70px_rgba(11,46,42,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#0B2E2A]">
                {SCROLL_WORLD_CHAPTERS.map((ch) => (
                  <div key={ch.id} className="sw-scene-layer absolute inset-0 will-change-transform">
                    <img
                      src={ch.image}
                      alt={ch.title}
                      className="h-full w-full object-cover will-change-transform"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2E2A]/70 via-transparent to-transparent" />
                  </div>
                ))}

                {/* Architectural Callout Pins (Precision-Drop style) */}
                {CALLOUTS.map((pin, idx) => {
                  const highlighted = idx === activeIndex;
                  return (
                    <div
                      key={pin.label}
                      className="sw-callout-dot hidden md:flex items-center gap-2 absolute pointer-events-none transition-all duration-300"
                      style={{ left: pin.x, top: pin.y }}
                    >
                      <span
                        className={`h-3.5 w-3.5 rounded-[4px] border transition-all duration-300 ${
                          highlighted
                            ? "bg-[#F2A93B] border-white scale-110 shadow-[0_0_0_4px_rgba(242,169,59,0.28)]"
                            : "bg-[#0B2E2A]/65 border-white/50 backdrop-blur-sm"
                        }`}
                      />
                      <span
                        className={`rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-[0.03em] backdrop-blur-md border transition-all duration-300 ${
                          highlighted
                            ? "bg-[#0B2E2A]/92 text-[#F5F4EE] border-[#F2A93B]/60"
                            : "bg-white/75 text-[#0F1C1A] border-[#DAD8CC]/80 opacity-75"
                        }`}
                      >
                        {pin.label}
                      </span>
                    </div>
                  );
                })}

                {/* Bottom Telemetry + Status Chip */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-3 pointer-events-none">
                  <div className="rounded-2xl border border-white/20 bg-[#0B2E2A]/88 backdrop-blur-md px-4 py-3 text-[#F5F4EE] shadow-lg">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#F5F4EE]/70">
                      {activeChapter.metricLabel}
                    </div>
                    <div className="mt-0.5 text-[18px] sm:text-[22px] font-semibold tabular-nums">
                      {activeChapter.metricValue}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#DAD8CC] bg-white/95 backdrop-blur-md px-4 py-2.5 shadow-lg flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                        activeChapter.statusChip.label === "Paid"
                          ? "bg-[#E3F3EE] text-[#135047]"
                          : activeChapter.statusChip.label === "Awaiting"
                          ? "bg-[#FDF1DC] text-[#8C5B0D]"
                          : "bg-[#0B2E2A] text-[#F2A93B]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          activeChapter.statusChip.label === "Paid"
                            ? "bg-[#1B7C63]"
                            : "bg-[#F2A93B]"
                        }`}
                      />
                      {activeChapter.statusChip.label}
                    </span>
                    <span className="text-[13px] font-medium text-[#0F1C1A] tabular-nums">
                      {activeChapter.statusChip.detail}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Diamond Progress Rail (Precision-Drop .story__mark) */}
            <div className="hidden xl:flex flex-col items-center justify-between h-64 py-2">
              <div className="relative h-full w-[2px] bg-[#DAD8CC] rounded-full">
                <div
                  className="absolute top-0 left-0 w-full bg-[#F2A93B] rounded-full transition-all duration-150"
                  style={{ height: `${Math.round(progress * 100)}%` }}
                />
                {SCROLL_WORLD_CHAPTERS.map((ch, idx) => {
                  const pct = (idx / Math.max(1, SCROLL_WORLD_CHAPTERS.length - 1)) * 100;
                  const reached = idx <= activeIndex;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => jumpToChapter(idx)}
                      aria-label={`Jump to ${ch.label}`}
                      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border transition-all cursor-pointer ${
                        reached
                          ? "bg-[#F2A93B] border-[#0B2E2A] scale-110"
                          : "bg-[#F5F4EE] border-[#DAD8CC]"
                      }`}
                      style={{ top: `${pct}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Route Rail */}
        <div className="relative z-20 mx-auto w-full max-w-[1360px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#DAD8CC] bg-white/92 backdrop-blur-md p-2.5 sm:px-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SCROLL_WORLD_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => jumpToChapter(idx)}
                    className={`shrink-0 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0B2E2A] text-[#F5F4EE]"
                        : "text-[#4A5653] hover:bg-[#F5F4EE] hover:text-[#0B2E2A]"
                    }`}
                  >
                    <span
                      className={`tabular-nums text-[11px] font-semibold ${
                        isActive ? "text-[#F2A93B]" : "text-[#1B7C63]"
                      }`}
                    >
                      {ch.step}
                    </span>
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3 text-[12px] font-medium text-[#5B6663]">
              <div className="w-28 h-1.5 rounded-full bg-[#ECEAE2] overflow-hidden">
                <div
                  className="h-full bg-[#1B7C63] transition-all duration-150"
                  style={{ width: `${Math.max(8, Math.round(progress * 100))}%` }}
                />
              </div>
              <span className="inline-flex items-center gap-1">
                Keep scrolling <ArrowDownRight className="h-3.5 w-3.5 text-[#1B7C63]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
