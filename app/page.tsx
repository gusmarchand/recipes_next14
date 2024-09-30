"use client"
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Search from "@/app/components/search/Search";
import s from "./Home.module.css";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    const router = useRouter();

    return (
        <div className={s.center}>
            <div className={s.searchBar}>
                <Search />
            </div>

            <div className={s.content}>
                    <h1 className={s.heading}>
                        Les Recettes{" "}
                        <Image
                            className={s.image}
                            src="/salad.png"
                            alt="salad"
                            width={30}
                            height={30}
                        />
                    </h1>
                    <div className={s.hstack}>
                        <button
                            className={s.button}
                            onClick={() => router.push("/recipes")}
                        >
                            Les recettes
                        </button>
                        <button
                            className={s.button}
                            onClick={() => router.push("/recipes/new")}
                        >
                            Ajouter une recette
                        </button>
                    </div>

                    <h1 className={s.heading}>
                        Les Livres{" "}
                        <Image  className={s.image} src="/book.png" alt="book" width={30} height={30} />
                    </h1>
                    <div className={s.hstack}>
                        <button
                            className={s.button}
                            onClick={() => router.push("/books")}
                        >
                            Les livres
                        </button>
                        <button
                            className={s.button}
                            onClick={() => router.push("/books/new")}
                        >
                            Ajouter un livre
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default Home;
