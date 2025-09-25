import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/language-context";
import { ClerkProvider } from "@clerk/nextjs";

import QueryProvider from "@/components/query-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Skeleton from "@/components/ui/skeleton";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        >
          <QueryProvider>
            <Suspense
              fallback={
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              }
            >
              <LanguageProvider>
                {children}
                <Toaster richColors />
              </LanguageProvider>
            </Suspense>
          </QueryProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
