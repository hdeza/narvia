import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://narvia.com.co"),
  title:
    "NarvIA - Soluciones en IA, Realidad Aumentada y Automatización Empresarial",
  description:
    "NarvIA ofrece soluciones personalizadas de inteligencia artificial, bots empresariales, automatización de procesos, realidad aumentada, y desarrollo de apps para múltiples sectores.",
  keywords: [
    "GPT personalizado",
    "bot para empresa",
    "automatización de procesos",
    "inteligencia artificial empresarial",
    "realidad aumentada para empresas",
    "machine learning Colombia",
    "apps empresariales",
    "soluciones tecnológicas para salud",
    "software educativo",
    "BI y analítica de datos",
    "NarvIA",
  ],
  authors: [{ name: "NarvIA", url: "https://narvia.com.co" }],
  creator: "NarvIA",
  publisher: "NarvIA",
  openGraph: {
    title: "NarvIA - Tu asistente inteligente empresarial",
    description:
      "Transforma tu empresa con IA, RPA, apps móviles, analítica avanzada y realidad aumentada. Descubre cómo NarvIA puede llevar tu negocio al siguiente nivel.",
    url: "https://narvia.com.co",
    siteName: "NarvIA",
    images: [
      {
        url: "/narviaLogoSEO.webp",
        width: 1200,
        height: 630,
        alt: "NarvIA - Asistentes Inteligentes y Soluciones Tecnológicas",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NarvIA",
    url: "https://narvia.com",
    logo: "https://narvia.com/logo.png",
    description:
      "Soluciones de inteligencia artificial, bots GPT, automatización, y realidad aumentada para empresas.",
    sameAs: [
      "https://www.linkedin.com/company/narvia",
      "https://twitter.com/narvia_oficial",
      "https://facebook.com/narvia",
    ],
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.className}`}>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
