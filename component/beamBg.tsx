// Forcing next.js to render this component as client side component
"use client";

// Codes by mahdi tasha
// Importing part
import { JSX } from "react";
import { BeamBgProps } from "@/type/component";
import Beams from "./ui/beams";

// Creating and exporting BeamBg component as default
export default function BeamBg({ className }: BeamBgProps): JSX.Element {
  // Returning JSX
  return (
    <div className={className}>
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={45}
      />
    </div>
  );
}
