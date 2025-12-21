// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX, useEffect, useState } from "react";
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
import { Loader2, Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddBrainMarkFormSchema as formSchema } from "@/lib/formSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import useLocalStorageState from "use-local-storage-state";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BookMarkType, TagsType } from "@/type/general";
import { sleep } from "@/lib/util";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddBrainMark component as default
export default function AddBrainMark(): JSX.Element {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const [formTagId, setFormTagId] = useState<string | undefined>(undefined);
  const [tags] = useLocalStorageState<TagsType[]>("tags");
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining variables
  const tagsToRender = tags ? [...tags] : [];

  // Defining a function to handle submit event
  const submitHandler: SubmitHandler<formType> = async (data) => {
    const bookmarksToUse: BookMarkType[] = bookmarks ? [...bookmarks] : [];
    const tagsToUse = tags ? [...tags] : [];
    const bookmarkLastItemId = bookmarksToUse[bookmarksToUse.length - 1];
    const tagObj = tagsToUse.find((item) => item.id === Number(formTagId));

    const bookmarksToSet: BookMarkType[] = [
      ...bookmarksToUse,
      {
        id: bookmarksToUse.length !== 0 ? bookmarkLastItemId.id + 1 : 0,
        createdAt: new Date().toISOString(),
        url: data.url,
        why: data.reason,
        tag: tagObj,
      },
    ];

    await sleep(3000);

    setOpened(false);
    setBookmarks(bookmarksToSet);

    toast.success(
      "Mark saved! Your reason will resurface when you need it most. 🧠",
    );
  };

  // Using useEffect to reset form when dialog closes
  useEffect(() => {
    if (!opened) {
      form.reset({
        reason: "",
        url: "",
      });
    }
  }, [opened]);

  // Retruning JSX
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-between gap-3 w-full"
          variant="outline"
          size="lg"
        >
          <Plus className="text-emerald-500 shrink-0" />
          <span className="text-xs font-normal text-left truncate block flex-1">
            Add new brainmark
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Brainmark</DialogTitle>
          <DialogDescription>
            {
              "This modal lets you add a new Brainmark. Paste a URL—we'll fetch the title and preview automatically. Most importantly, write one clear sentence explaining why this link matters to you (required)."
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action="#"
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why are you saving this?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Great reference for designing calm UIs"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {tagsToRender.length !== 0 && (
              <div className="w-full">
                <FormLabel className="mb-2">Tags (optional)</FormLabel>
                <Select onValueChange={setFormTagId} value={formTagId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tagsToRender.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item.id.toString()}
                          style={{ color: item.color }}
                          className="hover:!bg-current/5"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancle</Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(submitHandler)}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus />
            )}
            Save Mark
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
