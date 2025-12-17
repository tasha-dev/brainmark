// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { FooterProps } from "@/type/component";
import { JSX } from "react";
import Logo from "./logo";

// Creating and exporting Footer component as default
export default function Footer({ className }: FooterProps): JSX.Element {
  // Returning JSX
  return (
    <footer
      className={cn(
        "border border-foreground/10 p-4 w-full bg-foreground/5 mt-10",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl flex items-center justify-between gap-3 lg:flex-row flex-col">
        <Logo className="shrink-0" />
        <p className="font-normal text-sm text-right truncate">
          © 2025 Mahdi Tasha. Built for curious minds.
        </p>
      </div>
    </footer>
  );
}
