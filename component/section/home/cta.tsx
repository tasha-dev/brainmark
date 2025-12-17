// Codes by mahdi tasha
// Importing part
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { JSX } from "react";

// Creating and exporting CTA section of home page as default
export default function CTA(): JSX.Element {
  // Returning JSX
  return (
    <section className="lg:h-dvh flex items-center justify-center">
      <div>
        <h3 className="text-2xl font-medium block mb-5 leading-8 text-center">
          End <span className="font-bold">Bookmark</span> <br />
          <span className="font-bold"> Graveyards</span> forever
        </h3>
        <Button asChild className="w-fit mx-auto flex" size={"lg"}>
          <Link href="/dashboard">{"Get Started — It's Free"}</Link>
        </Button>
      </div>
    </section>
  );
}
