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
  themeColor: "#0a0a0f"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T9KY79TYK4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-T9KY79TYK4');`
          }}
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TNK4FPN5');` }} />
        {/* End Google Tag Manager */}
        <meta name="google-adsense-account" content="ca-pub-4300319598686746" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4300319598686746" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNK4FPN5" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
