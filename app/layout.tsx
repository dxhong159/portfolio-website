import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { LanguageProvider } from "@/context/language-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AIChat } from "@/components/ai-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dinh Xuan Hong | Front-end Developer",
  description: "Portfolio of Dinh Xuan Hong, a passionate Front-end Developer",
  generator: "v0.dev",
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
