import React from "react";
import { FAQS, WORKFLOW_STEPS } from "@/data/plotlyData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://plotly.pk";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Plotly",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description:
      "Plot and housing society management software for Pakistan. Track plots, bookings, installments, bank-confirmed vouchers, refunds, dealer commissions, and cash flow.",
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    knowsAbout: [
      "Housing society management software Pakistan",
      "Plot booking and installment ledger",
      "Bank voucher payment reconciliation",
      "Consumer number billing for housing schemes",
      "Real estate developer cash flow and commission tracking",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Plotly",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Every plot. Every rupee. Accounted for. Complete software for Pakistani housing societies and plot developers to manage schemes, blocks, bookings, consumer vouchers, bank confirmations, refunds, dealer commissions, petty cash, and buyer portals.",
    featureList: [
      "Multi-project housing scheme, block, and unique plot inventory",
      "Plot booking with advance, discount, and month-by-month installments",
      "Automatic voucher and unique consumer number generation",
      "Bank payment collection and confirmation reconciliation (Paid vs Awaiting)",
      "One-step booking cancellation, refund calculation, and plot release",
      "CNIC-deduplicated dealer commissions and staff payroll",
      "Petty cash with receipt images, society loans, and land purchase investments",
      "Customer self-service portal via phone login with printable PDF statements",
    ],
    offers: {
      "@type": "Offer",
      price: "8000",
      priceCurrency: "PKR",
      description: "Plans start from PKR 8,000/month for up to 150 plots.",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How a plot sale and bank confirmation runs in Plotly",
    description:
      "Step-by-step workflow from defining housing scheme blocks and booking a plot to bank voucher confirmation and customer portal statements.",
    step: WORKFLOW_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Plotly",
    url: SITE_URL,
    description: "Every plot. Every rupee. Accounted for.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
