"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import koalaPlaceholder from "../../../public/noBookImage.png";
import Image from "next/image";

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
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.log("Error loading books:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [getToken]);

  const handleRemoveBook = async (isbn) => {
    try {
      const token = await getToken();
      const deleteResponse = await fetch(`${API}/${isbn}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (deleteResponse.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
        alert("Book removed from your list.");
      } else {
        alert("Failed to remove book from your list.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while removing the book.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="page-container">
        <ul className="books-list">
          {books.map((book) => (
            <li className="book-card" key={book.isbn}>
              {book.image !== "22" && book.image ? (
                <img className="image" src={book.image} alt={book.title} />
              ) : (
                <Image src={"/noBookImage.png"} width={200} height={200} />
              )}

              <h2>{book.title}</h2>
              <p>by {book.author}</p>
              <button onClick={() => router.push(`/books/${book.isbn}`)}>
                View Details
              </button>
              <button onClick={() => handleRemoveBook(book.isbn)}>
                Remove Book
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
