// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import DashboardLayout from "@/component/layout/dashboardLayout";
import { JSX } from "react";

// Creating and exporting Dashboard page as default
export default function DashboardPage(): JSX.Element {
  // Returning JSX
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-medium block mb-3">Your Brainmarks</h1>
    </DashboardLayout>
  );
}
