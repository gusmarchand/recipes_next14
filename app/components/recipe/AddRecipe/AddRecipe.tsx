'use client'
import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import s from "@/app/newrecipe/page.module.css";
import type { Book } from "@/app/schemas/booksSchema";

const AddRecipe = () => {
    const BASE_URL = process.env.BASE_URL;
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch('/api/books', { method: 'GET' });
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);


    const newRecipe = async (formData: FormData) => {
        const rawFormData = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            page: formData.get('page'),
            link: formData.get('link'),
            recipeIngredients: formData.get('ingredients'),
            book: formData.get('bookId')?.toString(),
            isVeggie: formData.get('isVeggie') === 'on'
        };

        const res = await fetch('/api/recipes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawFormData)
        });
        if (res.ok) {
            redirect("/recipes");
        }
    };

    return (
        <div className={s.formContainer}>
            <h1 className={s.title}>Nouvelle recette</h1>
            <form action={newRecipe}>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="title">Titre</label>
                    <input className={`${s.formInput} bg-white`} id="title" name="title" type="text" required={true} />
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="category">Catégorie</label>
                    <select className={s.formInput} id="category" name="category">
                        <option value="" disabled selected hidden>Choisir la catégorie</option>
                        <option value="starter">Entrée</option>
                        <option value="main">Plat</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Boisson</option>
                    </select>
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="description">Description</label>
                    <textarea className={s.formTextarea} id="description" name="description" rows={4} />
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="page">Page</label>
                    <input className={s.formInput} id="page" name="page" type="number" />
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="link">Lien</label>
                    <input className={s.formInput} id="link" name="link" type="text" />
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="ingredients">Ingrédients</label>
                    <input className={s.formInput} id="ingredients" name="ingredients" type="text" />
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="bookId">Livre</label>
                    <select className={s.formInput} id="bookId" name="bookId">
                        <option value="" disabled selected>Choisir le livre</option>
                        {books.map(book => (
                            <option key={book?._id?.toString()} value={book?._id?.toString()}>{book.title}</option>
                        ))}
                    </select>
                </div>
                <div className={s.formGroup}>
                    <label className={s.formLabel} htmlFor="isVeggie">Végétarien</label>
                    <div className={s.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="isVeggie"
                                value="oui"
                                className={s.formRadio}
                            />
                            Oui
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="isVeggie"
                                value="non"
                                className={s.formRadio}
                            />
                            Non
                        </label>
                    </div>
                </div>
                <button type="submit" className={s.submitButton}>Soumettre</button>
            </form>
        </div>
    );
};

export default AddRecipe;