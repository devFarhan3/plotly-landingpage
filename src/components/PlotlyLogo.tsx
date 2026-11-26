import React from "react";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Logo Option A: Parcel — Land cut into plots by an angled road.
 * Three geometric shapes, two crisp gaps. The amber parcel is the plot just booked.
 * Wordmark set in Bricolage Grotesque 600, tracked tight.
 */
export function PlotlyLogo({
  variant = "light",
  showTagline = false,
  size = "md",
  className = "",
}: LogoProps) {
  const isDarkBg = variant === "dark";
  const leftPlotColor = isDarkBg ? "#F5F4EE" : "#0B2E2A";
  const topRightPlotColor = isDarkBg ? "#1B7C63" : "#135047";
  const wordmarkColor = isDarkBg ? "text-[#F5F4EE]" : "text-[#0B2E2A]";
  const taglineColor = isDarkBg ? "text-[#F5F4EE]/70" : "text-[#4A5653]";

  const sizes = {
    sm: { icon: 24, text: "text-[20px]" },
    md: { icon: 30, text: "text-[24px]" },
    lg: { icon: 38, text: "text-[30px]" },
  }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={sizes.icon}
        height={sizes.icon}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Left master parcel cut by diagonal road */}
        <path d="M2 3H18.5L13.5 33H2V3Z" fill={leftPlotColor} />
        {/* Top-right parcel across the road */}
        <path d="M22.2 3H34V17.5H19.7L22.2 3Z" fill={topRightPlotColor} />
        {/* Bottom-right booked parcel in Peg Amber */}
        <path d="M19.1 21H34V33H17L19.1 21Z" fill="#F2A93B" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-bricolage)] font-semibold tracking-[-0.035em] ${sizes.text} ${wordmarkColor}`}
        >
          Plotly
        </span>
        {showTagline && (
          <span className={`mt-1 text-[11px] font-medium tracking-[-0.01em] ${taglineColor}`}>
            Every plot. Every rupee. Accounted for.
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * Brand Identity Concept B: Key-P Stamp.
 * Per Brand Identity PDF 01/04: "B becomes the stamp on vouchers and receipts."
 */
export function KeyPStamp({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Plotly Official Voucher Stamp"
    >
      <path
        d="M20 4C11.7157 4 5 10.7157 5 19V44H15V39H21V34H15V31H22V26H15V19C15 16.2386 17.2386 14 20 14C22.7614 14 25 16.2386 25 19C25 21.7614 22.7614 24 20 24H17V31H20C26.6274 31 32 25.6274 32 19C32 10.7157 26.6274 4 20 4Z"
        fill="#0B2E2A"
      />
      <circle cx="20" cy="19" r="3" fill="#F2A93B" />
    </svg>
  );
}
