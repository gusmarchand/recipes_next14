'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Recipe } from "@/app/schemas/recipesSchema";

const RecipePage = () => {
    const { id } = useParams() as { id: string };
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await fetch(`/api/recipes/${id}`);
            const recipeData = await response.json();
            setRecipe(recipeData);
        };
        fetchRecipe();
    }, [id]);

    return (
        <div>
            <h1>{recipe?.title}</h1>
        </div>
    );
};

export default RecipePage;