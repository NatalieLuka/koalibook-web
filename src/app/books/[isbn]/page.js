"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function BookDetailPage() {
  const router = useRouter();
  const { isbn } = useParams();
  const { getToken } = useAuth();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookDetails() {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await fetch(`${API}/${isbn}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error loading book details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isbn) {
      loadBookDetails();
    }
  }, [isbn, getToken]);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div>
      <div className="page-container">
        <div className="book-detail-container">
          {book.image !== "22" && book.image ? (
            // eslint-disable-next-line
            <img
              className="book-detail-image"
              src={book.image}
              alt={book.title}
            />
          ) : (
            // eslint-disable-next-line
            <Image
              className="book-detail-image"
              src={"/noBookImage.png"}
              alt="Koala Placeholder"
              width={400}
              height={400}
            />
          )}
          <div className="book-detail-content">
            <h1>{book.title}</h1>
            <p className="author">by {book.author}</p>
            <p>{book.description}</p>
            <button onClick={() => router.push("/books")}>Back to Books</button>
          </div>
        </div>
      </div>
    </div>
  );
}
