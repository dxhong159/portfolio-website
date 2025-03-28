import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { LanguageProvider } from "@/context/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AIChat } from "@/components/ai-chat";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://dinhhong.vercel.app"; // Điền URL trang web của bạn

export const metadata: Metadata = {
  title: "Dinh Xuan Hong | Front-end Developer",
  description: "Portfolio of Dinh Xuan Hong, a passionate Front-end Developer",
  generator: "v0.dev",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Dinh Xuan Hong | Front-end Developer",
    description:
      "Portfolio of Dinh Xuan Hong, a passionate Front-end Developer",
    url: siteUrl,
    siteName: "Dinh Xuan Hong Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/emoji.png",
        width: 600,
        height: 600,
        alt: "Dinh Xuan Hong Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinh Xuan Hong | Front-end Developer",
    description:
      "Portfolio of Dinh Xuan Hong, a passionate Front-end Developer",
    images: ["/emoji.png"],
    creator: "@dinhhong",
  },
  icons: {
    icon: "/logo_pi.png",
    shortcut: "/logo_pi.png",
    apple: "/logo_pi.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <AIChat />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
