import type { ReactElement } from "react";

type IconProps = { className?: string };

const base = "h-5 w-5";

export function CalculatorIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="3" width="15" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="5.5" width="10" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.75" cy="13.25" r="0.9" fill="currentColor" />
      <circle cx="12" cy="13.25" r="0.9" fill="currentColor" />
      <circle cx="16.25" cy="13.25" r="0.9" fill="currentColor" />
      <circle cx="7.75" cy="17" r="0.9" fill="currentColor" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
      <circle cx="16.25" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function CoinsIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="9" cy="7" rx="5.5" ry="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 7v4c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 11v4c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="15.5" cy="13" rx="5" ry="2.7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 13v3.5c0 1.5 2.24 2.7 5 2.7s5-1.2 5-2.7V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BriefcaseIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 12.5v1.8h3v-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WalletIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="14" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function BagIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 8.5h11l1 11.5h-13l1-11.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ExchangeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 8h13.5M18.5 8 15 4.5M18.5 8 15 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 16H5.5M5.5 16 9 12.5M5.5 16 9 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v8.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19.5V14h4v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function CarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 15v-2.2L6.3 8.4A2 2 0 0 1 8.1 7.2h7.8a2 2 0 0 1 1.8 1.2l1.8 4.4V15" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="3" y="15" width="18" height="4" rx="1.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 11.5h15" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PercentIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 18 18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="7.5" cy="7.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="16.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function TargetIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TrendDownIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6.5 10 13l3.5-3.5L20 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 16h5.5v-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendUpIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 17 10 10.5l3.5 3.5L20 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 7H20v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.5 19 6.3v5.4c0 4.4-2.9 7.6-7 8.8-4.1-1.2-7-4.4-7-8.8V6.3L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12.2l2.1 2.1L15.5 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M12 4c2.2 2.1 3.3 4.9 3.3 8s-1.1 5.9-3.3 8c-2.2-2.1-3.3-4.9-3.3-8s1.1-5.9 3.3-8Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SparkleIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5c.5 3 2 4.9 5.2 5.5-3.2.6-4.7 2.5-5.2 5.5-.5-3-2-4.9-5.2-5.5 3.2-.6 4.7-2.5 5.2-5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 14.5c.28 1.4.98 2.2 2.3 2.5-1.32.3-2.02 1.1-2.3 2.5-.28-1.4-.98-2.2-2.3-2.5 1.32-.3 2.02-1.1 2.3-2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 5.5c1.8-1 4.2-1.3 6.3-.6a3 3 0 0 1 1.7 1.5 3 3 0 0 1 1.7-1.5c2.1-.7 4.5-.4 6.3.6v12.7c-1.8-1-4.2-1.3-6.3-.6a3 3 0 0 0-1.7 1.5 3 3 0 0 0-1.7-1.5c-2.1-.7-4.5-.4-6.3.6V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 6.4v12.7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CreditCardIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BasketIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 9.5h15l-1.4 9.1a2 2 0 0 1-2 1.7H7.9a2 2 0 0 1-2-1.7L4.5 9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 9.5 9.5 4M16 9.5 14.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 13v4M14.5 13v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const CATEGORY_ICON_MAP: Record<string, (props: IconProps) => ReactElement> = {
  "credit-borrowing": CreditCardIcon,
  "salary-work": WalletIcon,
  "home-vehicle": HomeIcon,
  insurance: ShieldCheckIcon,
  "cost-of-living": BasketIcon,
  investing: TrendUpIcon,
};

export function CategoryIcon({ id, className }: { id: string; className?: string }) {
  const Icon = CATEGORY_ICON_MAP[id] ?? BookIcon;
  return <Icon className={className} />;
}

const QUIZ_ICON_MAP: Record<string, (props: IconProps) => ReactElement> = {
  credit: CreditCardIcon,
  loan: CalculatorIcon,
  bnpl: BagIcon,
  home: HomeIcon,
  car: CarIcon,
  salary: WalletIcon,
  zakat: CoinsIcon,
  invest: TrendUpIcon,
  insurance: ShieldCheckIcon,
  living: BasketIcon,
};

export function QuizIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = QUIZ_ICON_MAP[icon] ?? SparkleIcon;
  return <Icon className={className} />;
}

const TOOL_ICON_MAP: Record<string, (props: IconProps) => ReactElement> = {
  "loan-calculator": CalculatorIcon,
  "zakat-calculator": CoinsIcon,
  "gratuity-calculator": BriefcaseIcon,
  "salary-calculator": WalletIcon,
  "bnpl-calculator": BagIcon,
  "currency-converter": ExchangeIcon,
  "mortgage-calculator": HomeIcon,
  "car-finance-calculator": CarIcon,
  "vat-calculator": PercentIcon,
  "savings-goal-calculator": TargetIcon,
  "debt-payoff-calculator": TrendDownIcon,
  "investment-growth-calculator": TrendUpIcon,
};

export function ToolIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = TOOL_ICON_MAP[slug] ?? CalculatorIcon;
  return <Icon className={className} />;
}
