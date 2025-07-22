import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookOpen,
  FileText,
  Phone,
  Home,
  Rocket,
  Menu,
  X,
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Resume Builder", href: "/resume-builder", icon: FileText },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href) => location.pathname === href;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Block scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-gradient-to-r from-primary/20 to-secondary/20 shadow-2xl"
            : "bg-background/90 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-primary to-secondary p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CareerGuide
                </span>
                <span className="text-xs text-muted-foreground/70 -mt-1">
                  Professional Growth
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center bg-muted/30 backdrop-blur-sm rounded-full p-2 border border-border/80">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 group ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.name}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg -z-10"></div>
                  )}  
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                asChild
              >
                <Link to="/register">Register</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/dashboard" className="flex items-center space-x-2">
                  <Rocket className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-center hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute w-5 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`absolute w-5 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute w-5 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ${
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl transform transition-all duration-500">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gradient-to-r from-primary/20 to-secondary/20">
              <Link
                to="/"
                className="flex items-center space-x-3 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    CareerGuide
                  </span>
                  <span className="text-xs text-muted-foreground/70 -mt-0.5">
                    Professional Growth
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 p-6">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-white/20"
                          : "bg-muted/30 group-hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-base">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-8 pt-6 border-t border-gradient-to-r from-primary/20 to-secondary/20 space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                  asChild
                >
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <span className="ml-2">Register</span>
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
                  asChild
                >
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Rocket className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
