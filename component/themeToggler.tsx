// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/component/ui/tooltip";
import { Button } from "@/component/ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeTogglerProps } from "@/type/component";

// Creating and exporting ThemeToggler component as default
export default function ThemeToggler({
  className,
  tooltipSide,
  buttonVariant = "ghost",
}: ThemeTogglerProps): JSX.Element {
  // Defining hooks
  const { setTheme } = useTheme();

  // Returning JSX
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={buttonVariant}
          size={"icon-lg"}
          className={className}
          onClick={() => {
            setTheme((prev) => (prev === "dark" ? "light" : "dark"));
          }}
        >
          <SunMoon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
