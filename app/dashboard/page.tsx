// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import BrainMark from "@/component/brainmark";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { BookMarkType } from "@/type/general";
import { JSX } from "react";
import useLocalStorageState from "use-local-storage-state";

// Creating and exporting Dashboard page as default
export default function DashboardPage(): JSX.Element {
  // Defining hooks
  const [bookmarks] = useLocalStorageState<BookMarkType[]>("bookmarks");

  // Defining variables
  const bookmarksToRender = bookmarks ? [...bookmarks] : [];

  // Returning JSX
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-medium block mb-3">Your Brainmarks</h1>
      {bookmarksToRender.length === 0 ? (
        <p className="text-2xl font-medium block leading-9 text-center">
          No Bookmarks yet <br /> your knowledge network is waiting to grow
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {bookmarksToRender.map((item, index) => (
            <BrainMark key={index} data={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
