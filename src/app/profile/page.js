"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/Progressbar";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function Profile() {
  const { signOut, user, getToken } = useAuth();
  const [data, setData] = useState([]);
  const isbn = "9783551321459";

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
      const weekProgress = result.currentWeekProgress.map((entry) => ({
        day: entry.weekday,
        pages: entry.pagesRead,
      }));
      setData(weekProgress);
    } catch (error) {
      console.error("Error retrieving data", error);
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
        <h1>My Reading Progress</h1>
        <button onClick={handleSignOut}>Logout</button>
      </div>
      <ProgressBar data={data} />
    </main>
  );
}
