import React, { useEffect, useRef, useState } from 'react';

const InfiniteCarousel = ({ 
  items, 
  speed = 'normal',
  className = '',
  direction = 'left',
  pauseOnHover = true,
  ariaLabel = 'logos carousel',
  showControls = true
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  const speedClasses = {
    slow: direction === 'left' ? 'animate-[scroll-left_35s_linear_infinite]' : 'animate-[scroll-right_35s_linear_infinite]',
    normal: direction === 'left' ? 'animate-[scroll-left_20s_linear_infinite]' : 'animate-[scroll-right_20s_linear_infinite]',
    fast: direction === 'left' ? 'animate-[scroll-left_10s_linear_infinite]' : 'animate-[scroll-right_10s_linear_infinite]'
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const onKeyDown = (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden group bg-gradient-to-r from-muted/20 via-background to-muted/20 rounded-xl border border-border/20 ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
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

      {showControls && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
          <button
            type="button"
            className="pointer-events-auto h-8 w-8 rounded-full bg-background/80 border border-border text-foreground shadow-sm hover:bg-background transition inline-flex items-center justify-center"
            aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
            onClick={() => setIsPaused((p) => !p)}
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M8 5v14l11-7z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteCarousel;