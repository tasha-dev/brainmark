// Forcing next.js to render this component as client side component
"use client";

// Codes by mahdi tasha
// Importing part
import { JSX } from "react";
import { TagProps } from "@/type/component";
import { Tag as TagIcon } from "lucide-react";
import moment from "moment";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import EditTag from "./dialog/editTag";
import DeleteTag from "./dialog/deleteTag";

// Creating and exporting Tag component as default
export default function Tag({ className, data }: TagProps): JSX.Element {
  // Returning JSX
  return (
    <Card
      className={className}
      id={`tag-${data.label}-${data.id}`}
      style={{
        color: data.color,
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-start gap-3 mb-1">
          <TagIcon className="text-current size-4 shrink-0" />
          <CardTitle>{data.label}</CardTitle>
        </div>
        <CardDescription>
          {moment(data.createdAt).format("YYYY/MM/DD HH:MM")}
        </CardDescription>
      </CardHeader>
      <CardFooter className="block space-y-3">
        <EditTag color={data.color} id={data.id} label={data.label} />
        <DeleteTag id={data.id} />
      </CardFooter>
    </Card>
  );
}
