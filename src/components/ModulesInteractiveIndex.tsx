"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, FileText } from "lucide-react";
import { CORE_MODULES, REPORT_CATALOG } from "@/data/plotlyData";

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_IMAGES = [
  "/images/scene-hero.jpg",
  "/images/scene-booking.jpg",
  "/images/scene-bank.jpg",
  "/images/scene-portal.jpg",
];

export function ModulesInteractiveIndex({ onBookDemo }: { onBookDemo: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const floatCardRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const lastX = useRef(0);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const rotTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hairline draw-in left-to-right on scroll (Precision-Drop .prow border)
      gsap.utils.toArray<HTMLElement>(".mod-row-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      if (floatCardRef.current) {
        xTo.current = gsap.quickTo(floatCardRef.current, "x", { duration: 0.55, ease: "power3" });
        yTo.current = gsap.quickTo(floatCardRef.current, "y", { duration: 0.55, ease: "power3" });
        rotTo.current = gsap.quickTo(floatCardRef.current, "rotation", {
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current || !xTo.current || !yTo.current || !rotTo.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const vx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const tilt = Math.max(-10, Math.min(10, vx * 0.45)) + 2.4;

    xTo.current(x + 28);
    yTo.current(y - 110);
    rotTo.current(tilt);
  };

  return (
    <section
      id="modules"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(null)}
      className="relative py-24 sm:py-32 bg-[#F5F4EE] border-t border-[#DAD8CC] overflow-hidden"
    >
      {/* Floating Cursor-Tracking Preview Card (Desktop) */}
      <div
        ref={floatCardRef}
        aria-hidden="true"
        className={`pointer-events-none hidden lg:block absolute top-0 left-0 z-30 w-[260px] transition-opacity duration-300 ${
          hoveredIdx !== null ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="rounded-2xl border-2 border-white bg-[#0B2E2A] p-2.5 shadow-[0_32px_64px_-16px_rgba(11,46,42,0.45)]">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#135047]">
            <img
              src={PREVIEW_IMAGES[(hoveredIdx ?? 0) % PREVIEW_IMAGES.length]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          {hoveredIdx !== null && CORE_MODULES[hoveredIdx] && (
            <div className="mt-2.5 px-1.5 pb-1 text-[#F5F4EE]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F2A93B]">
                {CORE_MODULES[hoveredIdx].category}
              </div>
              <div className="mt-0.5 text-[13px] font-medium leading-snug">
                {CORE_MODULES[hoveredIdx].rule}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Header (Precision-Drop Projects style + Soltera eyebrow) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14">
          <div className="lg:col-span-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
              ← COMPLETE SOCIETY PLATFORM
            </p>
            <h2 className="font-display-h2 mt-3 text-[34px] sm:text-[46px] text-[#0B2E2A]">
              Eight modules. Zero loose sheets.
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="max-w-xl text-[17px] text-[#4A5653] leading-[1.6]">
              Commission, employee payroll, petty cash with receipt photos, loans, and land purchases sit alongside plot collections in one cash flow ledger.
            </p>
            <button
              type="button"
              onClick={onBookDemo}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0B2E2A] hover:bg-[#135047] text-[#F5F4EE] px-5 py-3 text-[14px] font-semibold transition-colors cursor-pointer"
            >
              <span>See all modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Interactive Horizontal Index Rows */}
        <div className="relative">
          {CORE_MODULES.map((mod, idx) => {
            const active = hoveredIdx === idx;
            return (
              <div
                key={mod.code}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group relative py-6 sm:py-7 transition-colors"
              >
                <div className="mod-row-line absolute top-0 left-0 right-0 h-px bg-[#DAD8CC]" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-5 flex items-center gap-4">
                    <span className="tabular-nums text-[13px] font-semibold text-[#1B7C63]">
                      {mod.code}
                    </span>
                    <h3
                      className={`font-display-h3 text-[24px] sm:text-[30px] transition-all duration-300 ${
                        active
                          ? "text-[#0B2E2A] translate-x-2"
                          : "text-[#0B2E2A]/80"
                      }`}
                    >
                      {mod.name}
                    </h3>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-[15px] text-[#4A5653] leading-relaxed">{mod.summary}</p>
                  </div>

                  <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                        active
                          ? "border-[#0B2E2A] bg-[#0B2E2A] text-[#F2A93B]"
                          : "border-[#DAD8CC] bg-white text-[#4A5653]"
                      }`}
                    >
                      {mod.category}
                    </span>
                    <ArrowRight
                      className={`h-5 w-5 text-[#0B2E2A] transition-transform duration-300 ${
                        active ? "-rotate-45 text-[#1B7C63]" : "opacity-45"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="mod-row-line h-px bg-[#DAD8CC]" />
        </div>

        {/* 14 Audit-Ready PDF Reports Bento Strip */}
        <div className="mt-20 rounded-[28px] border border-[#DAD8CC] bg-white p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DAD8CC] pb-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                14 MANAGEMENT & AUDIT REPORTS
              </p>
              <h3 className="font-display-h2 mt-2 text-[28px] sm:text-[34px] text-[#0B2E2A]">
                Print exact PDFs in one click.
              </h3>
            </div>
            <p className="text-[15px] text-[#4A5653] max-w-md">
              Customer statements, inventory by plot size, bank transactions, refunds, and business-wide cash flow.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REPORT_CATALOG.map((rep) => (
              <div
                key={rep.name}
                className="rounded-2xl border border-[#DAD8CC] bg-[#F5F4EE]/60 p-4 hover:bg-[#F5F4EE] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <FileText className="h-4 w-4 text-[#1B7C63]" />
                    <span className="rounded-full bg-[#E3F3EE] px-2 py-0.5 text-[11px] font-semibold text-[#135047]">
                      {rep.output}
                    </span>
                  </div>
                  <h4 className="mt-3 text-[15px] font-semibold text-[#0B2E2A] leading-snug">
                    {rep.name}
                  </h4>
                  <p className="mt-1.5 text-[13px] text-[#4A5653] leading-relaxed">
                    {rep.scope}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
