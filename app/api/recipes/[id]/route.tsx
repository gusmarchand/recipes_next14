import {ObjectId} from "mongodb";
import client   from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {recipeSchema} from "@/app/schemas/recipesSchema";
import {connectToCollection} from "@/lib/database";

export const GET = async (req :Request, {params}: {params : {id:string}}) => {
    try {
        const collection = await connectToCollection('recipes');
        const { id } = params;


        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const recipe = await collection.findOne({ _id: new ObjectId(id) });

        if (!recipe) {
            return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(recipe);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch the recipe" }, { status: 500 });
    }
}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const collection = await connectToCollection('recipes');

        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete the recipe" }, { status: 500 });
    }
}

export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const body = await req.json();
        const { id } = params;

        const validatedRecipe = recipeSchema.parse(body);

        const collection = await connectToCollection('recipes');

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: validatedRecipe });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update the recipe" }, { status: 500 });
    }
}