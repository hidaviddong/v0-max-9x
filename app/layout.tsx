import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/language-context";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vobile MAX - Making Creative More Valuable",
  description: "Power the Future of the Creative Economy",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#f97316", // Orange color to match site theme
          colorBackground: "#000000", // Black background
          colorInputBackground: "#1f2937", // Dark gray for inputs
          colorInputText: "#ffffff", // White text
          colorText: "#ffffff", // White text
          colorTextSecondary: "#9ca3af", // Gray text
        },
        elements: {
          formButtonPrimary:
            "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
          card: "bg-black border border-gray-800",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-300",
          socialButtonsBlockButton:
            "border-gray-700 text-white hover:bg-gray-800",
          formFieldLabel: "text-white",
          footerActionLink: "text-orange-500 hover:text-orange-400",
        },
      }}
    >
      <html lang="en">
        <body
          className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        >
          {/* Wrapped children with LanguageProvider and Suspense for multi-language support */}
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageProvider>{children}</LanguageProvider>
          </Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
