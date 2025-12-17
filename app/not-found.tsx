// Codes by mahdi tasha
// Importing part
import Container from "@/component/layout/container";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { JSX } from "react";

// Creating and exporting NotFoundPage as default
export default function NotFoundPage(): JSX.Element {
  // Returning JSX
  return (
    <Container
      hasHeader
      hasFooter={false}
      className="lg:h-[calc(100dvh-32px)] flex items-center justify-center"
    >
      <div>
        <h1 className="lg:text-4xl text-2xl font-medium lg:text-center block mb-3">
          404: Mark Not Resurfaced
        </h1>
        <p className="text-lg font-normal leading-7 block lg:text-center mb-5">
          {
            "Oops—your brain couldn't quite recall this page. It might be a broken link, or perhaps it's hiding in the depths of forgotten bookmarks. Don't worry; even the best minds lose track sometimes."
          }
        </p>
        <Button asChild className="lg:w-fit w-full lg:mx-auto flex" size={"lg"}>
          <Link href="/">Return to Brainmark</Link>
        </Button>
      </div>
    </Container>
  );
}
