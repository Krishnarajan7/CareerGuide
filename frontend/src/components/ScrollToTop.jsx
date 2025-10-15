import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 bg-background overflow-hidden">
      <div className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Diagonal Line */}
        <div className="relative w-[100%] h-[3px] flex items-center">
          <div
            className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-secondary"
            style={{
              transform: "skewY(-1deg)",
              transformOrigin: "left",
            }}
            
          />
          {/* Scroll Button */}
          <div className="absolute right-6 -translate-y-0 sm:-translate-y-4 md:-translate-y-3.5 flex flex-col items-center group">
            <button
              onClick={scrollToTop}
              className="relative z-10 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-background border-2 md:border-[3px] border-primary hover: transition-colors duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
            <span className="text-xs md:text-sm font-medium text-secondary whitespace-nowrap group-hover:text-primary/80 transition-colors duration-300 mt-1">
              Boost me<br className="md:hidden" /> to Top
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollToTop;
