import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const header = localFont({
  src: "../fonts/Rueckwarzsalto.otf",
  variable: "--font-header",
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
    images: [{ url: site.reel.poster, width: 1280, height: 720, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.reel.poster],
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
    <html lang="en" className={`${sans.variable} ${mono.variable} ${header.variable} h-full`}>
      <body className="min-h-full bg-bg">
        <PersonJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
