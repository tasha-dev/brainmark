// Codes by mahdi tasha
// Importing part
import { z } from "zod";

// Creating and exporting form schemas for diffrent forms
export const AddBrainMarkFormSchema = z.object({
  url: z
    .string({
      message: "Please fill this field.",
    })
    .url(),
  reason: z
    .string({
      message: "Please fill this field.",
    })
    .min(5, {
      message: "This field has to be at least 5 characters in lenght.",
    })
    .max(256, {
      message: "This field has to be at most 256 characters in lenght.",
    }),
});
