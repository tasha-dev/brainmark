// Codes by mahdi tasha
// Importing part
import BeamBg from "@/component/beamBg";
import Container from "@/component/layout/container";
import Hero from "@/component/section/home/hero";
import { JSX } from "react";

// Creating and exporting HomePage as default
export default function HomePage(): JSX.Element {
  // Returning JSX
  return (
    <>
      <BeamBg className="absolute left-0 top-0 w-dvw h-dvh pointer-events-none lg:block hidden origin-center" />
      <div className="absolute left-0 top-0 w-full h-dvh pointer-events-none bg-linear-to-b from-transparent via-transparent to-background lg:block hidden" />
      <Container hasHeader>
        <Hero />
      </Container>
    </>
  );
}
