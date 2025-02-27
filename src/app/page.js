"use client";

import { useState } from "react";
import Image from "next/image";
import Item from "./item";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-black to-blue-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">NASA Explorer</h1>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link href="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
            </li>
            <li>
              <Link href="/home" className="hover:text-gray-300 transition">Home</Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-gray-300 transition">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16 sm:p-20">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NASA images..."
            className="border p-2 rounded-md w-72 text-black shadow-md"
          />
        </form>

        <main className="flex flex-col gap-8 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <Item query={query} />
        </main>
      </div>
    </>
  );
}
