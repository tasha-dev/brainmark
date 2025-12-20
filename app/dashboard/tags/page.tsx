// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import DeleteTag from "@/component/dialog/deleteTag";
import EditTag from "@/component/dialog/editTag";
import DashboardLayout from "@/component/layout/dashboardLayout";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { TagsType } from "@/type/general";
import { Tag } from "lucide-react";
import moment from "moment";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting Tags page as default
export default function TagsPage(): JSX.Element {
  // Defining hooks
  const [tags] = useLocalStorageState<TagsType[]>("tags");

  // Defining variables
  const tagsToRender: TagsType[] = tags ? [...tags] : [];

  // Returning JSX
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-medium block mb-3">Your Tags</h1>
      {tagsToRender.length === 0 ? (
        <p className="text-2xl font-medium block leading-9 text-center">
          No tags yet <br /> your knowledge network is waiting to grow
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {tagsToRender.map((item, index) => (
            <Card
              key={index}
              style={{
                color: item.color,
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-start gap-3 mb-1">
                  <Tag className="text-current size-4 shrink-0" />
                  <CardTitle>{item.label}</CardTitle>
                </div>
                <CardDescription>
                  {moment(item.createdAt).format("YYYY/MM/DD HH:MM")}
                </CardDescription>
              </CardHeader>
              <CardFooter className="block space-y-3">
                <EditTag color={item.color} id={item.id} label={item.label} />
                <DeleteTag id={item.id} label={item.label} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
