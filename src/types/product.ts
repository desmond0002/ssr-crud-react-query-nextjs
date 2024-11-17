import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Название обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  price: z.number().positive("Цена должна быть положительным числом"),
  discountedPrice: z.number().positive("Цена со скидкой должна быть положительным числом").optional(),
  sku: z.string().min(1, "Артикул обязателен"),
  photo: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
