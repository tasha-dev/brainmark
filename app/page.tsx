// Codes by mahdi tasha
// Importing part
import Container from "@/component/layout/container";
import { JSX } from "react";

// Creating and exporting HomePage as default
export default function HomePage(): JSX.Element {
  // Returning JSX
  return (
    <Container hasHeader>
      <h1>Hello world</h1>
    </Container>
  );
}
