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
