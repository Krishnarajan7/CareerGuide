"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Shuffle logos randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Distribute logos evenly across columns
const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

// Single column of logos (animation)
const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 2000; // 2 seconds per logo
  const columnDelay = index * 200; // stagger columns
  const adjustedTime =
    (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);

  const currentLogo = useMemo(() => logos[currentIndex], [logos, currentIndex]);

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}
        >
          <img
            src={currentLogo.img}
            alt={currentLogo.name}
            className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = "LogoColumn";

// Main carousel component — now supports 2 rows (top:3, bottom:2)
export function LogoCarousel({ logos }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  useEffect(() => {
    // Split logos between top (3) and bottom (2)
    const topDistributed = distributeLogos(logos, 3);
    const bottomDistributed = distributeLogos(logos, 2);
    setLogoSets([topDistributed, bottomDistributed]);
  }, [logos]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Top row (3 columns) */}
      <div className="flex justify-center space-x-4">
        {logoSets[0]?.map((logos, index) => (
          <LogoColumn
            key={`top-${index}`}
            logos={logos}
            index={index}
            currentTime={currentTime}
          />
        ))}
      </div>

      {/* Bottom row (2 columns, centered) */}
      <div className="flex justify-center space-x-6">
        {logoSets[1]?.map((logos, index) => (
          <LogoColumn
            key={`bottom-${index}`}
            logos={logos}
            index={index + 3} // offset index to stagger animations differently
            currentTime={currentTime}
          />
        ))}
      </div>
    </div>
  );
}

export { LogoColumn };
