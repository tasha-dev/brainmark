// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import BrainMark from "@/component/brainmark";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { Button } from "@/component/ui/button";
import {
  DropdownMenuRadioItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { BookMarkType } from "@/type/general";
import {} from "@radix-ui/react-dropdown-menu";
import { Filter } from "lucide-react";
import { JSX, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting Dashboard page as default
export default function DashboardPage(): JSX.Element {
  // Defining hooks
  const [bookmarks] = useLocalStorageState<BookMarkType[]>("bookmarks");
  const [filter, setFilter] = useState<"new" | "old">("new");

  // Defining variables
  const bookmarksToUse = bookmarks ? [...bookmarks] : [];
  const filtredBookmarksToRender =
    filter === "old"
      ? bookmarksToUse.sort(
          (a, b): number =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
      : bookmarksToUse.sort(
          (a, b): number =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

  // Returning JSX
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between gap-4  mb-3">
        <h1 className="text-2xl flex-1 font-medium block truncate text-left">
          Your Brainmarks
        </h1>
        {bookmarksToUse.length !== 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"lg"} className="shrink-0">
                <Filter />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="bottom" align="end">
              <DropdownMenuRadioGroup
                value={filter}
                onValueChange={(value: string) =>
                  setFilter(value as "new" | "old")
                }
              >
                <DropdownMenuRadioItem value="new">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="old">
                  Oldest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {filtredBookmarksToRender.length === 0 ? (
        <p className="text-2xl font-medium block leading-9 text-center">
          No Bookmarks yet <br /> your knowledge network is waiting to grow
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {filtredBookmarksToRender.map((item, index) => (
            <BrainMark key={index} data={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
