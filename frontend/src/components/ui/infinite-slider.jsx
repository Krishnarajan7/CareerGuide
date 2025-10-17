"use client";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export const InfiniteSliderHorizontal = ({ items, reverse = false, speed = 50 }) => {
  const baseX = useRef(0);
  const containerRef = useRef(null);

  useAnimationFrame((t, delta) => {
    if (containerRef.current) {
      // Adjust scroll direction and speed (pixels per second)
      baseX.current += ((reverse ? 1 : -1) * delta * (speed / 1000));
      containerRef.current.style.transform = `translateX(${baseX.current}px)`;

      const firstItem = containerRef.current.firstChild;
      if (firstItem) {
        const firstItemWidth = firstItem.getBoundingClientRect().width;
        // When first item fully leaves view, move it to end (loop)
        if (baseX.current <= -firstItemWidth) {
          baseX.current += firstItemWidth;
          containerRef.current.appendChild(firstItem);
        } else if (baseX.current >= 0) {
          baseX.current -= firstItemWidth;
          containerRef.current.prepend(containerRef.current.lastChild);
        }
      }
    }
  });

  return (
    <div className="overflow-hidden w-full py-4">
      <div ref={containerRef} className="flex whitespace-nowrap">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-2 sm:mx-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 transition-transform hover:scale-110"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-contain opacity-80 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
