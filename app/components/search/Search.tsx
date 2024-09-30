"use client"


import { useState, useEffect, useRef, FC } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/app/schemas/booksSchema";
import { Recipe } from "@/app/schemas/recipesSchema";
import {normalize} from "@/lib/utils";
import s from "@/app/components/search/Search.module.css";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
    const [data, setData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter(); // Utilisation de useRouter pour la navigation

    const handlePressSuggestion = (id: string, items: string) => {
        setSearchTerm("");
        setShowModal(false);
        inputRef?.current?.blur();
        router.push(`/${items}/${id}`);
    };

    useEffect(() => {
        if (searchTerm.length > 0) setShowModal(true);
        else setShowModal(false);
    }, [searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/recipes", { method: "GET" });
            const recipes :  Recipe[] = await res.json();

            const resBooks = await fetch("/api/books", { method: "GET" });
            const books: Book[] = await resBooks.json();

            setData([...recipes, ...books]);
        };
        fetchData();
    }, []);

    return (
        <>
            <div style={{ position: "relative", width: "100%" }}>
                <label htmlFor="search-input">Recherche de recettes, livres, auteurs...</label>
                <input
                    id="search-input"
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Utilisation de e.target.value
                    placeholder="Rechercher"
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                />
            </div>

            {showModal && (
                <div className={s.searchResults}>
                    {data
                        .filter((val) => {
                            return (
                                normalize(val?.title).includes(normalize(searchTerm)) ||
                                normalize(val?.author).includes(normalize(searchTerm))
                            );
                        })
                        .map((val) => {
                            const item = val?.author ? "books" : "recipes";
                            const type = val?.author ? "Livre" : "Recette";

                            return (
                                <div key={val._id} className={s.searchResult}>
                  <span
                      onClick={() => {
                          handlePressSuggestion(val._id, item);
                      }}
                      style={{ cursor: "pointer" }}
                  >
                    {val.title || val.author} -{" "}
                      <span className={s.tagText}>{type}</span>
                  </span>
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
};


export default Search;