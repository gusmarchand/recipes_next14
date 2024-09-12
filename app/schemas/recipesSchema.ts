import {z} from 'zod';

export const recipeSchema = z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    page: z.number(),
    link: z.string(),
    recipeIngredient: z.array(z.string()),
    book: z.string(),
    isVeggie: z.boolean(),
});

export type Recipe = z.infer<typeof recipeSchema>;

