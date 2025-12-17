// Codes by mahdi tasha
// Importing part
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { JSX } from "react";

// Defining data of featues
const data: {
  title: string;
  description: string;
}[] = [
  {
    title: "Mandatory 'Why' Sentence",
    description:
      "You can't save a link without writing one sentence explaining why. This simple rule anchors context, so future-you instantly remembers its value.",
  },
  {
    title: "Intelligent Daily Resurfacing",
    description:
      "Saved links intelligently reappear for quick review, using spaced repetition principles to reinforce memory and keep knowledge fresh.",
  },
  {
    title: "Build Your Neural Knowledge Network",
    description:
      "Reasons and tags connect your saves into a personal brain-like web, turning scattered bookmarks into lasting, interconnected insights.",
  },
  {
    title: "Clean, Distraction-Free Experience",
    description:
      "No ads, no clutter—just a minimalist interface focused on your marks, helping you think clearer and stay productive.",
  },
];

// Creating and exporting Features section of home page as default
export default function Features(): JSX.Element {
  // Returning JSX
  return (
    <section>
      <h3 className="text-2xl font-medium block mb-5 lg:leading-12 leading-8">
        How it works
      </h3>
      <div className="grid lg:grid-cols-2 lg:gap-6 gap-4">
        {data.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="size-10 mb-4 flex items-center justify-center rounded-md bg-foreground/10 text-foreground border border-foreground/10 text-xs font-normal">
                {(index + 1).toString().padStart(2, "0")}
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
