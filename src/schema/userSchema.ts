import * as z from "zod";

export interface User {
  /**
   * IDDDDD
   */
  id: number;
  /**
   * EEEMAIIIL
   */
  email: string;
  name: string;
  status?: "Happy" | "Sad";
  phoneNumbers: string[];
}

export const zUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  status: z.union([z.literal("Happy"), z.literal("Sad")]).optional(),
});
export type ZUserSchema = ReturnType<typeof zUserSchema.parse>;
