// Codes by mahdi tasha
// Importing part
import { BookMarkType } from "@/type/general";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

// Creating and exporting utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function copyToClipboard(value: string): Promise<boolean> {
  await navigator.clipboard.writeText(value);
  toast.success(`The value is copied to your clipboard.`);

  return true;
}

export function encode(id: number, title: string): string {
  const base64 = btoa(JSON.stringify({ id, title }));

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decode(value: string): {
  id: number;
  title: string;
} {
  let base64 = value.replace(/-/g, "+").replace(/_/g, "/");

  // restore padding
  const pad = base64.length % 4;
  if (pad) {
    base64 += "=".repeat(4 - pad);
  }

  return JSON.parse(atob(base64));
}

export function generateBookmarksHTML(bookmarks: BookMarkType[]) {
  const htmlStart = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>`;

  const htmlEnd = `</DL><p>`;

  const htmlBody = bookmarks
    .map(
      (bm) =>
        `<DT><A HREF="${bm.url}" ADD_DATE="${Math.floor(
          new Date(bm.createdAt).getTime() / 1000,
        )}">${bm.why}</A>`,
    )
    .join("\n");

  return `${htmlStart}\n${htmlBody}\n${htmlEnd}`;
}

export function downloadBookmarks(bookmarks: BookMarkType[]) {
  const htmlContent = generateBookmarksHTML(bookmarks);
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "bookmarks.html"; // filename
  link.click();

  URL.revokeObjectURL(url);
}

export function importBookmarks(
  file: File,
  firstId: number,
): Promise<BookMarkType[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");

      const links = Array.from(doc.querySelectorAll("a"));
      const bookmarks: BookMarkType[] = links.map((link, index) => ({
        url: link.getAttribute("href") || "",
        why: link.textContent || "",
        createdAt:
          (link.getAttribute("add_date")
            ? new Date(
                parseInt(link.getAttribute("add_date") || "0") * 1000,
              ).toISOString()
            : new Date().toISOString()) || "",
        id: firstId + (index + 1),
      }));

      resolve(bookmarks);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
}
