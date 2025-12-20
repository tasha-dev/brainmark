// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { toast } from "sonner";
import { BookMarkType, TagsType } from "@/type/general";
import { sleep } from "@/lib/util";
import { EditBrainMarkProps } from "@/type/component";
import { Textarea } from "../ui/textarea";
import useLocalStorageState from "use-local-storage-state";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditBrainMark component as default
export default function EditBrainMark({
  data,
  onOpenChange,
  open,
}: EditBrainMarkProps): JSX.Element {
  // Defining hooks
  const [tags] = useLocalStorageState<TagsType[]>("tags");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: data.why,
      url: data.url,
    },
  });

  // Defining variables
  const tagsToRender = tags ? [...tags] : [];

  // Defining a function to handle submit event
  const submitHandler: SubmitHandler<formType> = async (data) => {
    await sleep(3000);
    onOpenChange?.(false);
    toast.success(
      "Brainmark updated! Your refined reason will guide stronger resurfacing. 🧠",
    );
  };

  // Retruning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Brainmark</DialogTitle>
          <DialogDescription>
            {
              "Edit an existing brainmark to refine its details. Update the URL if needed, evolve your 'why' sentence as insights deepen, and adjust tags for stronger connections."
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
                <Select
                  onValueChange={(val) => setFormTags((prev) => [...prev, val])}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tagsToRender.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item.label}
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
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
