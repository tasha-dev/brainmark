// Codes by mahdi tasha
// Importing part
import { JSX } from "react";

// Creating and exporting Hero of home page as default
export default function Hero(): JSX.Element {
  // Returning JSX
  return (
    <section className="lg:h-dvh lg:flex lg:items-center lg:justify-center relative">
      <div className="lg:w-xl w-full text-foreground">
        <h1 className="lg:text-4xl text-2xl font-medium lg:text-center block mb-3 lg:leading-12 leading-8">
          Never <span className="font-bold">Forget</span> <br /> why you saved a
          <span className="font-bold"> Link</span> again
        </h1>
        <p className="text-lg font-normal leading-7 block lg:text-center">
          Brainmark forces you to write one sentence explaining <em>why</em> —
          turning forgotten bookmarks into a smart, resurfacing second brain.
        </p>
      </div>
    </section>
  );
}
