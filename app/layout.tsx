import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dalton Course List",
  description: "Rapidly find your desired courses with filters, add courses to your list, and save for later use.",
    metadataBase: new URL('https://dalton.bdfz.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex flex-col min-h-screen p-4 md:p-12 w-screen"
        )}
      >
        <Header />
        {children}
        <Script
          src="https://analytics.xyspg.moe/script.js"
          data-website-id="2d67dea1-d9b6-46a6-bcde-02f612591fdf"
          data-domains="dalton.bdfz.app"
          async={true}
        />
        <TailwindIndicator />
      </body>
    </html>
  );
}
