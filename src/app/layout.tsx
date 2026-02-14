import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SmoothScrollProvider } from "@/lib/providers/SmoothScrollProvider";
import { siteConfig } from "@/lib/constants";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "OneSquad - Unlock Your Digital Potential",
    template: "%s | OneSquad",
  },
  description:
    "OneSquad is a digital agency for small and midsize businesses. We handle web design, search optimization, social media marketing, hosting, and more — all under one roof.",
  keywords: [
    "digital agency",
    "web design",
    "SEO",
    "social media marketing",
    "digital marketing",
    "small business",
    "SMB",
    "website hosting",
    "e-commerce",
  ],
  authors: [{ name: "OneSquad" }],
  creator: "OneSquad",
  icons: {
    icon: "/onesquadlogo.png",
    apple: "/onesquadlogo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.onesquads.com",
    siteName: "OneSquad",
    title: "OneSquad - Unlock Your Digital Potential",
    description:
      "A digital agency for small and midsize businesses looking to grow online. Web design, marketing, hosting, and support — all in one place.",
    images: ["/onesquadlogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneSquad - Unlock Your Digital Potential",
    description:
      "A digital agency for small and midsize businesses. Web design, marketing, and support — all in one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('onesquad-theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/onesquadlogo.png`,
              email: siteConfig.email,
              description: siteConfig.description,
              sameAs: Object.values(siteConfig.socials),
            }),
          }}
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
            <ScrollToTop />
            <ChatWidget />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
