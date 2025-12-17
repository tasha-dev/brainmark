// Codes by mahdi tasha
// Importing part
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
    <>
      {hasHeader && <Header />}
      <div className="max-w-3xl min-h-dvh mx-auto p-4">
        <main className={className}>{children}</main>
      </div>
    </>
  );
}
