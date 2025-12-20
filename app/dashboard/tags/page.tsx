// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import DashboardLayout from "@/component/layout/dashboardLayout";
import Tag from "@/component/tag";
import { TagsType } from "@/type/general";
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
            <Tag key={index} data={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
