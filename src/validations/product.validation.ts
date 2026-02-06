import { z } from "zod";
import { categories } from "../utils/category";

export const ProductSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  category: z.enum(categories),
  description: z.string(),
  image: z.string(),
  discount: z.number().positive().optional(),
  discountEndTime: z.string().optional(),
});

export type ProductPayload = z.infer<typeof ProductSchema>;
