"use client";

import Image from "next/image";

export default function TodaysPick() {
  const books = [
    {
      title: "Psychology of Money",
      img: "/books/psychologyofmoney.jpg",
    },
    {
      title: "Dog Man The Scarlet Sheder",
      img: "/books/dogman.jpg",
    },
    {
      title: "Rurouni Kenshin",
      img: "/books/kenshin.jpg",
    },
    {
      title: "Crime and Punishment",
      img: "/books/crime.jpg",
    },
  ];

  return (
    <section className="bg-white text-black py-16 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">
          Today's Pick
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col items-center"
            >
              <Image
                src={book.img}
                alt={book.title}
                width={200}
                height={280}
                className="rounded mb-4 object-cover"
              />
              <h3 className="text-sm md:text-base font-medium mb-4">
                {book.title}
              </h3>
              <button className="bg-green-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-green-500 transition">
                Borrow
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
