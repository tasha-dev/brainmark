// Codes by mahdi tasha
// Importing part
import { RootLayoutProps } from "@/type/component";
import type { Metadata } from "next";
import { JSX } from "react";
import { Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/util";

// Defining metadata
export const metadata: Metadata = {
  title: "",
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
          "min-h-dvh overflow-x-hidden overflow-y-auto",
          OpenSansFont.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
