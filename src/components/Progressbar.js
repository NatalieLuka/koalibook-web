"use client";

import Image from "next/image";
import climbingKoala from "../../public/climbingKoala.png";
import styles from "./Progressbar.module.css";

export default function ProgressBar({ data = [] }) {
  const maxBarHeight = 150;
  const maxPages = Math.max(...data.map((entry) => entry.pages), 1);

  return (
    <>
      <div className={styles.chartContainer}>
        {data.map((entry, index) => {
          const barHeight = (entry.pages / maxPages) * maxBarHeight;

          return (
            <div key={index} className={styles.barContainer}>
              <p className={styles.entryPages}>{entry.pages}</p>
              <div className={styles.bar} style={{ height: `${barHeight}px` }}>
                {barHeight > 19 && (
                  <Image
                    src={climbingKoala}
                    alt="Climbing Koala"
                    className={styles.icon}
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
