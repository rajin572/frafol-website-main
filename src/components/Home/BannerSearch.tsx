"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

// Hero search. Sends the visitor to the creators list with the typed text (?search=).
const BannerSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = value.trim();
    router.push(term ? `/professionals?search=${encodeURIComponent(term)}` : "/professionals");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-lg shadow-secondary-color/10 ring-1 ring-base-color/10 transition focus-within:ring-2 focus-within:ring-secondary-color/40"
    >
      <FiSearch aria-hidden className="size-5 shrink-0 text-base-color/50" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Hľadajte fotografa alebo kameramana..."
        aria-label="Hľadať fotografov a kameramanov"
        className="min-w-0 flex-1 bg-transparent py-2 text-sm sm:text-base font-medium text-base-color placeholder:text-base-color/45 outline-none"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-full bg-secondary-color px-5 sm:px-7 py-2.5 text-sm sm:text-base font-bold text-white transition hover:bg-secondary-color/90 active:scale-95"
      >
        Hľadať
      </button>
    </form>
  );
};

export default BannerSearch;
