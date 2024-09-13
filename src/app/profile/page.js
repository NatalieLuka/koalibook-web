"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/Progressbar";

const API = `${process.env.NEXT_PUBLIC_API_URL}/books`;

export default function Profile() {
  const { signOut, user, getToken } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
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

  const updatePages = async () => {
    try {
      const token = await getToken();

      const response = await fetch(`${API}/${isbn}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPage: parseInt(currentPage, 10),
        }),
      });

      if (response.ok) {
        setActiveBook({
          ...activeBook,
          currentPage: parseInt(currentPage, 10),
        });
        setModalVisible(false);
      } else {
        console.error("Fehler: Die Daten konnten nicht aktualisiert werden.");
      }
    } catch (error) {
      console.error("Fehler beim Senden der Daten:", error);
    }
  };

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
        {activeBook ? (
          <div className="active-book-container">
            {/* <img
              src={activeBook.image || "/noBookImage.png"}
              alt={activeBook.title}
              className="book-image"
            /> */}
            <div className="book-details">
              <h2>{activeBook.title}</h2>
              <p>
                Page: {currentPage} / {pageCount}
              </p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <button onClick={() => setModalVisible(true)}>Update</button>
            </div>
          </div>
        ) : (
          <p>No active book selected.</p>
        )}

        {/* Modal for updating pages */}
        {isModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h3>Update Current Page</h3>
              <input
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
                placeholder="Enter new page number"
              />
              <div className="modal-buttons">
                <button onClick={updatePages}>Update</button>
                <button onClick={() => setModalVisible(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <ProgressBar />
      </div>
    </main>
  );
}
