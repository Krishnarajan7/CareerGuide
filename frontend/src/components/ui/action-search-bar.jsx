"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { searchColleges } from "@/data/mockColleges";
import { Search, Send, MapPin, GraduationCap } from "lucide-react";

// Debounce hook
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Highlight helper
const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200 px-0.5 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

function ActionSearchBar({
  onCollegeSelect,
  placeholder = "Search colleges, courses & career guidance...",
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      return;
    }

    if (!debouncedQuery.trim()) {
      const popularColleges = searchColleges("", "", "").slice(0, 6);
      setResult({ colleges: popularColleges });
      return;
    }

    setIsSearching(true);
    const colleges = searchColleges(debouncedQuery, "", "");
    setResult({ colleges: colleges.slice(0, 8) });
    setIsSearching(false);
  }, [debouncedQuery, isFocused]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!result || !isFocused) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < result.colleges.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : result.colleges.length - 1
        );
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        e.preventDefault();
        const selected = result.colleges[highlightIndex];
        handleCollegeClick(selected);
      } else if (e.key === "Escape") {
        setIsFocused(false);
      }
    },
    [result, isFocused, highlightIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleCollegeClick = (college) => {
    setSelectedCollege(college);
    setQuery(college.name);
    setIsFocused(false);
    onCollegeSelect?.(college);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-full max-w-2xl mx-auto" ref={containerRef}>
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-1">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Discover Your Future
            </h3>
            <p className="text-sm text-muted-foreground">
              Search from 50,000+ colleges, courses & career opportunities
            </p>
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={() => {
                setSelectedCollege(null);
                setIsFocused(true);
              }}
              className="h-12 pl-4 pr-12 text-base rounded-xl bg-card border-border/150 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                type="button"
                onClick={() => {
                  if (query.trim()) {
                    console.log("Searching for:", query);
                    // 🔹 You can trigger your search logic here
                  }
                }}
                className="cursor-pointer p-1 rounded-md hover:bg-muted transition"
              >
                <AnimatePresence mode="popLayout">
                  {query.length > 0 ? (
                    <motion.div
                      key="send"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send className="w-5 h-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence>
            {isFocused && result && !selectedCollege && (
              <motion.div
                className="w-full border border-border/50 rounded-xl shadow-lg overflow-hidden bg-card mt-2"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul className="max-h-80 overflow-y-auto">
                  {result.colleges.length > 0 ? (
                    result.colleges.map((college, idx) => (
                      <motion.li
                        key={college.id}
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-all duration-200 border-b border-border/30 last:border-b-0 ${
                          idx === highlightIndex
                            ? "bg-primary/10"
                            : "hover:bg-muted/50"
                        }`}
                        variants={item}
                        layout
                        onClick={() => handleCollegeClick(college)}
                      >
                        <div className="flex items-center gap-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground text-sm">
                              {highlightText(college.name, query)}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{college.location}</span>
                              <span>•</span>
                              <span>{college.type}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {college.type}
                        </Badge>
                      </motion.li>
                    ))
                  ) : (
                    <motion.li
                      className="px-4 py-8 text-center text-muted-foreground"
                      variants={item}
                    >
                      {isSearching ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Searching colleges...
                        </div>
                      ) : (
                        "No colleges found for your search"
                      )}
                    </motion.li>
                  )}
                </motion.ul>
                <div className="px-4 py-3 border-t border-border/30 bg-muted/30 text-xs text-muted-foreground flex justify-between">
                  <span>
                    {query.trim()
                      ? `${result.colleges.length} colleges found`
                      : "Popular colleges"}
                  </span>
                  <span>↑ ↓ to navigate • Enter to select • Esc to cancel</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export { ActionSearchBar };
