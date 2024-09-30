import client from "@/lib/mongodb";
import {bookSchema} from "@/app/schemas/booksSchema";
import {connectToCollection} from "@/lib/database";
import {NextResponse, NextRequest} from "next/server";

export const GET = async () => {
    try {
        const collection = await connectToCollection('books');
        const books = await collection.find({}).toArray();
        return NextResponse.json(books);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({error: "An error occurred"},{status: 500});
    }
}


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const rawFormData = {
            title: body.title,
            author: body.author,
            description: body.description,
            imgUrl: body.img,
            recipes: body.recipes,
        }

        const validatedBook = bookSchema.parse(rawFormData);

        const collection = await connectToCollection('books');
        const result = await collection.insertOne(validatedBook);
        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (error : any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
