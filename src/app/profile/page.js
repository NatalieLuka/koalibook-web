"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/Progressbar";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function Profile() {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);

  const fetchProgressData = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${API}/totals/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error retrieving data:", await response.text());
        return;
      }

      const result = await response.json();
      const totalProgress = result.totals.map((entry) => ({
        day: entry.weekday,
        pages: entry.pagesRead,
      }));
      setData(totalProgress);
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  }, [getToken]);

  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  return (
    <main>
      <Navbar />
      <div className="page-container">
        <h1>My Reading Progress</h1>
        <ProgressBar data={data} />
      </div>
    </main>
  );
}
