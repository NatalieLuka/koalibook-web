"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function Books() {
  const { getToken } = useAuth();
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log("Error loading books:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [getToken]);

  return (
    <main>
      <Navbar />
      <div className="page-container">
        <ul className="books-list">
          {books.map((book) => (
            <li className="book-card" key={book.isbn}>
              {/* eslint-disable-next-line */}
              <img className="image" src={book.image} alt={book.title} />
              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <button onClick={() => router.push(`/books/${book.isbn}`)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
