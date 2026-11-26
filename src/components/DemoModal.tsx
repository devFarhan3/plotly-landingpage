"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ArrowUpRight, Building2, Smartphone } from "lucide-react";
import { PlotlyLogo } from "./PlotlyLogo";

export type ModalMode = "portal" | "demo";

interface DemoModalProps {
  open: boolean;
  initialMode?: ModalMode;
  onClose: () => void;
}

const PORTAL_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.plotly.pk";

export function DemoModal({ open, initialMode = "portal", onClose }: DemoModalProps) {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [submitted, setSubmitted] = useState(false);
  const [societyCode, setSocietyCode] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [phone, setPhone] = useState("");
  const [plots, setPlots] = useState("250 – 1,000 plots");

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setSubmitted(false);
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setSocietyName("");
    setPhone("");
    setSocietyCode("");
    onClose();
  };

  const cleanSlug = societyCode
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  const adminUrl = cleanSlug ? `${PORTAL_BASE_URL}/${cleanSlug}/login` : `${PORTAL_BASE_URL}/login`;
  const customerUrl = cleanSlug
    ? `${PORTAL_BASE_URL}/${cleanSlug}/customer-portal`
    : `${PORTAL_BASE_URL}/customer-portal`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B2E2A]/75 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-[28px] border border-[#DAD8CC] bg-[#F5F4EE] p-6 sm:p-8 shadow-2xl">
        {/* Top Modal Header: Logo Left + Close Button Right */}
        <div className="flex items-center justify-between gap-4">
          <PlotlyLogo variant="light" size="sm" />
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DAD8CC] bg-white text-[#0B2E2A] hover:bg-[#0B2E2A] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Switcher between System Portal & Book Demo on its own clean row */}
        <div className="mt-5 flex items-center">
          <div className="inline-flex rounded-full border border-[#DAD8CC] bg-white p-1 shadow-[0_1px_4px_rgba(11,46,42,0.05)]">
            <button
              type="button"
              onClick={() => {
                setMode("portal");
                setSubmitted(false);
              }}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                mode === "portal"
                  ? "bg-[#0B2E2A] text-[#F5F4EE]"
                  : "text-[#4A5653] hover:text-[#0B2E2A]"
              }`}
            >
              System Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("demo");
                setSubmitted(false);
              }}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                mode === "demo"
                  ? "bg-[#0B2E2A] text-[#F5F4EE]"
                  : "text-[#4A5653] hover:text-[#0B2E2A]"
              }`}
            >
              Book a Demo
            </button>
          </div>
        </div>

        {mode === "portal" ? (
          <div className="mt-5 space-y-4">
            <div>
              <h2 id="portal-modal-title" className="font-display-h2 text-[28px] text-[#0B2E2A]">
                Enter the System Portal.
              </h2>
              <p className="mt-1.5 text-[15px] text-[#4A5653]">
                Each housing society runs in an isolated workspace. Choose your office portal or buyer phone login.
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#0F1C1A] mb-1.5">
                Society workspace code (optional)
              </label>
              <input
                type="text"
                value={societyCode}
                onChange={(e) => setSocietyCode(e.target.value)}
                placeholder="e.g. homes-scheme"
                className="w-full rounded-xl border border-[#DAD8CC] bg-white px-4 py-3 text-[15px] text-[#0F1C1A] placeholder:text-[#5B6663]/70 focus:outline-none focus:border-[#1B7C63]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={adminUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#0B2E2A] bg-[#0B2E2A] p-4 text-[#F5F4EE] hover:bg-[#135047] transition-colors flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <Building2 className="h-5 w-5 text-[#F2A93B]" />
                  <ArrowUpRight className="h-4 w-4 text-[#F2A93B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold">Society & Staff Portal</div>
                  <div className="mt-0.5 text-[12px] text-[#F5F4EE]/75">
                    Plots, bookings, vouchers & reports
                  </div>
                </div>
              </a>

              <a
                href={customerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#DAD8CC] bg-white p-4 text-[#0F1C1A] hover:border-[#1B7C63] transition-colors flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <Smartphone className="h-5 w-5 text-[#1B7C63]" />
                  <ArrowUpRight className="h-4 w-4 text-[#0B2E2A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-[#0B2E2A]">Customer Portal</div>
                  <div className="mt-0.5 text-[12px] text-[#4A5653]">
                    Buyer phone login for statements
                  </div>
                </div>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#DAD8CC] text-[13px] text-[#4A5653]">
              <span>Need an installation for your society?</span>
              <button
                type="button"
                onClick={() => setMode("demo")}
                className="font-semibold text-[#135047] hover:underline cursor-pointer"
              >
                Request setup →
              </button>
            </div>
          </div>
        ) : !submitted ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <h2 id="portal-modal-title" className="font-display-h2 text-[28px] text-[#0B2E2A]">
                Book a 10-min walkthrough.
              </h2>
              <p className="mt-1.5 text-[15px] text-[#4A5653]">
                See a live demo for your society and get exact pricing for your plot count.
              </p>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#0F1C1A] mb-1.5">
                Housing society or developer name
              </label>
              <input
                type="text"
                required
                value={societyName}
                onChange={(e) => setSocietyName(e.target.value)}
                placeholder="e.g. Margalla Homes Scheme"
                className="w-full rounded-xl border border-[#DAD8CC] bg-white px-4 py-3 text-[15px] text-[#0F1C1A] placeholder:text-[#5B6663]/70 focus:outline-none focus:border-[#1B7C63]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#0F1C1A] mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full rounded-xl border border-[#DAD8CC] bg-white px-4 py-3 text-[15px] text-[#0F1C1A] tabular-nums placeholder:text-[#5B6663]/70 focus:outline-none focus:border-[#1B7C63]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#0F1C1A] mb-1.5">
                  Total plots
                </label>
                <select
                  value={plots}
                  onChange={(e) => setPlots(e.target.value)}
                  className="w-full rounded-xl border border-[#DAD8CC] bg-white px-4 py-3 text-[15px] text-[#0F1C1A] focus:outline-none focus:border-[#1B7C63]"
                >
                  <option>Under 250 plots</option>
                  <option>250 – 1,000 plots</option>
                  <option>1,000 – 5,000 plots</option>
                  <option>5,000+ plots across schemes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] h-12 px-6 text-[15px] font-semibold transition-colors cursor-pointer"
            >
              <span>Request live demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[12px] text-[#5B6663] text-center">
              Isolated workspace setup · Optional bank collection sync
            </p>
          </form>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#DAD8CC] bg-white p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E3F3EE] text-[#1B7C63]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-display-h3 mt-4 text-[22px] text-[#0B2E2A]">
              Demo request recorded.
            </h3>
            <p className="mt-2 text-[15px] text-[#4A5653]">
              We prepared a sample setup note for <strong>{societyName || "your society"}</strong> ({plots}). Our team reaches out on <span className="tabular-nums font-medium">{phone}</span>.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-6 rounded-full bg-[#0B2E2A] text-[#F5F4EE] px-6 py-2.5 text-[14px] font-semibold hover:bg-[#135047] transition-colors cursor-pointer"
            >
              Back to Plotly
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
