import {z} from 'zod';
import {ObjectId} from "mongodb";

export const bookSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    title: z.string(),
    author: z.string(),
    imgUrl: z.string(),
    description: z.string(),
    recipes: z.array(z.string()),
});

export type Book = z.infer<typeof bookSchema>;

