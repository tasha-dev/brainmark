// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JSX, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { FileText, Loader2, Upload, X } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";
import { BookMarkType } from "@/type/general";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { cn, importBookmarks } from "@/lib/util";

// Creating and exporting ImportBookmarks component as default
export default function ImportBookmarks(): JSX.Element {
  // Defining hooks
  const [isOpen, setOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] =
    useLocalStorageState<BookMarkType[]>("bookmarks");
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "text/plain": [".html"],
      },
      multiple: false,
    });

  // Defining variables
  const bookmarksToUse = bookmarks ? [...bookmarks] : [];

  // Defining helper to remove file from the state
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Defining submit handler
  const onSubmit = async () => {
    const bookmarkLastItemId = bookmarksToUse[bookmarksToUse.length - 1];
    setUploading(true);

    const imported = await importBookmarks(
      files[0],
      bookmarksToUse.length !== 0 ? bookmarkLastItemId.id + 1 : 0,
    );

    const bookmarksToSet = [...bookmarksToUse, ...imported];

    setBookmarks(bookmarksToSet);
    toast.success("Your bookmarks have been successfully imported.");
    setUploading(false);
    setOpen(false);
  };

  // Returning JSX
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-between gap-3 w-full"
          variant="outline"
          size="lg"
          onClick={() => setOpen(true)}
        >
          <Upload className="shrink-0 size-4 text-purple-500" />
          <span className="text-xs font-normal text-left truncate block flex-1">
            Import your bookmarks
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Bookmarks</DialogTitle>
          <DialogDescription>
            To transfer your bookmarks, first export them as an HTML file, then
            select that file here.
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/30 hover:border-muted-foreground/50 hover:bg-accent/5",
            isDragReject && "border-destructive bg-destructive/5",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <FileText
              className={cn(
                "w-14 h-14",
                isDragActive ? "text-primary" : "text-muted-foreground",
              )}
            />
            <div className="space-y-2">
              {isDragActive ? (
                <p className="text-lg font-medium text-primary">
                  Drop your .html files here...
                </p>
              ) : (
                <>
                  <p className="text-lg font-medium">
                    Drag & drop <span className="text-primary">.html</span>{" "}
                    files here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse • Only plain html files are accepted
                  </p>
                </>
              )}
              {isDragReject && (
                <p className="text-sm font-medium text-destructive">
                  Sorry, only .html files are allowed
                </p>
              )}
            </div>
          </div>
        </div>
        {files.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {files.length} text file{files.length > 1 ? "s" : ""} selected
            </p>
            <div className="space-y-2">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border bg-background px-4 py-2 text-sm border-foreground/10"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(i)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancle</Button>
          </DialogClose>
          <Button disabled={uploading || files.length === 0} onClick={onSubmit}>
            {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
