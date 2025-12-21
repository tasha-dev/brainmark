// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import BrainMark from "@/component/brainmark";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { BookMarkType } from "@/type/general";
import { JSX, use } from "react";
import useLocalStorageState from "use-local-storage-state";
import { decode } from "@/lib/util";
import { BookMarkOfTagPageProps } from "@/type/component";

// Creating and exporting BookMarkOfTag page as default
export default function BookMarkOfTag({
  params,
}: BookMarkOfTagPageProps): JSX.Element {
  // Defining hooks
  const { encodedTag } = use(params);
  const [bookmarks] = useLocalStorageState<BookMarkType[]>("bookmarks");

  // Defining variables
  const decodedVal = decode(encodedTag);
  const bookmarksToRender = bookmarks ? [...bookmarks] : [];
  const filtredBoomarks = bookmarksToRender.filter(
    (item) => item.tag?.label === decodedVal.title,
  );

  // Returning JSX
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-medium block mb-3">
        Your Brainmarks with Tag of {`"${decodedVal.title}"`}
      </h1>
      {filtredBoomarks.length === 0 ? (
        <p className="text-2xl font-medium block leading-9 text-center">
          No Bookmarks yet <br /> your knowledge network is waiting to grow
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {filtredBoomarks.map((item, index) => (
            <BrainMark key={index} data={item} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
