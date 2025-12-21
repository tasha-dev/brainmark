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
import { Loader2, Pen, Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddTagsFormSchema as formSchema } from "@/lib/formSchema";
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
import { toast } from "sonner";
import useLocalStorageState from "use-local-storage-state";
import { BookMarkType, TagsType } from "@/type/general";
import { sleep } from "@/lib/util";
import { EditTagProps } from "@/type/component";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditTag component as default
export default function EditTag({
  color,
  label,
  id,
}: EditTagProps): JSX.Element {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const [tags, setTags] = useLocalStorageState<TagsType[]>("tags");
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: color,
      label: label,
    },
  });

  // Defining a function to handle submit event
  const submitHandler: SubmitHandler<formType> = async (data) => {
    const tagsToUse: TagsType[] = tags ? [...tags] : [];
    const bookmarksToUse: BookMarkType[] = bookmarks ? [...bookmarks] : [];

    const bookmarkToSet = bookmarksToUse.map((item) =>
      item.tag && item.tag.id === id
        ? {
            ...item,
            tag: {
              id: item.id,
              label: data.label,
              color: data.color,
              createdAt: new Date().toISOString(),
            },
          }
        : item,
    );

    const tagsToSet = tagsToUse.map((item) =>
      item.id === id
        ? {
            id: item.id,
            label: data.label,
            color: data.color,
            createdAt: new Date().toISOString(),
          }
        : item,
    );

    await sleep(3000);

    setTags(tagsToSet);
    setBookmarks(bookmarkToSet);

    setOpened(false);
    toast.success(
      "Tag updated! Your knowledge connections just got a little sharper. 🧠",
    );
  };

  // Retruning JSX
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-foreground">
          <Pen className="text-foreground" />
          Edit this tag
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>
            Edit an existing tag in your Brainmark collection. Update the name
            to better capture evolving ideas, or adjust the color for quicker
            visual recognition.
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Games to try" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag color</FormLabel>
                  <FormControl>
                    <Input placeholder="#fffff" type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
