// Codes by mahdi tasha
// Importing part
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
