// Codes by mahdi tasha
// Importing part
import { RootLayoutProps } from "@/type/component";
import type { Metadata } from "next";
import { JSX } from "react";
import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/util";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/component/ui/sonner";

// Defining metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Brainmark",
    default: "Brainmark - Never forget why you saved a link",
  },
  description:
    'Brainmark: Save links with a mandatory "why" sentence — turning forgotten bookmarks into a smart, resurfacing second brain.',
  metadataBase: new URL("https://brainmark.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brainmark",
    description:
      "Save links with purpose. Resurface them intelligently. Build lasting knowledge.",
    url: "https://brainmark.vercel.app",
    siteName: "Brainmark",
    images: [
      {
        url: "/image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brainmark - Your intelligent bookmark manager with mandatory reasons and daily resurfacing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Defining font
const OpenSansFont = Open_Sans({
  display: "block",
  style: "normal",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  // Returning JSX
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh overflow-x-hidden overflow-y-auto bg-background text-foreground",
          OpenSansFont.className,
        )}
      >
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
