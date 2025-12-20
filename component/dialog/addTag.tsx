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
import { Loader2, Plus, Tag } from "lucide-react";
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
import { TagsType } from "@/type/general";
import { sleep } from "@/lib/util";

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddTag component as default
export default function AddTag(): JSX.Element {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const [tags, setTags] = useLocalStorageState<TagsType[]>("tags");
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining a function to handle submit event
  const submitHandler: SubmitHandler<formType> = async (data) => {
    const tagsToUse = tags ? [...tags] : [];
    const tagsToSet: TagsType[] = [
      ...tagsToUse,
      {
        color: data.color,
        createdAt: new Date().toISOString(),
        id: tagsToUse.length + 1,
        label: data.label,
      },
    ];

    await sleep(3000);
    setTags(tagsToSet);
    setOpened(false);
    toast.success(
      "Tag created! Start applying it to your marks for better organization. 🌈",
    );
  };

  // Using useEffect to reset form when dialog closes
  useEffect(() => {
    if (!opened) {
      form.reset({
        color: "",
        label: "",
      });
    }
  }, [opened]);

  // Retruning JSX
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-between gap-3 w-fit shrink-0"
          variant="outline"
          size="lg"
        >
          <Tag className="text-cyan-500 shrink-0" />
          <span className="text-xs font-normal text-left truncate block flex-1">
            Create a New Tag
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Tag</DialogTitle>
          <DialogDescription>
            {
              "Create a new tag to organize your brainmarks. Give it a meaningful name—like 'react' or 'inspiration'—and optionally choose a color for quick visual recognition"
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
            Create Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
