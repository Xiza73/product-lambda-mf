import { z } from "zod";

const objectIdSize = 24;

export const ProductSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be a positive number"),
  categories: z.array(
    z
      .string()
      .refine((id) => id.length === objectIdSize && /^[0-9a-fA-F]+$/.test(id), {
        message: "Category ID must be a 24-character hexadecimal string",
      })
  ),
});
