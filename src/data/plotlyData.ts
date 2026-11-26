export interface ScrollWorldChapter {
  id: string;
  step: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  accent: string;
  tags: string[];
  metricLabel: string;
  metricValue: string;
  statusChip: {
    label: "Paid" | "Awaiting" | "Returned" | "Booked";
    detail: string;
  };
  /** Optional scrub-engine video clip path when generated via Monid/Higgsfield */
  clip?: string;
}

export const SCROLL_WORLD_CHAPTERS: ScrollWorldChapter[] = [
  {
    id: "setup",
    step: "01",
    label: "Society Map",
    eyebrow: "PROJECT · BLOCK · PLOT",
    title: "Every plot has one record from day one.",
    body: "Define your Homes scheme or City scheme, split blocks, and assign unique plot numbers and Marla or Kanal sizes. Sold plots lock immediately so two dealers never book the same file twice.",
    image: "/images/scene-hero.jpg",
    accent: "#1B7C63",
    tags: ["Unique plot numbers", "Multi-project", "Zero double-booking"],
    metricLabel: "BLOCK C INVENTORY",
    metricValue: "240 / 240 Plots Mapped",
    statusChip: {
      label: "Booked",
      detail: "Plot 14, Block C · 10 Marla",
    },
  },
  {
    id: "booking",
    step: "02",
    label: "Booking & Voucher",
    eyebrow: "CUSTOMER · ADVANCE · SLIP",
    title: "Book a plot. Issue its consumer number in one step.",
    body: "Enter total plot price, discount, and advance. Saving a booking, monthly installment, or possession charge generates a printable voucher with a unique consumer number and bank slip.",
    image: "/images/scene-booking.jpg",
    accent: "#F2A93B",
    tags: ["Auto consumer no.", "Month-by-month installments", "Extra charges"],
    metricLabel: "BOOKING VOUCHER #408912",
    metricValue: "PKR 1,240,500 Awaiting",
    statusChip: {
      label: "Awaiting",
      detail: "Voucher issued 12 Nov · due 12 Dec",
    },
  },
  {
    id: "bank",
    step: "03",
    label: "Bank Confirmation",
    eyebrow: "BANK COLLECTION · RECONCILIATION",
    title: "Paid means bank confirmed. Never a guess.",
    body: "Customers pay at the bank using the consumer number on their slip. Once the bank confirms, the voucher flips to Paid, remaining plot balance updates, and completed bookings close automatically.",
    image: "/images/scene-bank.jpg",
    accent: "#1B7C63",
    tags: ["Direct bank lookup", "Paid vs Awaiting split", "Zero overstatement"],
    metricLabel: "CONFIRMED COLLECTIONS",
    metricValue: "PKR 4,850,000 Received",
    statusChip: {
      label: "Paid",
      detail: "Bank confirmed · Balance updated",
    },
  },
  {
    id: "portal",
    step: "04",
    label: "Portal & Cash Flow",
    eyebrow: "CUSTOMER PORTAL · SOCIETY LEDGER",
    title: "Buyers check their own ledger. Office sees every rupee.",
    body: "Plot buyers log in with their phone number to view installments and print statements. Management tracks dealer commissions, staff salaries, petty cash receipts, loans, and land investments together.",
    image: "/images/scene-portal.jpg",
    accent: "#F2A93B",
    tags: ["Phone-login portal", "14 PDF reports", "One-click refunds"],
    metricLabel: "NET SOCIETY CASH FLOW",
    metricValue: "14 Audit-Ready PDFs",
    statusChip: {
      label: "Paid",
      detail: "Statement synced · Portal live",
    },
  },
];

export const CORE_MODULES = [
  {
    code: "01",
    name: "Plot & Scheme Setup",
    category: "Inventory",
    summary: "Run multiple schemes (Homes, City) with unique block names, plot sizes, charge types, and payment methods.",
    rule: "Plot numbers stay unique per block.",
  },
  {
    code: "02",
    name: "Bookings & Installments",
    category: "Sales",
    summary: "Record total price, discount, advance, and flexible monthly installments plus development or transfer charges.",
    rule: "Auto-completes when balance hits PKR 0.",
  },
  {
    code: "03",
    name: "Bank Payment Collection",
    category: "Reconciliation",
    summary: "Banks look up the voucher consumer number directly and confirm payment. Toggle bank sync on or off per society.",
    rule: "Unconfirmed vouchers stay Awaiting.",
  },
  {
    code: "04",
    name: "Cancellations & Refunds",
    category: "Compliance",
    summary: "Calculate net refund after deductions, mark entries Returned, release the plot back to stock, and pay refunds in parts.",
    rule: "Returned totals never distort past reports.",
  },
  {
    code: "05",
    name: "Dealer Commission & Staff",
    category: "Operations",
    summary: "Dedupe dealers automatically by CNIC, track plot-wise commissions, manage employee salary revisions, and pay monthly payroll.",
    rule: "CNIC uniqueness prevents duplicate dealers.",
  },
  {
    code: "06",
    name: "Petty Cash, Loans & Land",
    category: "Treasury",
    summary: "Attach receipt photos to petty cash entries, track society loans by borrower phone, and log land purchases with witness records.",
    rule: "Every outgoing rupee joins Cash Flow.",
  },
  {
    code: "07",
    name: "Role-Based Access Control",
    category: "Security",
    summary: "Create custom roles like Operational Officer with screen- and action-level permissions, keeping society data isolated.",
    rule: "Buyers see only their own plot files.",
  },
  {
    code: "08",
    name: "Customer Self-Service Portal",
    category: "Buyer Experience",
    summary: "Plot buyers log in using their registered phone number to download printable vouchers, charges, receipts, and plot statements.",
    rule: "Cuts office phone calls and counter queues.",
  },
];

export const REPORT_CATALOG = [
  { name: "Customer / Plot Statement", output: "PDF + Screen", scope: "Full booking, advance, installments, charges, and remaining balance." },
  { name: "Monthly Installments", output: "PDF + Screen", scope: "Installments due versus confirmed collections for each month." },
  { name: "Booking Register", output: "PDF + Screen", scope: "Bookings in a period with plot price, advance, and remaining balance." },
  { name: "Plot Payment Status", output: "PDF + Screen", scope: "Payment progress across every sold plot file in a scheme." },
  { name: "Plot Inventory (Size-Wise)", output: "PDF + Screen", scope: "Sold and available plots grouped by Marla or Kanal size." },
  { name: "Bank Transaction Report", output: "PDF + Screen", scope: "Bank confirmations matched against vouchers: received vs awaiting." },
  { name: "Society Cash Flow", output: "PDF + Screen", scope: "All incoming collections against commissions, salaries, petty cash, and loans." },
  { name: "Refund & Release Report", output: "PDF + Screen", scope: "Confirmed payments, deductions, net refund, and payout installments." },
  { name: "Dealer Commission Report", output: "PDF + Screen", scope: "Commissions grouped by dealer CNIC, project, block, and month." },
  { name: "Petty Cash with Receipts", output: "PDF + Photos", scope: "Project expenses grouped by category with attached receipt images." },
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Define schemes, blocks & plots",
    description: "Set up Homes or City projects, add blocks, import plot numbers and sizes, and assign staff roles.",
    meta: "Setup · Role-Based Access",
  },
  {
    step: "02",
    title: "Book plot & issue consumer slip",
    description: "Register the buyer, capture advance and discount, and print an automatic voucher carrying a unique consumer number.",
    meta: "Booking · Consumer No.",
  },
  {
    step: "03",
    title: "Bank confirms the rupee",
    description: "Buyer pays at the bank counter or app. Bank confirmation flips the voucher from Awaiting to Paid and recalculates the balance.",
    meta: "Bank Sync · Exact Ledger",
  },
  {
    step: "04",
    title: "Statements, portal & full cash flow",
    description: "Buyers print their own statements online while management reviews collections, dealer commissions, salaries, and expenses.",
    meta: "Portal · 14 PDF Reports",
  },
];

export const FAQS = [
  {
    question: "How does Plotly prevent double-booking and fake payment claims?",
    answer:
      "Every plot number is locked as unique inside its block and marks as Booked immediately upon sale. Payments are counted as Paid only after bank confirmation via the voucher consumer number; unconfirmed vouchers stay clearly labeled Awaiting so collection totals are never overstated.",
  },
  {
    question: "Can one Plotly installation manage multiple housing schemes?",
    answer:
      "Yes. Projects, blocks, plot sizes, charge types (Development Charges, Transfer Fee, Possession Charges), and expense types are all configurable. One housing developer can run a Homes scheme, a City scheme, and commercial blocks in one isolated workspace.",
  },
  {
    question: "How do plot buyers check their installments without calling the office?",
    answer:
      "When you register a buyer, Plotly creates their Customer Portal login tied to their registered phone number. Buyers sign in to view their own plots, due installments, extra charges, and print official vouchers or full plot statements as PDFs.",
  },
  {
    question: "What happens when a customer cancels a booking and requests a refund?",
    answer:
      "From the booking screen, the admin records any deduction and reason in one step. Plotly calculates confirmed money paid, marks the booking and its installments as Returned without erasing historical collection reports, releases the plot back to available inventory, and tracks refund payouts in parts.",
  },
  {
    question: "Does Plotly track dealer commissions, staff salaries, and petty cash too?",
    answer:
      "Yes. Dealers are deduplicated by CNIC, staff salaries support dated pay revisions, and petty cash entries attach receipt photos that appear directly in printable PDFs—alongside society loans and land purchase investments in one Cash Flow report.",
  },
  {
    question: "Is bank integration mandatory for smaller societies?",
    answer:
      "No. Bank collection can be switched on or off per housing society. Societies that start with manual bank deposits or cash counters can issue Plotly receipts and turn on direct bank voucher lookup whenever ready.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Before this, our recovery desk spent three days every month matching bank deposit slips against Excel sheets. Now Paid means bank confirmed, and Awaiting shows us exactly whom to call.",
    author: "Tariq Mahmood",
    role: "Operational Officer",
    society: "Al-Noor Homes Scheme · 620 Plots",
    metric: "3 days → 10 mins monthly reconciliation",
  },
  {
    quote:
      "Dealers used to call the office to check if a corner plot was free, and buyers called for balances. With unique plot locking and the phone-login portal, those calls dropped almost to zero.",
    author: "Kamran Siddiqui",
    role: "Accounts & Recovery Lead",
    society: "Margalla Enclave City · 1,150 Plots",
    metric: "0 double-bookings across 4 blocks",
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter Scheme",
    price: "PKR 8,000",
    period: "/month",
    capacity: "Up to 150 plots",
    summary: "Ideal for a single housing block or new scheme replacing Excel registers.",
    highlights: [
      "Plot inventory, bookings & consumer vouchers",
      "Paid vs Awaiting installment ledger",
      "Role-based staff access + Customer Portal",
    ],
    featured: false,
  },
  {
    name: "Growing Society",
    price: "Custom",
    period: "quote",
    capacity: "150 – 1,500 plots",
    summary: "For established societies needing bank sync, dealer commissions, and full cash flow.",
    highlights: [
      "Direct bank voucher confirmation sync",
      "CNIC-unique dealer commissions & payroll",
      "Petty cash with receipt photos + 14 PDFs",
    ],
    featured: true,
  },
  {
    name: "Multi-Scheme Developer",
    price: "Custom",
    period: "quote",
    capacity: "Unlimited schemes & plots",
    summary: "Run Homes and City schemes under one roof with isolated society workspaces.",
    highlights: [
      "Multi-project setup, loans & land investments",
      "Dedicated onboarding & data migration",
      "Priority WhatsApp & office team training",
    ],
    featured: false,
  },
];
