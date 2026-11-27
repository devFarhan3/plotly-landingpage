"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

type PlotStatus = "Paid" | "Awaiting" | "Available" | "Reserved";

interface PlotTile {
  id: string;
  size: string;
  status: PlotStatus;
  consumerNo: string;
  paidAmount: string;
  awaitingAmount: string;
  note: string;
}

const BLOCK_C_PLOTS: PlotTile[] = [
  { id: "C-01", size: "10 Marla · Corner", status: "Paid", consumerNo: "9042-408801", paidAmount: "PKR 5,200,000", awaitingAmount: "PKR 0", note: "All 12 installments bank-confirmed" },
  { id: "C-02", size: "10 Marla", status: "Paid", consumerNo: "9042-408802", paidAmount: "PKR 4,850,000", awaitingAmount: "PKR 0", note: "Possession ready · No dues" },
  { id: "C-03", size: "10 Marla", status: "Awaiting", consumerNo: "9042-408803", paidAmount: "PKR 3,600,000", awaitingAmount: "PKR 450,000", note: "Installment #9 voucher issued" },
  { id: "C-04", size: "10 Marla", status: "Available", consumerNo: "—", paidAmount: "PKR 0", awaitingAmount: "PKR 0", note: "Open for booking · Ready file" },
  { id: "C-05", size: "7 Marla", status: "Paid", consumerNo: "9042-408805", paidAmount: "PKR 3,400,000", awaitingAmount: "PKR 0", note: "Bank confirmed via HBL" },
  { id: "C-06", size: "7 Marla", status: "Awaiting", consumerNo: "9042-408806", paidAmount: "PKR 2,150,000", awaitingAmount: "PKR 320,000", note: "Development charge slip due" },
  { id: "C-07", size: "7 Marla", status: "Reserved", consumerNo: "9042-408807", paidAmount: "PKR 500,000", awaitingAmount: "PKR 250,000", note: "Token received · Dealer hold" },
  { id: "C-08", size: "7 Marla · Park", status: "Paid", consumerNo: "9042-408808", paidAmount: "PKR 3,750,000", awaitingAmount: "PKR 0", note: "Park-facing premium settled" },
  { id: "C-09", size: "5 Marla", status: "Available", consumerNo: "—", paidAmount: "PKR 0", awaitingAmount: "PKR 0", note: "Open for booking · Ready file" },
  { id: "C-10", size: "5 Marla", status: "Paid", consumerNo: "9042-408810", paidAmount: "PKR 2,400,000", awaitingAmount: "PKR 0", note: "Full payment settled" },
  { id: "C-11", size: "5 Marla", status: "Awaiting", consumerNo: "9042-408811", paidAmount: "PKR 1,800,000", awaitingAmount: "PKR 220,000", note: "Monthly voucher awaiting bank" },
  { id: "C-12", size: "5 Marla", status: "Paid", consumerNo: "9042-408812", paidAmount: "PKR 2,400,000", awaitingAmount: "PKR 0", note: "Bank confirmed · Receipt issued" },
  { id: "C-13", size: "10 Marla", status: "Reserved", consumerNo: "9042-408813", paidAmount: "PKR 750,000", awaitingAmount: "PKR 450,000", note: "Down payment voucher active" },
  { id: "C-14", size: "10 Marla · Corner", status: "Paid", consumerNo: "9042-408814", paidAmount: "PKR 4,850,000", awaitingAmount: "PKR 0", note: "Bank confirmed · Consumer 9042-408912" },
  { id: "C-15", size: "10 Marla", status: "Available", consumerNo: "—", paidAmount: "PKR 0", awaitingAmount: "PKR 0", note: "Open for booking · Ready file" },
  { id: "C-16", size: "10 Marla", status: "Awaiting", consumerNo: "9042-408816", paidAmount: "PKR 3,900,000", awaitingAmount: "PKR 470,500", note: "Possession fee voucher issued" },
];

const STATUS_TILE_STYLE: Record<PlotStatus, string> = {
  Paid: "bg-[#1B7C63] text-[#F5F4EE] border-[#135047] hover:bg-[#135047]",
  Awaiting: "bg-[#F2A93B] text-[#0B2E2A] border-[#d99124] hover:bg-[#e59b2d]",
  Available: "bg-[#F5F4EE] text-[#0B2E2A] border-[#DAD8CC] hover:border-[#0B2E2A]",
  Reserved: "bg-[#0B2E2A] text-[#F5F4EE] border-[#0B2E2A] hover:bg-[#135047]",
};

const STATUS_BADGE_STYLE: Record<PlotStatus, string> = {
  Paid: "bg-[#E3F3EE] text-[#135047]",
  Awaiting: "bg-[#FDF1DC] text-[#8C5B0D]",
  Available: "bg-[#ECEAE2] text-[#4A5653]",
  Reserved: "bg-white/15 text-[#F5F4EE]",
};

const OLD_WAY_ITEMS = [
  "Unconfirmed bank slips get typed into Excel as Paid",
  "Hours spent matching voucher numbers against bank statements",
  "Different Excel versions on the owner, dealer, and accounts desks",
  "Buyers repeatedly calling the office just to ask their balance",
];

const PLOTLY_WAY_ITEMS = [
  "Bank confirmation date = exact collection date, never overstated",
  "Auto-generated consumer numbers reconcile every rupee cleanly",
  "One live plot file shared across Owner, Accounts, and Dealers",
  "Buyers check their own Paid & Awaiting ledger via phone login",
];

interface PlotInventoryComparisonProps {
  onBookDemo: () => void;
}

export function PlotInventoryComparison({ onBookDemo }: PlotInventoryComparisonProps) {
  const [filter, setFilter] = useState<"All" | PlotStatus>("All");
  const [selectedId, setSelectedId] = useState<string>("C-14");

  const visiblePlots =
    filter === "All" ? BLOCK_C_PLOTS : BLOCK_C_PLOTS.filter((p) => p.status === filter);
  const selectedPlot =
    BLOCK_C_PLOTS.find((p) => p.id === selectedId) ?? BLOCK_C_PLOTS[0];

  return (
    <section className="py-20 sm:py-24 bg-[#F5F4EE] border-t border-[#DAD8CC]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#1B7C63]">
              ← LIVE BLOCK INVENTORY &amp; WHY TEAMS SWITCH
            </p>
            <h2 className="font-display-h2 mt-3 text-[32px] sm:text-[44px] text-[#0B2E2A]">
              Every plot status at a glance. No spreadsheet guesswork.
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-[16px] sm:text-[17px] text-[#4A5653] leading-[1.6] max-w-xl lg:ml-auto">
              Click any plot in Block C to inspect its live consumer number, bank-confirmed collection, and awaiting balance—then compare the old register workflow with Plotly.
            </p>
          </div>
        </div>

        {/* Interactive Block Map + Selected Plot Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display-h3 text-[20px] text-[#0B2E2A]">
                  Block C · Interactive Plot Grid
                </h3>
                <p className="text-[13px] text-[#4A5653]">
                  Select a plot tile to inspect its ledger state
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {(["All", "Paid", "Awaiting", "Available", "Reserved"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors cursor-pointer ${
                      filter === tab
                        ? "bg-[#0B2E2A] text-[#F5F4EE]"
                        : "bg-[#F5F4EE] text-[#4A5653] hover:text-[#0B2E2A]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {visiblePlots.map((plot) => {
                const isSelected = plot.id === selectedPlot.id;
                return (
                  <button
                    key={plot.id}
                    type="button"
                    onClick={() => setSelectedId(plot.id)}
                    className={`rounded-xl border px-2 py-3 text-center transition-all cursor-pointer tabular-nums ${
                      STATUS_TILE_STYLE[plot.status]
                    } ${
                      isSelected
                        ? "ring-2 ring-[#0B2E2A] ring-offset-2 ring-offset-white scale-[1.03]"
                        : ""
                    }`}
                  >
                    <div className="text-[12px] font-semibold">{plot.id}</div>
                    <div className="mt-0.5 text-[10px] opacity-80">{plot.status}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-[#DAD8CC] pt-4 text-[12px] text-[#4A5653]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#1B7C63]" /> Paid (Bank Confirmed)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#F2A93B]" /> Awaiting Slip
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#F5F4EE] border border-[#DAD8CC]" /> Available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#0B2E2A]" /> Reserved
              </span>
            </div>
          </div>

          {/* Dark Plot Inspector Card */}
          <div className="lg:col-span-5 rounded-[28px] border border-[#135047] bg-[#0B2E2A] text-[#F5F4EE] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F2A93B]">
                  Plot Inspector
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    STATUS_BADGE_STYLE[selectedPlot.status]
                  }`}
                >
                  {selectedPlot.status}
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div className="font-display-h2 text-[32px] text-[#F5F4EE] tabular-nums">
                  Plot {selectedPlot.id}
                </div>
                <div className="text-[13px] text-[#F5F4EE]/75">{selectedPlot.size}</div>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-[#135047]/55 border border-white/10 p-4 text-[14px] tabular-nums">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#F5F4EE]/70">Consumer No.</span>
                  <span className="font-semibold text-[#F5F4EE]">{selectedPlot.consumerNo}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#F5F4EE]/70">Bank-Confirmed Paid</span>
                  <span className="font-semibold text-[#E3F3EE]">{selectedPlot.paidAmount}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#F5F4EE]/70">Awaiting Voucher</span>
                  <span className="font-semibold text-[#F2A93B]">{selectedPlot.awaitingAmount}</span>
                </div>
              </div>

              <p className="mt-4 text-[13px] text-[#F5F4EE]/75 leading-relaxed">
                {selectedPlot.note}
              </p>
            </div>

            <button
              type="button"
              onClick={onBookDemo}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#F2A93B] hover:bg-[#e59b2d] text-[#0B2E2A] h-11 px-5 text-[14px] font-semibold transition-colors cursor-pointer"
            >
              <span>See your society map live</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Before vs. With Plotly Comparison */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-[28px] border border-[#DAD8CC] bg-[#FFFFFF] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5B6663]">
                Before Plotly
              </span>
              <span className="rounded-full bg-[#ECEAE2] px-3 py-1 text-[11px] font-semibold text-[#4A5653]">
                Manual Risk
              </span>
            </div>
            <h3 className="font-display-h3 mt-3 text-[22px] text-[#0B2E2A]">
              Registers &amp; Scattered Excel
            </h3>
            <ul className="mt-5 space-y-3 border-t border-[#DAD8CC] pt-5 text-[14px] text-[#4A5653]">
              {OLD_WAY_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <XCircle className="h-4 w-4 text-[#8C5B0D]/75 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-[#135047] bg-[#0B2E2A] text-[#F5F4EE] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F2A93B]">
                With Plotly
              </span>
              <span className="rounded-full bg-[#135047] border border-white/15 px-3 py-1 text-[11px] font-semibold text-[#F5F4EE]">
                Bank-Verified
              </span>
            </div>
            <h3 className="font-display-h3 mt-3 text-[22px] text-[#F5F4EE]">
              One Ledger &amp; Consumer Vouchers
            </h3>
            <ul className="mt-5 space-y-3 border-t border-white/15 pt-5 text-[14px] text-[#F5F4EE]/90">
              {PLOTLY_WAY_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#F2A93B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
