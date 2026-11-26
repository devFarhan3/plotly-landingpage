import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://plotly.pk";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B2E2A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Plotly — Every plot. Every rupee. Accounted for.",
    template: "%s | Plotly",
  },
  description:
    "Plot and housing society software for Pakistan. Track plots, bookings, monthly installments, bank-confirmed vouchers, refunds, dealer commissions, petty cash, and buyer portals in one calm ledger.",
  keywords: [
    "housing society software Pakistan",
    "plot management software",
    "real estate installment software Pakistan",
    "housing scheme voucher billing",
    "bank payment collection consumer number",
    "plot booking ledger",
    "society cash flow software",
    "Plotly",
  ],
  authors: [{ name: "Plotly" }],
  creator: "Plotly",
  publisher: "Plotly",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Plotly",
    title: "Plotly — Every plot. Every rupee. Accounted for.",
    description:
      "Know what is paid. Chase what is not. One central record for housing societies in Pakistan: plots, consumer vouchers, bank confirmations, refunds, and customer portals.",
    images: [
      {
        url: "/images/scene-hero.jpg",
        width: 1408,
        height: 768,
        alt: "Plotly architectural housing society diorama with booked amber plot parcel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plotly — Every plot. Every rupee. Accounted for.",
    description:
      "Plot and housing society software for Pakistan. Bank-confirmed installments, zero double-bookings, and 14 audit-ready PDF reports.",
    images: ["/images/scene-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable}`}>
      <body className="antialiased selection:bg-[#F2A93B]/35 selection:text-[#0B2E2A]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
