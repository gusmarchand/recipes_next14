import {z} from 'zod';

export const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    imgUrl: z.string(),
    description: z.string(),
    recipes: z.array(z.string()),
});

export type Book = z.infer<typeof bookSchema>;

