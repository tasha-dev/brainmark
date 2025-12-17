// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { HeaderProps } from "@/type/component";
import { JSX } from "react";
import Logo from "./logo";
import ThemeToggler from "./themeToggler";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Bookmark } from "lucide-react";

// Creating and exporting Header component as default
export default function Header({ className }: HeaderProps): JSX.Element {
  // Returning JSX
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 backdrop-blur-2xl border border-foreground/10 lg:rounded-xl p-4 lg:w-2xl w-full lg:fixed lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:translate-y-4 bg-foreground/5 z-50",
        className,
      )}
    >
      <Logo className="shrink-0" />
      <div className="flex items-center justify-between gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size={"icon-lg"} variant={"ghost"}>
              <Link href="/app">
                <Bookmark />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Get started</TooltipContent>
        </Tooltip>
        <ThemeToggler />
      </div>
    </header>
  );
}
