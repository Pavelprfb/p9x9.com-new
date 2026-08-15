import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.websiteName} - ${siteConfig.hadding}`,
    template: `%s - ${siteConfig.websiteName}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  applicationName: siteConfig.websiteName,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.websiteName,
    title: `${siteConfig.websiteName} - ${siteConfig.hadding}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.img, width: 800, height: 450, alt: siteConfig.websiteName }]
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.websiteName,
    title: `${siteConfig.websiteName} - ${siteConfig.hadding}`,
    description: siteConfig.description,
    images: [siteConfig.img]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: { icon: siteConfig.img },
  formatDetection: { telephone: false }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0f"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
