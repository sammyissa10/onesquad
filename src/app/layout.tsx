import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "OneSquad - Your Digital Partner",
    template: "%s | OneSquad",
  },
  description:
    "OneSquad is a one-stop-shop digital agency helping small-to-midsize businesses unlock their full potential in the digital world. Web design, SEO, social media marketing, and more.",
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
    title: "OneSquad - Your Digital Partner",
    description:
      "A one-stop-shop digital agency for small-to-midsize businesses to unlock their full potential in the digital world.",
    images: ["/onesquadlogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneSquad - Your Digital Partner",
    description:
      "A one-stop-shop digital agency for small-to-midsize businesses.",
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
      <body className={`${nunito.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <ScrollToTop />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
