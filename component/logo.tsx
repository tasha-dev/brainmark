// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { LogoProps } from "@/type/component";
import Image from "next/image";
import LogoImage from "@/image/logo.png";
import { JSX } from "react";
import Link from "next/link";

// Creating and exporting Logo component as default
export default function Logo({ className }: LogoProps): JSX.Element {
  // Returning JSX
  return (
    <Link
      href="https://tasha.vercel.app"
      className={cn(
        "flex items-center h-10 overflow-hidden justify-start gap-3 group",
        className,
      )}
    >
      <Image
        alt={"BrainMark Logo"}
        width={100}
        height={100}
        className="size-10 shrink-0 dark:invert-100"
        src={LogoImage.src}
      />
      <div className="h-10 group-focus:-translate-y-full group-hover:-translate-y-full transition-transform duration-500">
        <div className="h-10 flex items-center">
          <span className="font-bold text-base text-left truncate block text-foreground">
            Brain Mark
          </span>
        </div>
        <div className="h-10 flex items-center">
          <p className="font-medium text-sm text-left truncate block text-foreground">
            Made By <span className="font-bold">Mahdi Tasha</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
