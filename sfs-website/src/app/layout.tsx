import type { Metadata } from "next";
import { Outfit, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sinduja Fancy Store | Kalawana – All You Need, All in One Place",
  description:
    "Sinduja Fancy Store is your one-stop family retail shop in Kalawana, Sri Lanka. Browse school items, fancy goods, teddy bears, tech accessories, gifts & more.",
  keywords: [
    "Sinduja Fancy Store",
    "Kalawana shop",
    "school items Kalawana",
    "fancy store Sri Lanka",
    "teddy bears",
    "tech accessories",
    "gift items",
    "stationery",
  ],
  authors: [{ name: "Sinduja Fancy Store" }],
  creator: "Sinduja Fancy Store",
  openGraph: {
    title: "Sinduja Fancy Store | Kalawana",
    description:
      "Your favorite family retail store in Kalawana. School items, fancy goods, gifts, tech accessories & much more!",
    url: "https://sindujafancy.lk",
    siteName: "Sinduja Fancy Store",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinduja Fancy Store | Kalawana",
    description:
      "All You Need, All in One Place – Visit Sinduja Fancy Store in Kalawana, Sri Lanka.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://sindujafancy.lk"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${notoSinhala.variable} ${notoTamil.variable} h-full`}>
      <head>
        {/* Schema.org LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Sinduja Fancy Store",
              description:
                "Family retail store selling school items, fancy goods, teddy bears, tech accessories, gifts and more in Kalawana, Sri Lanka.",
              url: "https://sindujafancy.lk",
              telephone: "+94764177746",
              address: {
                "@type": "PostalAddress",
                streetAddress: "No. 27, Bus Stand",
                addressLocality: "Kalawana",
                addressCountry: "LK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.53,
                longitude: 80.38,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "08:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
