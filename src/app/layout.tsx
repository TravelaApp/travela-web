import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contact, site, socials } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

/** Outfit carries the headings and Inter the body; both are self-hosted variable fonts exposed as the CSS variables globals.css reads. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["Kenya", "travel", "47 counties", "destinations", "safari", "Travela"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
};

/** Light mode only: keep form controls and the address bar in the sand palette rather than following the phone's dark setting. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#fbf7ee",
};

/** Structured data so search engines read the site as one product. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      email: contact.email,
      telephone: contact.phone,
      address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      sameAs: socials.map((social) => social.url),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        {/* Analytics only reports from Vercel, so it is loaded there and nowhere else. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
