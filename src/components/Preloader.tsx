"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      // Logo 3 parcel pieces converge smoothly
      tl.from(".pl-piece-1", { x: -24, y: -16, opacity: 0, duration: 0.42, ease: "power3.out" }, 0)
        .from(".pl-piece-2", { x: 22, y: -14, opacity: 0, duration: 0.42, ease: "power3.out" }, 0.05)
        .from(".pl-piece-3", { x: 18, y: 18, opacity: 0, duration: 0.42, ease: "power3.out" }, 0.1)
        .from(".pl-wordmark", { y: 14, opacity: 0, duration: 0.35, ease: "power3.out" }, 0.14)
        .from(".pl-sub", { y: 10, opacity: 0, duration: 0.3, ease: "power2.out" }, 0.22)
        // Fade brand cluster slightly before lifting the 6 vertical Cypress curtain columns
        .to(".pl-center", { opacity: 0, y: -12, duration: 0.28, ease: "power2.in" }, 0.65)
        .to(
          ".pl-col",
          {
            yPercent: -105,
            duration: 0.62,
            stagger: { each: 0.055, from: "start" },
            ease: "power4.inOut",
          },
          0.72
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] pointer-events-none flex overflow-hidden"
    >
      {/* 6 vertical Cypress columns matching Precision-Drop curtain */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="pl-col flex-1 h-full bg-[#0B2E2A] border-r border-[#F5F4EE]/12 last:border-r-0"
        />
      ))}

      {/* Centered Logo Option A Converging Reveal */}
      <div className="pl-center absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="flex items-center gap-3.5">
          <svg
            width="44"
            height="44"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="pl-piece-1" d="M2 3H18.5L13.5 33H2V3Z" fill="#F5F4EE" />
            <path className="pl-piece-2" d="M22.2 3H34V17.5H19.7L22.2 3Z" fill="#1B7C63" />
            <path className="pl-piece-3" d="M19.1 21H34V33H17L19.1 21Z" fill="#F2A93B" />
          </svg>
          <span className="pl-wordmark font-[family-name:var(--font-bricolage)] text-[36px] font-semibold tracking-[-0.035em] text-[#F5F4EE]">
            Plotly
          </span>
        </div>
        <p className="pl-sub mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F4EE]/70">
          EVERY PLOT · EVERY RUPEE · ACCOUNTED FOR
        </p>
      </div>
    </div>
  );
}
