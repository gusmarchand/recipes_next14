import {FC} from 'react';
import Link from "next/link";

const RecipesPage: FC = async () => {

    const BASE_URL = process.env.BASE_URL;

    const data = await fetch( BASE_URL + '/api/recipes', {
        method: 'GET'});
    const recipes =  await data.json();
    return (
        <div>
        <h1>All Recipes</h1>
        <ul>
            {recipes.map((recipe : any) => (
                <li key={recipe._id} >
                    <Link href={ `/recipes/${recipe._id}` }>{recipe.title}</Link>
                </li>
            ))}
        </ul>
        </div>
    );
}

export default RecipesPage;