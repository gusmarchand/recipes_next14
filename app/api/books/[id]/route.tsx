import {ObjectId} from "mongodb";
import client   from "@/lib/mongodb";
import {NextResponse} from "next/server";
import {bookSchema} from "@/app/schemas/booksSchema";
import {connectToCollection} from "@/lib/database";

export const GET = async (req :Request, {params}: {params : {id:string}}) => {
    try {
        const { id } = params;
        const collection = await connectToCollection('books');
        const book = await collection.findOne({ _id: new ObjectId(id) });

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }


        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json(book);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch the book" }, { status: 500 });
    }
}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const { id } = params;
        const collection = await connectToCollection('books');

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete the book" }, { status: 500 });
    }
}

export const PUT = async (req: Request, {params}: {params: {id: string}}) => {
    try {
        const body = await req.json();
        const { id } = params;
        const validatedBook = bookSchema.parse(body);
        const collection = await connectToCollection('books');

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: validatedBook });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update the book" }, { status: 500 });
    }
}