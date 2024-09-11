"use client";

import { useState } from "react";
import Image from "next/image";
import climbingKoala from "../../public/climbingKoala.png";
import styles from "./Progressbar.module.css";

const initialData = [
  { day: "Mon", pages: 0 },
  { day: "Tue", pages: 0 },
  { day: "Wed", pages: 0 },
  { day: "Thu", pages: 0 },
  { day: "Fri", pages: 0 },
  { day: "Sat", pages: 0 },
  { day: "Sun", pages: 0 },
];

export default function ProgressBar() {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState("");
  const [selectedDay, setSelectedDay] = useState("Mon");
  const maxBarHeight = 150;
  const maxPages = Math.max(...data.map((entry) => entry.pages), 1);

  function updatePages() {
    const updatedData = data.map((item) =>
      item.day === selectedDay
        ? { ...item, pages: parseInt(currentPage, 10) }
        : item
    );
    setData(updatedData);
    setCurrentPage("");
  }

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          type="number"
          placeholder="Pages read"
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
        />
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
          <option value="Sun">Sunday</option>
        </select>
        <button onClick={updatePages}>Update</button>
      </div>
      <div className={styles.chartContainer}>
        {data.map((entry, index) => {
          const barHeight = (entry.pages / maxPages) * maxBarHeight;

          return (
            <div key={index} className={styles.barContainer}>
              <p>{entry.pages}</p>
              <div className={styles.bar} style={{ height: `${barHeight}px` }}>
                {barHeight > 19 && (
                  <Image
                    src={climbingKoala}
                    alt="Climbing Koala"
                    className={styles.icon}
                    // style={{ bottom: `${barHeight - 15}px` }}
                  />
                )}
              </div>

              <p>{entry.day}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
