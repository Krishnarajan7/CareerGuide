import React, { useState } from 'react';

const InfiniteCarousel = ({ 
  items, 
  speed = 'normal',
  className = '',
  direction = 'left',
  pauseOnHover = true
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const speedClasses = {
    slow: direction === 'left' ? 'animate-[scroll-left_35s_linear_infinite]' : 'animate-[scroll-right_35s_linear_infinite]',
    normal: direction === 'left' ? 'animate-[scroll-left_20s_linear_infinite]' : 'animate-[scroll-right_20s_linear_infinite]',
    fast: direction === 'left' ? 'animate-[scroll-left_10s_linear_infinite]' : 'animate-[scroll-right_10s_linear_infinite]'
  };

  return (
    <div 
      className={`relative overflow-hidden group bg-gradient-to-r from-muted/20 via-background to-muted/20 rounded-xl border border-border/20 ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Modern gradient overlays */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <div className="py-6">
        <div className={`flex space-x-12 ${speedClasses[speed]} ${isPaused ? 'animation-paused' : ''}`}>
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:brightness-110">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;