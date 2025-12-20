// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import AddTag from "@/component/dialog/addTag";
import DeleteTag from "@/component/dialog/deleteTag";
import EditTag from "@/component/dialog/editTag";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { TagsType } from "@/type/general";
import { Tag } from "lucide-react";
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
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-medium block text-left truncate">
          Your Tags
        </h1>
        <AddTag />
      </div>
      {tagsToRender.length === 0 ? (
        <p className="text-2xl font-medium block leading-9 text-center">
          No tags yet <br /> your knowledge network is waiting to grow
        </p>
      ) : (
        <div className="space-y-4">
          {tagsToRender.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 bg-current/5 border-current/15 border rounded-md py-4 px-6"
              style={{
                color: item.color,
              }}
            >
              <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden">
                <Tag className="text-current size-5 shrink-0" />
                <span className="text-base font-medium truncate block text-left text-foreground w-full">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 shrink-0">
                <EditTag color={item.color} id={item.id} label={item.label} />
                <DeleteTag id={item.id} label={item.label} />
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
