// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { sleep } from "@/lib/util";
import { DeleteBrainMarkProps } from "@/type/component";
import { BookMarkType } from "@/type/general";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting DeleteBrainMark component as default
export default function DeleteBrainMark({
  id,
  onOpenChange,
  open,
}: DeleteBrainMarkProps): JSX.Element {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");

  // Defining a function to handle submit event
  async function submitHandler() {
    setLoading(true);

    const bookmarksToUse = bookmarks ? [...bookmarks] : [];
    const bookmarksToSet = bookmarksToUse.filter((item) => item.id !== id);

    await sleep(3000);

    setBookmarks(bookmarksToSet);

    setLoading(false);
    onOpenChange?.(false);

    toast.success(
      "Tag deleted. Your knowledge network just got a little lighter. 🧠",
    );
  }

  // Retruning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permanently delete this brainmark?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The link, your carefully written
            reason will be permanently removed from your knowledge network.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancle</Button>
          </DialogClose>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={submitHandler}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Trash />}
            Yes, Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
