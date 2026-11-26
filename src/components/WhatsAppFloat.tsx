"use client";

import React from "react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
const PREFILL_TEXT = encodeURIComponent(
  "Assalam-o-Alaikum, I want to book a 10-min Plotly walkthrough and get pricing for our housing society."
);

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILL_TEXT}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#135047] hover:bg-[#0B2E2A] text-[#F5F4EE] border border-white/20 pl-3.5 pr-4 py-3 shadow-[0_12px_32px_rgba(11,46,42,0.28)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A93B]"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-[#0B2E2A]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.328-5.141-4.531-.141-.203-1.234-1.641-1.234-3.125s.781-2.219 1.063-2.516c.281-.297.609-.375.813-.375.203 0 .406 0 .578.016.188.016.438-.078.688.531.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.344-.313.516-.156.172-.328.391-.469.531-.156.156-.328.328-.141.641.188.313.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.609 1.609.313.156.5.125.688-.078.188-.203.781-.906.984-1.219.203-.313.422-.266.703-.156.281.109 1.797.844 2.109 1 .313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
        </svg>
      </span>
      <span className="text-[13px] font-semibold tracking-[-0.01em] hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
