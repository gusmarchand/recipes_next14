import { Collection } from 'mongodb';
import client from "@/lib/mongodb";

export const connectToCollection = async (collectionName: string): Promise<Collection> => {
    await client.connect();
    return client.db('recipes').collection(collectionName);
};