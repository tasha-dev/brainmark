// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";
import { BookMarkType } from "@/type/general";
import { downloadBookmarks } from "@/lib/util";

// Creating and exporting DownloadBookmarks component as default
export default function DownloadBookmarks(): JSX.Element {
  // Defining hooks
  const [bookmarks] = useLocalStorageState<BookMarkType[]>("bookmarks");

  // Defining variables
  const bookmarksToUse = bookmarks ? [...bookmarks] : [];

  // Returning JSX
  return (
    <Button
      className="flex items-center justify-between gap-3 w-full"
      variant="outline"
      size="lg"
      disabled={bookmarksToUse.length === 0}
      onClick={() =>
        bookmarksToUse.length !== 0 && downloadBookmarks(bookmarksToUse)
      }
    >
      <Download className="shrink-0 size-4 text-orange-500" />
      <span className="text-xs font-normal text-left truncate block flex-1">
        Download your brainmarks
      </span>
    </Button>
  );
}
