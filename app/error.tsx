// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Container from "@/component/layout/container";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import { JSX } from "react";

// Creating and exporting ErrorPage as default
export default function ErrorPage(): JSX.Element {
  // Returning JSX
  return (
    <Container
      hasHeader
      hasFooter={false}
      className="lg:h-[calc(100dvh-32px)] flex items-center justify-center"
    >
      <div>
        <h1 className="lg:text-4xl text-2xl font-medium lg:text-center block mb-3">
          Neural Overload
        </h1>
        <p className="text-lg font-normal leading-7 block lg:text-center mb-5">
          {
            "Something unexpected happened on our end—your Brainmark just hit a temporary glitch while trying to resurface or save a mark. We're already working to fix it, like clearing a foggy synapse."
          }
        </p>
        <Button
          className="lg:w-fit w-full lg:mx-auto flex"
          size={"lg"}
          onClick={() => window.location.reload()}
        >
          Refresh the page
        </Button>
      </div>
    </Container>
  );
}
