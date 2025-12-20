// Forcing next.js to render this component as client side component
"use client";

// Codes by mahdi tasha
// Importing part
import { useEffect, useState } from "react";
import { UseUrlSreenShotType } from "@/type/hook";

// Creating and exporting useUrlSreenShot custom hook which uses simple fetch function and returns error, loading state and data
export default function useUrlSreenShot(url: string): UseUrlSreenShotType {
  // Defining inner hooks
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<string | undefined>(undefined);

  // main logic of the hook
  useEffect(() => {
    fetch(url)
      .then((data) => data.blob())
      .then((data) => {
        setData(URL.createObjectURL(data));
        setIsError(false);
      })
      .catch(() => {
        setData(undefined);
        setIsError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // Returning part
  return {
    data,
    isError,
    loading,
  };
}
