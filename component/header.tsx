// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { HeaderProps } from "@/type/component";
import { JSX } from "react";
import Logo from "./logo";
import ThemeToggler from "./themeToggler";
import { Button } from "./ui/button";
import Link from "next/link";

// Creating and exporting Header component as default
export default function Header({ className }: HeaderProps): JSX.Element {
  // Returning JSX
  return (
    <header
      className={cn("flex items-center justify-between gap-3", className)}
    >
      <Logo className="shrink-0" />
      <div className="flex items-center justify-between gap-3">
        <Button asChild size={"lg"} variant={"ghost"}>
          <Link href="/app">Get Started</Link>
        </Button>
        <ThemeToggler />
      </div>
    </header>
  );
}
