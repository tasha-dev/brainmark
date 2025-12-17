// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { ContainerProps } from "@/type/component";
import { JSX } from "react";
import Header from "../header";

// Creating and exporting Container component as default
export default function Container({
  children,
  className,
  hasHeader = true,
}: ContainerProps): JSX.Element {
  // Returning JSX
  return (
    <div className={cn("max-w-3xl min-h-dvh mx-auto p-4", className)}>
      {hasHeader && <Header className="mb-5" />}
      <main>{children}</main>
    </div>
  );
}
