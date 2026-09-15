import type { Metadata } from "next";
import { Inter, Fraunces, Almarai, Amiri } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { buildOpenGraph } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const almarai = Almarai({
  subsets: ["arabic"],
  variable: "--font-almarai",
  display: "swap",
  weight: ["400", "700", "800"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
  weight: ["400", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saudimoneyguide.com"),
    title: {
      default: t("name"),
      template: `%s | ${t("name")}`,
    },
    description: t("tagline"),
    ...buildOpenGraph({
      title: t("name"),
      description: t("tagline"),
      path: "",
      locale: locale as Locale,
    }),
    // Search-engine ownership verification codes. Neither is a secret
    // (both are meant to sit in public page HTML), so hardcoded defaults
    // are safe — but both stay overridable via env var without a code
    // change if either is ever regenerated.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION ?? "WcKSC8bmbRs1ius6XkNoamYglNFsd5VFVXQ5nOIBq4A",
      other: {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION ?? "E0AA4BAEBA7006748D1F8712548C6C2B",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale: Locale = rawLocale;

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${inter.variable} ${fraunces.variable} ${almarai.variable} ${amiri.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteSchema(locale)) }}
        />
        <NextIntlClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
