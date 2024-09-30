'use client';
import React, {ReactNode, useEffect} from "react";
import Link from "next/link";
 const Layout = ({ children }: { children: ReactNode }) => {
    // check if children is '/recipes'
    // if so, add active class to the link


    return (
        <div>
            <Link href={"/recipes"}>
            <h2>
                Recipes
            </h2>
            </Link>
            <div>
                {children}
            </div>
        </div>
    );
};

    export default Layout;

