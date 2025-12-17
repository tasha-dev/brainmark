// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { AppLayoutProps } from "@/type/component";
import { JSX, useState } from "react";
import SideBar from "../sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
}: AppLayoutProps): JSX.Element {
  // Defining hooks
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-0">
      <SideBar open={sideBarOpened} onOpenChange={setSideBarOpened} />
      <div className="p-4 transition-all duration-500 mx-auto h-dvh w-3xl">
        <Button
          className="lg:hidden flex mb-4"
          size={"icon-lg"}
          variant={"secondary"}
          onClick={() => setSideBarOpened((prev) => !prev)}
        >
          <Menu />
        </Button>
        {children}
      </div>
    </div>
  );
}
