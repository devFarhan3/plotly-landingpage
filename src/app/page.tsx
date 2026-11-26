"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  FileCheck2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { PlotlyLogo } from "@/components/PlotlyLogo";
import { ScrollWorldSection } from "@/components/ScrollWorldSection";
import { InteractiveLedgerPreview } from "@/components/InteractiveLedgerPreview";
import { ModulesInteractiveIndex } from "@/components/ModulesInteractiveIndex";
import { DemoModal, type ModalMode } from "@/components/DemoModal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { FAQS, PRICING_PLANS, TESTIMONIALS, WORKFLOW_STEPS } from "@/data/plotlyData";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_STATEMENT =
  "One central record of every plot, customer, and installment so a balance is never a guess.";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("portal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  const openPortal = () => {
    setModalMode("portal");
    setModalOpen(true);
  };

  const openDemo = () => {
    setModalMode("demo");
    setModalOpen(true);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero entrance choreography
      gsap.from(".hero-stagger", {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.82,
        ease: "power3.out",
      });

      // Continuous subtle float on Estate/Leon-inspired hero KPI cards
      gsap.to(".hero-float", {
        y: -7,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      // Rotating circular showreel/scroll badge (Precision-Drop motif)
      gsap.to(".hero-ring-spin", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // Hero background wordmark subtle scroll parallax
      gsap.to(".hero-bg-wordmark", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Precision-Drop word-by-word scrub blur->sharp reveal on About statement
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.14, y: 12, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#overview",
              start: "top 78%",
              end: "center 52%",
              scrub: 0.6,
            },
          }
        );
      }

      // Tilted Workflow cards untilt cleanly on scroll (Precision-Drop .pcard)
      gsap.utils.toArray<HTMLElement>(".wf-card").forEach((card, i) => {
        const startTilt = i % 2 === 0 ? -2.4 : 2.4;
        gsap.fromTo(
          card,
          { y: 36, opacity: 0, rotation: startTilt },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      // Footer parallax depth (Precision-Drop footer reveal)
      gsap.fromTo(
        ".footer-watermark",
        { y: 70, scale: 0.92, opacity: 0.08 },
        {
          y: 0,
          scale: 1,
          opacity: 0.14,
          ease: "none",
          scrollTrigger: {
            trigger: "#contact",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.8,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y, active: true });
  };

  return (
    <div ref={pageRef} id="top" className="min-h-screen bg-[#F5F4EE] text-[#0F1C1A]">
      <JsonLd />
      <Preloader />
      <Navbar onOpenPortal={openPortal} onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO — Deep Cypress Architectural Frame + Giant Watermark + Interactive Diorama
           ============================================================ */}
        <section className="pt-24 sm:pt-28 pb-12 px-3 sm:px-6 lg:px-8 bg-[#F5F4EE]">
          <div className="mx-auto max-w-[1360px] relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-[#0B2E2A] text-[#F5F4EE] border border-[#135047] shadow-[0_30px_90px_rgba(11,46,42,0.22)]">
            <div className="pointer-events-none absolute inset-0 survey-grid-dark" />

            {/* Giant Background Display Wordmark (Soltera / Leon Home / Precision-Drop) */}
            <div
              aria-hidden="true"
              className="hero-bg-wordmark pointer-events-none select-none absolute top-4 left-0 right-0 flex justify-center overflow-hidden"
            >
              <span className="font-[family-name:var(--font-bricolage)] font-semibold tracking-[-0.05em] text-[22vw] lg:text-[230px] leading-none text-[#F5F4EE]/[0.055]">
                PLOTLY
              </span>
            </div>

            <div className="relative z-10 px-5 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-8 sm:pb-12">
              {/* Top Row: Eyebrow + Credibility Line */}
              <div className="hero-stagger flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#135047]/60 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#F5F4EE]">
                  <span className="h-2 w-2 rounded-full bg-[#F2A93B]" />
                  <span>Housing Society Software · Pakistan</span>
                </div>
                <span className="text-[13px] font-medium text-[#F5F4EE]/80 tabular-nums">
                  Designed with input from operational officers managing 500+ plots
                </span>
              </div>

              {/* Split Giant Headline (Brand Identity Page 3 & 4) */}
              <div className="hero-stagger mt-7 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-8">
                  <h1 className="font-display-h1 text-[42px] sm:text-[62px] lg:text-[74px] text-[#F5F4EE]">
                    Know what is paid.
                    <br />
                    <span className="text-[#F2A93B]">Chase what is not.</span>
                  </h1>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[16px] sm:text-[18px] text-[#F5F4EE]/80 leading-[1.6]">
                    One record of every plot, customer, and installment, so a balance is never a guess. Replace scattered Excel sheets with bank-confirmed vouchers.
                  </p>
                </div>
              </div>

              {/* Action Bar + Rotating Scroll Badge + KPIs */}
              <div className="hero-stagger mt-7 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={openDemo}
                      className="group inline-flex items-center gap-3 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] pl-6 pr-2.5 py-2 text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer shadow-[0_8px_28px_rgba(242,169,59,0.3)]"
                    >
                      <span>Book a 10-min walkthrough</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B2E2A] text-[#F5F4EE] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={openPortal}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white/55 bg-white/5 hover:bg-white/10 px-5 py-3 text-[14px] font-medium text-[#F5F4EE] transition-colors cursor-pointer"
                    >
                      <span>Open System Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[13px] text-[#F5F4EE]/75 tabular-nums">
                    Plans start from <strong className="text-[#F2A93B] font-semibold">PKR 8,000/month</strong> for up to 150 plots · 30-second inquiry
                  </p>
                </div>

                {/* Precision-Drop Circular Rotating Ring + Compact KPIs */}
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="relative h-14 w-14 flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 100"
                        className="hero-ring-spin h-14 w-14 text-[#F5F4EE]/65"
                        aria-hidden="true"
                      >
                        <defs>
                          <path
                            id="circlePath"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          />
                        </defs>
                        <text fontSize="11.2" fontWeight="600" letterSpacing="2.4" fill="currentColor">
                          <textPath href="#circlePath">SCROLL WORLD · FLY THROUGH · </textPath>
                        </text>
                      </svg>
                      <span className="absolute h-2.5 w-2.5 rounded-full bg-[#F2A93B]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 tabular-nums border-l border-white/15 pl-6">
                    <div>
                      <div className="text-[24px] sm:text-[28px] font-semibold text-[#F5F4EE]">0</div>
                      <div className="text-[11px] uppercase tracking-[0.06em] text-[#F5F4EE]/65">
                        Double bookings
                      </div>
                    </div>
                    <div>
                      <div className="text-[24px] sm:text-[28px] font-semibold text-[#F2A93B]">14</div>
                      <div className="text-[11px] uppercase tracking-[0.06em] text-[#F5F4EE]/65">
                        Audit PDFs
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[24px] sm:text-[28px] font-semibold text-[#1B7C63]">100%</div>
                      <div className="text-[11px] uppercase tracking-[0.06em] text-[#F5F4EE]/65">
                        Bank-locked Paid
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Framed Architectural Diorama Stage with Cursor Survey Spotlight (Precision-Drop mask + Estate cards) */}
              <div
                ref={heroVisualRef}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
                className="hero-stagger relative mt-8 sm:mt-10 rounded-[24px] overflow-hidden border border-white/15 bg-[#0F1C1A] aspect-[16/9] sm:aspect-[21/9]"
              >
                <img
                  src="/images/scene-hero.jpg"
                  alt="Isometric housing society diorama showing blocks, roads, and amber booked corner plot"
                  className="h-full w-full object-cover"
                />

                {/* Cursor Survey Spotlight Overlay (Precision-Drop cursor mask effect) */}
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: spot.active ? 1 : 0,
                    background: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, rgba(242, 169, 59, 0.24), rgba(27, 124, 99, 0.12) 45%, transparent 72%)`,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2E2A]/80 via-transparent to-[#0B2E2A]/20" />

                {/* Floating Estate-Style Corner Card (Bottom Left) */}
                <div className="hero-float hidden sm:flex absolute bottom-5 left-5 rounded-2xl border border-[#DAD8CC] bg-[#FFFFFF]/95 backdrop-blur-md p-4 text-[#0F1C1A] shadow-xl max-w-[300px] flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1B7C63]">
                      Homes scheme · Block C
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EE] px-2.5 py-0.5 text-[11px] font-semibold text-[#135047]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B7C63]" /> Paid
                    </span>
                  </div>
                  <div className="text-[17px] font-semibold text-[#0B2E2A] tabular-nums">
                    Plot 14 · PKR 4,850,000 received
                  </div>
                  <div className="text-[12px] text-[#4A5653] tabular-nums">
                    Bank confirmed · Consumer no. 9042-408912
                  </div>
                </div>

                {/* Floating Awaiting Corner Card (Bottom Right) */}
                <div className="hero-float absolute bottom-3 right-3 sm:bottom-5 sm:right-5 rounded-2xl border border-white/20 bg-[#0B2E2A]/90 backdrop-blur-md px-4 py-3 text-[#F5F4EE] shadow-xl">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#F2A93B]">
                    <span className="h-2 w-2 rounded-full bg-[#F2A93B]" />
                    <span>Voucher Issued · Awaiting</span>
                  </div>
                  <div className="mt-1 text-[16px] sm:text-[18px] font-semibold tabular-nums">
                    PKR 1,240,500 awaiting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            OVERVIEW / ABOUT STATEMENT — Precision-Drop Word Scrub + Soltera Proof Cards
           ============================================================ */}
        <section id="overview" className="py-20 sm:py-28 bg-[#F5F4EE]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                  ← WHY PLOTLY EXISTS
                </p>
                <p className="mt-3 text-[15px] text-[#4A5653] max-w-xs leading-relaxed">
                  Built for society owners and operational officers drowning in registers and Excel files.
                </p>
              </div>

              <div className="lg:col-span-8">
                <h2 className="font-display-h2 text-[30px] sm:text-[42px] lg:text-[48px] text-[#0B2E2A] leading-[1.12]">
                  {ABOUT_STATEMENT.split(" ").map((word, idx) => (
                    <span key={idx} className="about-word inline-block mr-[0.26em]">
                      {word}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Soltera-Inspired Dual Wide Proof Cards */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3F3EE] px-3 py-1 text-[12px] font-semibold text-[#135047]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1B7C63]" /> Paid · Bank Confirmed
                    </span>
                    <div className="font-display-h2 mt-4 text-[34px] sm:text-[42px] text-[#0B2E2A] tabular-nums">
                      PKR 4,850,000
                    </div>
                    <p className="mt-2 text-[16px] text-[#4A5653] leading-relaxed">
                      Money counts as paid only after the bank confirms the voucher consumer number. Collection figures are never overstated.
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#DAD8CC] pt-4 flex items-center justify-between text-[13px] font-medium text-[#5B6663]">
                  <span>Rule: Bank confirmation date = Collection date</span>
                  <span className="text-[#1B7C63] font-semibold">Exact</span>
                </div>
              </article>

              <article className="rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDF1DC] px-3 py-1 text-[12px] font-semibold text-[#8C5B0D]">
                      <span className="h-2 w-2 rounded-full bg-[#F2A93B]" /> Awaiting · Voucher Issued
                    </span>
                    <div className="font-display-h2 mt-4 text-[34px] sm:text-[42px] text-[#0B2E2A] tabular-nums">
                      PKR 1,240,500
                    </div>
                    <p className="mt-2 text-[16px] text-[#4A5653] leading-relaxed">
                      Every unconfirmed installment or extra charge slip stays clearly visible in Awaiting so follow-up happens on time.
                    </p>
                  </div>
                </div>
                <div className="border-t border-[#DAD8CC] pt-4 flex items-center justify-between text-[13px] font-medium text-[#5B6663]">
                  <span>Rule: Consumer number generated automatically</span>
                  <span className="text-[#0B2E2A] font-semibold">Calm</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================
            SCROLL-WORLD FLY-THROUGH — Pinned Lenis + GSAP Camera Dive
           ============================================================ */}
        <ScrollWorldSection />

        {/* ============================================================
            DARK CYPRESS CONTRAST BAND — Live Ledger, Key-P Voucher & Roles (Leon Home dark band)
           ============================================================ */}
        <section id="ledger" className="py-24 sm:py-32 bg-[#0B2E2A] text-[#F5F4EE]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
              <div className="lg:col-span-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#F2A93B]">
                  ← BUILT FOR EVERY DESK IN THE OFFICE
                </p>
                <h2 className="font-display-h2 mt-3 text-[34px] sm:text-[46px] text-[#F5F4EE]">
                  The product’s own rule becomes the screen’s rule.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:text-right">
                <p className="text-[17px] text-[#F5F4EE]/75 max-w-xl lg:ml-auto leading-[1.6]">
                  Inspect how Plotly separates Paid from Awaiting, stamps every official voucher with a unique consumer number, and releases plots cleanly on refund.
                </p>
              </div>
            </div>

            <InteractiveLedgerPreview />

            {/* 4 Role Cards inside Dark Band */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Building2,
                  role: "Society Admin",
                  detail: "Configure Homes & City schemes, blocks, plots, user roles, and full audit reports.",
                },
                {
                  icon: Users,
                  role: "Operational Officer",
                  detail: "Scoped permissions per screen and action: add installments, print slips, zero unauthorized edits.",
                },
                {
                  icon: FileCheck2,
                  role: "Partner Bank",
                  detail: "Connects via secure lookup to verify consumer numbers and confirm payments automatically.",
                },
                {
                  icon: ShieldCheck,
                  role: "Plot Buyer Portal",
                  detail: "Customers sign in with their registered phone number to inspect plots and download PDFs.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.role}
                    className="rounded-2xl border border-white/15 bg-[#135047]/40 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B2E2A] border border-white/15 text-[#F2A93B]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-[#F5F4EE]">{item.role}</h3>
                    <p className="mt-1.5 text-[14px] text-[#F5F4EE]/75 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW IT WORKS (STEP BY STEP) — Soltera 01–04 + Precision-Drop Tilted Cards
           ============================================================ */}
        <section id="workflow" className="py-24 sm:py-32 bg-[#F5F4EE]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
              <div className="lg:col-span-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                  ← HOW IT WORKS (STEP BY STEP)
                </p>
                <h2 className="font-display-h2 mt-3 text-[34px] sm:text-[46px] text-[#0B2E2A]">
                  From raw plot file to settled bank rupee.
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-[17px] text-[#4A5653] max-w-2xl leading-[1.6]">
                  No fixed rigid payment templates needed. Add each monthly installment or extra charge as agreed with the buyer, print its consumer voucher, and let the bank confirm.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKFLOW_STEPS.map((st) => (
                <article
                  key={st.step}
                  className="wf-card rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-7 sm:p-9 shadow-[0_14px_40px_rgba(11,46,42,0.05)] flex flex-col justify-between gap-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-bricolage)] text-[42px] font-semibold tracking-[-0.03em] text-[#0B2E2A] tabular-nums">
                      {st.step}
                    </span>
                    <span className="rounded-full border border-[#DAD8CC] bg-[#F5F4EE] px-3 py-1 text-[12px] font-semibold text-[#135047]">
                      {st.meta}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display-h3 text-[24px] text-[#0B2E2A]">{st.title}</h3>
                    <p className="mt-2.5 text-[16px] text-[#4A5653] leading-[1.6]">
                      {st.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            MODULES & 14 REPORTS — Precision-Drop Hairline Rows + Hover Preview
           ============================================================ */}
        <ModulesInteractiveIndex onBookDemo={openDemo} />

        {/* ============================================================
            SOCIAL PROOF — Built with Operational Officers & Society Feedback
           ============================================================ */}
        <section className="py-20 sm:py-24 bg-[#F5F4EE] border-t border-[#DAD8CC]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                  ← TRUSTED ON THE GROUND
                </p>
                <h2 className="font-display-h2 mt-3 text-[32px] sm:text-[42px] text-[#0B2E2A]">
                  Designed with operational officers managing 500+ plots.
                </h2>
              </div>
              <p className="text-[15px] text-[#4A5653] max-w-md">
                Built around real society office workflows—consumer numbers, bank slip reconciliation, dealer CNIC tracking, and buyer phone logins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((item) => (
                <article
                  key={item.author}
                  className="rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-7 sm:p-8 flex flex-col justify-between gap-6"
                >
                  <div>
                    <span className="inline-flex items-center rounded-full bg-[#E3F3EE] px-3 py-1 text-[12px] font-semibold text-[#135047]">
                      {item.metric}
                    </span>
                    <blockquote className="mt-5 text-[18px] sm:text-[20px] text-[#0B2E2A] leading-[1.55] font-medium">
                      “{item.quote}”
                    </blockquote>
                  </div>
                  <div className="border-t border-[#DAD8CC] pt-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-[15px] font-semibold text-[#0B2E2A]">{item.author}</div>
                      <div className="text-[13px] text-[#4A5653]">
                        {item.role} · {item.society}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            PRICING — Clear Starting Plan + Request Pricing
           ============================================================ */}
        <section id="pricing" className="py-20 sm:py-24 bg-[#0B2E2A] text-[#F5F4EE]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#F2A93B]">
                  ← TRANSPARENT PRICING
                </p>
                <h2 className="font-display-h2 mt-3 text-[34px] sm:text-[44px] text-[#F5F4EE]">
                  Plans start from PKR 8,000/month for up to 150 plots.
                </h2>
              </div>
              <p className="text-[16px] text-[#F5F4EE]/75 max-w-md">
                Every plan includes isolated society data, consumer vouchers, and the buyer Customer Portal. No hidden per-user fees.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PRICING_PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-[28px] border p-7 flex flex-col justify-between gap-6 ${
                    plan.featured
                      ? "bg-[#135047] border-[#F2A93B]/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                      : "bg-[#135047]/40 border-white/15"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[20px] font-semibold text-[#F5F4EE]">{plan.name}</h3>
                      <span className="rounded-full bg-[#0B2E2A] border border-white/15 px-3 py-1 text-[12px] font-medium text-[#F2A93B]">
                        {plan.capacity}
                      </span>
                    </div>

                    <div className="mt-5 flex items-baseline gap-1.5 tabular-nums">
                      <span className="font-[family-name:var(--font-bricolage)] text-[36px] font-semibold text-[#F5F4EE]">
                        {plan.price}
                      </span>
                      <span className="text-[14px] text-[#F5F4EE]/70">{plan.period}</span>
                    </div>

                    <p className="mt-2 text-[14px] text-[#F5F4EE]/75 leading-relaxed">
                      {plan.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5 border-t border-white/15 pt-5 text-[14px] text-[#F5F4EE]/90">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#F2A93B] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={openDemo}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-full h-12 px-5 text-[14px] font-semibold transition-colors cursor-pointer ${
                      plan.featured
                        ? "bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A]"
                        : "bg-white/10 hover:bg-white/20 text-[#F5F4EE] border border-white/20"
                    }`}
                  >
                    <span>{plan.price === "Custom" ? "Request pricing" : "Book a 10-min walkthrough"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            AEO & GEO FAQ SECTION — Direct Calm Answers
           ============================================================ */}
        <section id="faq" className="py-24 sm:py-28 bg-[#FFFFFF] border-t border-[#DAD8CC]">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
                  ← FREQUENT QUESTIONS
                </p>
                <h2 className="font-display-h2 mt-3 text-[34px] sm:text-[44px] text-[#0B2E2A]">
                  Clear answers for society owners.
                </h2>
                <p className="mt-4 text-[16px] text-[#4A5653] leading-[1.6]">
                  Every rule in Plotly follows ground reality in Pakistani housing schemes—installment recovery, bank slips, cancellations, dealer CNIC records, and separate society isolation.
                </p>
                <button
                  type="button"
                  onClick={openDemo}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] px-5 py-3 text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  <span>Ask our team</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="lg:col-span-7 divide-y divide-[#DAD8CC] border-y border-[#DAD8CC]">
                {FAQS.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={item.question} className="py-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <span className="text-[18px] font-semibold text-[#0B2E2A]">
                          {item.question}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DAD8CC] transition-transform duration-300 ${
                            isOpen ? "rotate-180 bg-[#0B2E2A] text-white" : "bg-[#F5F4EE] text-[#0B2E2A]"
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                      {isOpen && (
                        <p className="mt-3 pr-10 text-[16px] text-[#4A5653] leading-[1.65]">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          FOOTER — Deep Cypress Layered Watermark + Peg Amber CTA
         ============================================================ */}
      <footer id="contact" className="relative overflow-hidden bg-[#0B2E2A] text-[#F5F4EE] pt-20 pb-12">
        <div
          aria-hidden="true"
          className="footer-watermark pointer-events-none select-none absolute -bottom-10 left-0 right-0 flex justify-center overflow-hidden"
        >
          <span className="font-[family-name:var(--font-bricolage)] font-semibold tracking-[-0.05em] text-[24vw] lg:text-[260px] leading-none text-[#F5F4EE]">
            Plotly.
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end border-b border-white/15 pb-14">
            <div className="lg:col-span-7">
              <PlotlyLogo variant="dark" showTagline size="lg" />
              <h2 className="font-display-h2 mt-8 text-[36px] sm:text-[52px] text-[#F5F4EE]">
                Every plot. Every rupee. Accounted for.
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-5">
              <p className="text-[16px] text-[#F5F4EE]/75 lg:text-right max-w-sm">
                See a live demo for your society in 10 minutes. Plans start from PKR 8,000/month.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openDemo}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] pl-6 pr-2.5 py-2 text-[15px] font-semibold transition-all cursor-pointer shadow-[0_8px_28px_rgba(242,169,59,0.28)]"
                >
                  <span>Book a 10-min walkthrough</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B2E2A] text-[#F5F4EE] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={openPortal}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 hover:border-white/55 px-5 py-3 text-[14px] font-medium text-[#F5F4EE] transition-colors cursor-pointer"
                >
                  <span>Open System Portal</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[13px] text-[#F5F4EE]/65">
            <div className="flex flex-wrap items-center gap-6">
              <a href="#overview" className="hover:text-[#F5F4EE] transition-colors">
                Overview
              </a>
              <a href="#scroll-world" className="hover:text-[#F5F4EE] transition-colors">
                Scroll World
              </a>
              <a href="#ledger" className="hover:text-[#F5F4EE] transition-colors">
                Ledger Preview
              </a>
              <a href="#modules" className="hover:text-[#F5F4EE] transition-colors">
                Modules & PDFs
              </a>
              <a href="#faq" className="hover:text-[#F5F4EE] transition-colors">
                FAQ
              </a>
            </div>
            <div>© {new Date().getFullYear()} Plotly · Plot & Housing Society Software for Pakistan</div>
          </div>
        </div>
      </footer>

      <DemoModal open={modalOpen} initialMode={modalMode} onClose={() => setModalOpen(false)} />
      <WhatsAppFloat />
    </div>
  );
}
