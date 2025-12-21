// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { AppLayoutProps } from "@/type/component";
import { JSX, useState } from "react";
import SideBar from "../sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ThemeToggler from "../themeToggler";
import useLocalStorageState from "use-local-storage-state";
import { BookMarkType, TagsType } from "@/type/general";

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
}: AppLayoutProps): JSX.Element {
  // Defining hooks
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const bookmarks = useLocalStorageState<BookMarkType[]>("bookmarks", {
    defaultValue: [],
  });

  const tags = useLocalStorageState<TagsType[]>("tags", {
    defaultValue: [],
  });

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-0 overflow-hidden scrollbar-hide">
      <SideBar open={sideBarOpened} onOpenChange={setSideBarOpened} />
      <div className="transition-all duration-500 mx-auto h-dvh w-3xl">
        <div className="p-4 h-dvh overflow-auto scrollbar-hide">
          <div className="flex items-center justify-start gap-4 mb-4">
            <Button
              className="lg:hidden flex"
              size={"icon-lg"}
              variant={"secondary"}
              onClick={() => setSideBarOpened((prev) => !prev)}
            >
              <Menu />
            </Button>
            <ThemeToggler
              tooltipSide="bottom"
              buttonVariant="secondary"
              className="lg:hidden flex"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
