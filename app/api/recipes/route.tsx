import client from "@/lib/mongodb";
import {NextResponse, NextRequest} from "next/server";
import { recipeSchema, Recipe} from "@/app/schemas/recipesSchema";
import {connectToCollection} from "@/lib/database";
import {ObjectId} from "mongodb";

export const GET = async () => {
    try {
        const collection = await connectToCollection('recipes');
        const recipes = await collection.find({}).toArray();
        return NextResponse.json(recipes);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({error: "An error occurred"},{status: 500});
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();

        const rawFormData = {
            title: data.title,
            category: data.category,
            description: data.description,
            page: data.page,
            link: data.link,
            recipeIngredients: data.recipeIngredients,
            book: new ObjectId(data.bookId),
            isVeggie: data.isVeggie
        };
        const validatedRecipe = recipeSchema.parse(rawFormData);

        const collection = await connectToCollection('recipes');
        const result = await collection.insertOne(validatedRecipe);
        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (error : any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}






