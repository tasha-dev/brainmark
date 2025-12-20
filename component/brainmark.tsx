// Forcing next.js to render this component as client side component
"use client";

// Codes by mahdi tasha
// Importing part
import { JSX } from "react";
import { cn } from "@/lib/util";
import { BrainMarkProps } from "@/type/component";
import { Tag } from "lucide-react";
import moment from "moment";
import { Badge } from "@/component/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";

// Creating and exporting BrainMark component as default
export default function BrainMark({
  className,
  data,
}: BrainMarkProps): JSX.Element {
  // Returning JSX
  return (
    <Card className={cn("pt-0 overflow-hidden", className)}>
      <div className="h-[150px] bg-foreground w-full relative overflow-hidden"></div>
      <CardHeader>
        <CardTitle className="truncate">{data.url}</CardTitle>
        <CardDescription>{data.why}</CardDescription>
        <span className="text-muted-foreground text-xs">
          {moment(data.createdAt).format("YYYY/MM/DD HH:MM")}
        </span>
      </CardHeader>
      {data.tags && (
        <CardFooter>
          {data.tags.map((item, index) => (
            <Badge
              key={index}
              className="bg-current/10 border border-current/15 text-current"
              style={{
                color: item.color,
              }}
            >
              <Tag />
              <span>{item.label}</span>
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
