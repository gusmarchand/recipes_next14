import {z} from 'zod';
import { ObjectId} from "mongodb";

export const recipeSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    title: z.string(),
    category: z.string(),
    description: z.string(),
    page: z.string().optional(),
    link: z.string().optional(),
    recipeIngredient: z.string().optional(),
    book: z.instanceof(ObjectId).optional(),
    isVeggie: z.boolean(),
});

export type Recipe = z.infer<typeof recipeSchema>;

