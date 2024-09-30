"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import {useEffect} from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Recipes App",
//   description: "To find the recipes you liked",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <html lang="en">
      <body className={inter.className}>
      <header className="p-4 bg-background-light dark:bg-background-dark flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipes</h1>

      </header>
        <main className="p-4">{children}</main>
      </body>
      </html>
  );
}
