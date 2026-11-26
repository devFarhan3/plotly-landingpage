"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PlotlyLogo } from "./PlotlyLogo";

interface NavbarProps {
  onOpenPortal: () => void;
  onBookDemo: () => void;
}

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Scroll World", href: "#scroll-world" },
  { label: "Ledger", href: "#ledger" },
  { label: "How It Works", href: "#workflow" },
  { label: "Reports", href: "#modules" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ onOpenPortal, onBookDemo }: NavbarProps) {
  const [compact, setCompact] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on click outside or Escape
  useEffect(() => {
    if (!drawerOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDrawerOpen(false);
    if (href === "#top") {
      if (window.__plotlyLenis) {
        window.__plotlyLenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__plotlyLenis) {
      window.__plotlyLenis.scrollTo(el as HTMLElement, { offset: -84 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div
        ref={navContainerRef}
        className={`mx-auto transition-all duration-500 ease-[cubic-bezier(0.24,0,0.14,1)] px-4 sm:px-6 lg:px-8 ${
          compact ? "pt-3 max-w-[700px]" : "pt-4 max-w-[1360px]"
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.24,0,0.14,1)] border ${
            compact
              ? "rounded-full bg-[#F5F4EE]/82 backdrop-blur-xl border-[#DAD8CC] shadow-[0_14px_40px_rgba(11,46,42,0.16)] px-3.5 py-2 h-[56px]"
              : "rounded-full bg-[#FFFFFF]/95 backdrop-blur-md border-[#DAD8CC] shadow-[0_4px_20px_rgba(11,46,42,0.06)] px-4 sm:px-6 h-16"
          }`}
        >
          {/* Left: Parcel Logo Option A */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            aria-label="Plotly Home"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7C63] rounded-md shrink-0"
          >
            <PlotlyLogo variant="light" size="sm" />
          </a>

          {/* Center: Full Nav when Top; Compact Menu Label when Scrolled */}
          {!compact ? (
            <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 text-[14px] font-medium text-[#0F1C1A]/80 hover:text-[#0B2E2A] hover:bg-[#0B2E2A]/5 rounded-full transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          ) : (
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#DAD8CC] bg-white/80 hover:bg-white px-4 py-1.5 text-[13px] font-medium text-[#0B2E2A] cursor-pointer transition-colors"
            >
              {drawerOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
              <span>{drawerOpen ? "Close" : "Menu"}</span>
            </button>
          )}

          {/* Right: Peg Amber CTA routing to System Portal + Burger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenPortal}
              className="group inline-flex items-center gap-2 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] pl-4 pr-1.5 py-1.5 text-[13px] sm:text-[14px] font-semibold transition-all duration-200 shadow-[0_2px_10px_rgba(242,169,59,0.28)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B7C63]"
            >
              <span className="relative overflow-hidden h-5 leading-5">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.24,0,0.14,1)] group-hover:-translate-y-full">
                  System Portal
                </span>
                <span
                  aria-hidden="true"
                  className="block transition-transform duration-500 ease-[cubic-bezier(0.24,0,0.14,1)] group-hover:-translate-y-full"
                >
                  System Portal
                </span>
              </span>
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0B2E2A] text-[#F5F4EE] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              className={`${
                compact ? "sm:hidden" : "lg:hidden"
              } flex h-9 w-9 items-center justify-center rounded-full border border-[#DAD8CC] bg-white text-[#0B2E2A] cursor-pointer`}
            >
              {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Precision-Drop Inspired Dark Cypress Drawer */}
        {drawerOpen && (
          <div className="pointer-events-auto mt-2.5 rounded-3xl border border-[#135047] bg-[#0B2E2A] p-5 text-[#F5F4EE] shadow-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F2A93B] mb-2">
              NAVIGATION
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" aria-label="Menu Drawer">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2.5 text-[15px] font-medium text-[#F5F4EE]/90 hover:bg-[#135047] hover:text-white rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenPortal();
                }}
                className="w-full flex items-center justify-between rounded-2xl bg-[#F2A93B] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0B2E2A] hover:bg-[#e59b2d] transition-colors cursor-pointer"
              >
                <span>↳ Open System Portal</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onBookDemo();
                }}
                className="w-full flex items-center justify-between rounded-2xl border border-white/20 bg-[#135047]/60 px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#F5F4EE] hover:bg-[#135047] transition-colors cursor-pointer"
              >
                <span>Book a walkthrough</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
