import type { Metadata } from "next";
import { Anton, Oswald } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TextureDefs } from "@/components/Texture";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";

/* Display face for the wordmark and headings — condensed, heavy.
   The `.rough` SVG filter is what gives it the distressed edge. */
const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

/* Body face — condensed to match the display type. */
const body = Oswald({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  keywords: [
    "James Kapner",
    "film director",
    "Los Angeles film director",
    "LA-based director",
    "commercial director",
    "branded content director",
    "music video director",
    "narrative film director",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <TextureDefs />
        <PersonJsonLd />
        <WebSiteJsonLd />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
