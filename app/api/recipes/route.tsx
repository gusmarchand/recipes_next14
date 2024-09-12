import client from "@/lib/mongodb";
import {NextResponse, NextRequest} from "next/server";
import { recipeSchema, Recipe} from "@/app/schemas/recipesSchema";
import {connectToCollection} from "@/lib/database";

export const GET = async () => {
    try {
        const collection = await connectToCollection('recipes');
        const recipes = await collection.find({}).toArray();
        console.log(recipes);
        return NextResponse.json(recipes);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({error: "An error occurred"},{status: 500});
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const validatedRecipe = recipeSchema.parse(body);

        const collection = await connectToCollection('recipes');
        const result = await collection.insertOne(validatedRecipe);
        console.log(result);
        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (error : any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}






