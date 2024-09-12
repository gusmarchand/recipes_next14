'use client';
import {useParams} from "next/navigation";

const RecipePage = () => {
    const  id = useParams()?.id ;
    console.log(id);
    return (
        <div>
        <h1>Recipe Page {id}</h1>
        </div>
    );
}

export default RecipePage;