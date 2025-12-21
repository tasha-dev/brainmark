// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, SearchIcon, Tag } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/component/ui/command";
import { Kbd } from "./ui/kbd";
import { BookMarkType, TagsType } from "@/type/general";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { useRouter } from "next/navigation";

// Creating and exporting Search component as default
export default function Search(): JSX.Element {
  // Defining hooks
  const [open, setOpen] = useState<boolean>(false);
  const [bookmarks] = useLocalStorageState<BookMarkType[]>("bookmarks");
  const [tags] = useLocalStorageState<TagsType[]>("tags");
  const router = useRouter();

  // Defining variables
  const bookmarksToRender = bookmarks ? [...bookmarks] : [];
  const tagsToRender = tags ? [...tags] : [];

  // Using useEffect to open and close component via adding event listener to dom
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Returning JSX
  return (
    <>
      <Button
        className="flex items-center justify-between gap-3 w-full px-4"
        variant="outline"
        size="lg"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden">
          <SearchIcon className="shrink-0 size-4 text-lime-500" />
          <span className="text-xs font-normal text-left truncate block flex-1">
            Search
          </span>
        </div>
        <div className="flex items-center justify-between gap-1 shrink-0">
          <Kbd>Ctrl</Kbd>
          <span>+</span>
          <Kbd>K</Kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search through your brainmarks and tags" />
        <CommandList>
          {bookmarksToRender.length !== 0 ? (
            <CommandGroup heading="Brainmarks">
              {bookmarksToRender.map((item, index) => (
                <CommandItem
                  key={index}
                  className="flex items-center justify-between gap-3"
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/dashboard/#brainmark-${item.id}`);
                  }}
                >
                  <div className="flex items-center justify-between gap-3 overflow-hidden flex-1">
                    <Bookmark className="size-4 shrink-0" />
                    <span className="block truncate text-left flex-1">
                      {item.url}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <span className="text-muted-foreground text-sm text-right block mb-1">
                      {moment(item.createdAt).format("YYYY/MM/DD")}
                    </span>
                    <span className="text-muted-foreground text-xs text-right block">
                      {`ID : ${item.id}`}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No Brainmark found.</CommandEmpty>
          )}
        </CommandList>
        <CommandSeparator />
        <CommandList>
          {tagsToRender.length !== 0 ? (
            <CommandGroup heading="Tags">
              {tagsToRender.map((item, index) => (
                <CommandItem
                  key={index}
                  className="flex items-center justify-between gap-3"
                  onSelect={() => {
                    setOpen(false);
                    router.push(
                      `/dashboard/tags/#tag-${item.label}-${item.id}`,
                    );
                  }}
                  style={{
                    color: item.color,
                  }}
                >
                  <div className="flex items-center justify-between gap-3 overflow-hidden flex-1">
                    <Tag className="size-4 shrink-0 text-current" />
                    <span className="block truncate text-left flex-1">
                      {item.label}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <span className="text-muted-foreground text-sm text-right block mb-1">
                      {moment(item.createdAt).format("YYYY/MM/DD")}
                    </span>
                    <span className="text-muted-foreground text-xs text-right block">
                      {`ID : ${item.id}`}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No Tags found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
