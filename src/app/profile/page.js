"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/Progressbar";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function Profile() {
  const { signOut, user, getToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [activeBook, setActiveBook] = useState(null);

  const pageCount = activeBook?.pageCount || 0;
  const progressPercentage = (currentPage / pageCount) * 100;
  const isbn = activeBook?.isbn;

  const fetchProgressData = useCallback(async () => {
    if (!isbn) return;
    try {
      const token = await getToken();
      const response = await fetch(`${API}/${isbn}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error retrieving data:", await response.text());
        return;
      }

      const result = await response.json();
      setCurrentPage(result.currentPage);
      const weekProgress = result.currentWeekProgress.map((entry) => ({
        day: entry.weekday,
        pages: entry.pagesRead,
      }));
      setData(weekProgress);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  }, [isbn, getToken]);

  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("SignOut Error:", error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="page-container">
        <h1>My Profile</h1>
        <p>Hello {user?.primaryEmailAddress?.emailAddress || "User"}</p>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <ProgressBar />
    </main>
  );
}
