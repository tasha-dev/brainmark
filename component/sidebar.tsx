// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { SideBarProps } from "@/type/component";
import { JSX } from "react";
import { Button } from "./ui/button";
import { Brain, Code, Layers, Menu, X } from "lucide-react";
import Link from "next/link";
import AddBrainMark from "./dialog/addBrainMark";
import ThemeToggler from "./themeToggler";
import { useRouter } from "next/navigation";
import AddTag from "./dialog/addTag";

// Creating and exporting SideBar component as default
export default function SideBar({
  onOpenChange,
  open = false,
}: SideBarProps): JSX.Element {
  // Defining hooks
  const router = useRouter();

  // Returning JSX
  return (
    <div
      className={cn(
        "transition-all duration-500 bg-card border-r border-r-foreground/10 h-dvh lg:relative fixed z-50",
        !open ? "w-0" : "lg:w-1/5 w-3/4",
      )}
    >
      {onOpenChange && (
        <Button
          className="absolute left-full top-4 translate-x-4 z-50 lg:flex hidden"
          size={"icon-lg"}
          variant={"secondary"}
          onClick={() => onOpenChange(!open)}
        >
          <Menu />
        </Button>
      )}
      <ThemeToggler
        tooltipSide="right"
        buttonVariant="secondary"
        className={cn(
          "absolute left-full translate-x-4 z-50 lg:flex hidden",
          onOpenChange ? "top-18" : "top-4",
        )}
      />
      <div
        className={cn(
          "overflow-auto scrollbar-hide space-y-3 h-dvh flex items-center justify-between flex-col",
          open ? "visible" : "invisible",
        )}
      >
        <div className="h-full w-full p-4 space-y-4 overflow-auto scrollbar-hide">
          <AddTag />
          <AddBrainMark />
          <Button
            className="flex items-center justify-between gap-3 w-full"
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/dashboard");
              onOpenChange?.(false);
            }}
          >
            <Brain className="shrink-0 size-4 text-rose-500" />
            <span className="text-xs font-normal text-left truncate block flex-1">
              {"All Brainmark's"}
            </span>
          </Button>
          <Button
            className="flex items-center justify-between gap-3 w-full"
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/dashboard/tags">
              <Layers className="shrink-0 size-4 text-sky-500" />
              <span className="text-xs font-normal text-left truncate block flex-1">
                Your tags
              </span>
            </Link>
          </Button>
        </div>
        <div className="shrink-0 w-full p-4 border-t border-t-foreground/10 space-y-4">
          <Button variant={"secondary"} size={"lg"} className="w-full" asChild>
            <Link href="https://tasha.vercel.app/">
              <Code className="size-4 shrink-0 text-green-500" />
              <span className="text-xs font-normal text-left truncate block flex-1">
                Mahdi Tasha
              </span>
            </Link>
          </Button>
          {onOpenChange && (
            <Button
              variant={"destructive"}
              size={"lg"}
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="size-4 shrink-0" />
              <span className="text-xs font-normal text-left truncate block flex-1">
                Close
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
