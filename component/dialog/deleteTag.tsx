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
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import useLocalStorageState from "use-local-storage-state";
import { BookMarkType, TagsType } from "@/type/general";
import { sleep } from "@/lib/util";
import { DeleteTagProps } from "@/type/component";

// Creating and exporting DeleteTag component as default
export default function DeleteTag({ id }: DeleteTagProps): JSX.Element {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useLocalStorageState<TagsType[]>("tags");
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");

  // Defining a function to handle submit event
  async function submitHandler() {
    setLoading(true);

    const tagsToUse = tags ? [...tags] : [];
    const bookmarksToUse = bookmarks ? [...bookmarks] : [];

    const tagsToSet = tagsToUse.filter((item) => item.id !== id);
    const bookmarksToSet = bookmarksToUse.filter((item) => item.tag?.id === id);

    await sleep(3000);

    setTags(tagsToSet);
    setBookmarks(bookmarksToSet);

    setLoading(false);
    setOpened(false);

    toast.success(
      "Tag deleted. Your knowledge network just got a little lighter. 🧠",
    );
  }

  // Retruning JSX
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-foreground w-full">
          <Trash className="text-foreground" />
          Delete this Tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this tag permanently?</DialogTitle>
          <DialogDescription>
            {
              "You're about to delete the tag. This will remove it from all included brainmarks and cannot be undone."
            }
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
            Yes, Delete Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
