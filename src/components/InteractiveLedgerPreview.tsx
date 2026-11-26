"use client";

import React, { useState } from "react";
import { KeyPStamp } from "./PlotlyLogo";
import { CheckCircle2, Clock, RotateCcw, Printer, ShieldCheck } from "lucide-react";

type TabMode = "ledger" | "voucher" | "refund";

export function InteractiveLedgerPreview() {
  const [tab, setTab] = useState<TabMode>("ledger");

  return (
    <div className="rounded-[28px] border border-white/15 bg-[#135047]/45 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
      {/* Top Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#F2A93B]">
            LIVE PRODUCT RULE PREVIEW
          </p>
          <p className="mt-0.5 text-[14px] text-[#F5F4EE]/80">
            Plot 14, Block C · Homes scheme (10 Marla)
          </p>
        </div>

        <div className="inline-flex rounded-full bg-[#0B2E2A] p-1 border border-white/15">
          {[
            { id: "ledger", label: "Installment Ledger" },
            { id: "voucher", label: "Bank Voucher" },
            { id: "refund", label: "Refund & Release" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as TabMode)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium transition-colors cursor-pointer ${
                tab === item.id
                  ? "bg-[#F2A93B] text-[#0B2E2A] font-semibold"
                  : "text-[#F5F4EE]/75 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {tab === "ledger" && (
        <div className="mt-5 space-y-4">
          {/* Exact Numbers Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[#0B2E2A]/85 border border-white/10 p-4">
              <div className="text-[12px] text-[#F5F4EE]/65">Bank Confirmed (Paid)</div>
              <div className="mt-1 text-[22px] font-semibold text-[#F5F4EE] tabular-nums">
                PKR 4,850,000
              </div>
              <div className="mt-1 text-[11px] text-[#1B7C63] font-medium">
                Counted in collection totals
              </div>
            </div>
            <div className="rounded-2xl bg-[#0B2E2A]/85 border border-white/10 p-4">
              <div className="text-[12px] text-[#F5F4EE]/65">Voucher Issued (Awaiting)</div>
              <div className="mt-1 text-[22px] font-semibold text-[#F2A93B] tabular-nums">
                PKR 1,240,500
              </div>
              <div className="mt-1 text-[11px] text-[#F5F4EE]/60">
                Shown separately until bank confirms
              </div>
            </div>
            <div className="rounded-2xl bg-[#0B2E2A]/85 border border-white/10 p-4">
              <div className="text-[12px] text-[#F5F4EE]/65">Remaining Plot Balance</div>
              <div className="mt-1 text-[22px] font-semibold text-[#F5F4EE] tabular-nums">
                PKR 2,409,500
              </div>
              <div className="mt-1 text-[11px] text-[#F5F4EE]/60">
                Auto-completes at PKR 0
              </div>
            </div>
          </div>

          {/* Ledger Table on Crisp Paper Surface */}
          <div className="rounded-2xl bg-[#FFFFFF] text-[#0F1C1A] border border-[#DAD8CC] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#F5F4EE] border-b border-[#DAD8CC] text-[11px] uppercase tracking-[0.07em] text-[#4A5653]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Entry</th>
                    <th className="px-4 py-3 font-semibold">Consumer No.</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold text-right">Amount (PKR)</th>
                    <th className="px-4 py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DAD8CC]/70 tabular-nums">
                  <tr>
                    <td className="px-4 py-3 font-medium">Booking Advance</td>
                    <td className="px-4 py-3 text-[#4A5653]">#408901</td>
                    <td className="px-4 py-3 text-[#4A5653]">14 Sep</td>
                    <td className="px-4 py-3 text-right font-semibold">2,500,000</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E3F3EE] px-2.5 py-0.5 text-[12px] font-semibold text-[#135047]">
                        <CheckCircle2 className="h-3 w-3 text-[#1B7C63]" /> Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Installment 01</td>
                    <td className="px-4 py-3 text-[#4A5653]">#408908</td>
                    <td className="px-4 py-3 text-[#4A5653]">12 Oct</td>
                    <td className="px-4 py-3 text-right font-semibold">2,350,000</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E3F3EE] px-2.5 py-0.5 text-[12px] font-semibold text-[#135047]">
                        <CheckCircle2 className="h-3 w-3 text-[#1B7C63]" /> Paid
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Installment 02</td>
                    <td className="px-4 py-3 text-[#4A5653]">#408912</td>
                    <td className="px-4 py-3 text-[#4A5653]">Due 12 Dec</td>
                    <td className="px-4 py-3 text-right font-semibold">1,240,500</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FDF1DC] px-2.5 py-0.5 text-[12px] font-semibold text-[#8C5B0D]">
                        <Clock className="h-3 w-3 text-[#F2A93B]" /> Awaiting
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "voucher" && (
        <div className="mt-5 rounded-2xl bg-[#FFFFFF] text-[#0F1C1A] border border-[#DAD8CC] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-[#DAD8CC] pb-4">
            <div className="flex items-center gap-3">
              <KeyPStamp className="w-9 h-11 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#1B7C63]">
                  OFFICIAL BANK VOUCHER · KEY-P STAMPED
                </div>
                <div className="text-[18px] font-semibold text-[#0B2E2A]">
                  Homes scheme · Plot 14, Block C
                </div>
              </div>
            </div>
            <div className="text-right tabular-nums">
              <div className="text-[11px] uppercase tracking-[0.08em] text-[#5B6663]">
                Consumer Number
              </div>
              <div className="text-[20px] font-semibold text-[#0B2E2A]">9042-408912</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px] tabular-nums">
            <div>
              <div className="text-[#5B6663] text-[11px] uppercase">Customer</div>
              <div className="font-semibold mt-0.5">Tariq Mahmood</div>
            </div>
            <div>
              <div className="text-[#5B6663] text-[11px] uppercase">CNIC</div>
              <div className="font-semibold mt-0.5">35202-•••••••-1</div>
            </div>
            <div>
              <div className="text-[#5B6663] text-[11px] uppercase">Due Date</div>
              <div className="font-semibold mt-0.5">12 Dec 2026</div>
            </div>
            <div>
              <div className="text-[#5B6663] text-[11px] uppercase">Payable Amount</div>
              <div className="font-semibold text-[#0B2E2A] mt-0.5">PKR 1,240,500</div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F4EE] px-4 py-3 border border-[#DAD8CC]">
            <div className="flex items-center gap-2 text-[13px] text-[#4A5653]">
              <ShieldCheck className="h-4 w-4 text-[#1B7C63]" />
              <span>Bank looks up consumer no. 9042-408912 and marks Paid automatically.</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0B2E2A]">
              <Printer className="h-3.5 w-3.5" /> Print Slip Ready
            </span>
          </div>
        </div>
      )}

      {tab === "refund" && (
        <div className="mt-5 rounded-2xl bg-[#FFFFFF] text-[#0F1C1A] border border-[#DAD8CC] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DAD8CC] pb-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5B6663]">
                ONE-STEP CANCELLATION & PLOT RELEASE
              </div>
              <div className="mt-0.5 text-[17px] font-semibold text-[#0B2E2A]">
                Plot 09, Block B · Marked Returned, Stock Released
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECEAE2] px-3 py-1 text-[12px] font-semibold text-[#4A5653]">
              <RotateCcw className="h-3.5 w-3.5" /> (Returned)
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 tabular-nums text-[13px]">
            <div className="rounded-xl bg-[#F5F4EE] p-3.5 border border-[#DAD8CC]">
              <div className="text-[#5B6663]">Confirmed Paid</div>
              <div className="mt-1 text-[18px] font-semibold">PKR 1,800,000</div>
            </div>
            <div className="rounded-xl bg-[#F5F4EE] p-3.5 border border-[#DAD8CC]">
              <div className="text-[#5B6663]">Society Deduction</div>
              <div className="mt-1 text-[18px] font-semibold">PKR 150,000</div>
            </div>
            <div className="rounded-xl bg-[#E3F3EE] p-3.5 border border-[#1B7C63]/25">
              <div className="text-[#135047]">Net Refund Payable</div>
              <div className="mt-1 text-[18px] font-semibold text-[#0B2E2A]">PKR 1,650,000</div>
            </div>
          </div>

          <p className="mt-4 text-[13px] text-[#4A5653]">
            Returned entries stay out of sold plot counts while preserving historical collection dates. Plot 09, Block B returns to available inventory immediately.
          </p>
        </div>
      )}
    </div>
  );
}
