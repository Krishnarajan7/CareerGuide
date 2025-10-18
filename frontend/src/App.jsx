import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Careers from "./pages/Careers";
import Internships from "./pages/Internship";
import Courses from "./pages/Courses";
// import ResumeBuilder from "./pages/ResumeBuilder";
import Contact from "./pages/Contact";
import CollegeDetails from "./pages/CollegeDetails";
import NotFound from "./pages/NotFound";

import { AuthProvider, useAuth } from "@/context/AuthContext";

// New imports for FloatingButton integration
import { FloatingButton, FloatingButtonItem } from "@/components/ui/floating-button";
import { cn } from "@/lib/utils";
import { Dribbble, Facebook, Instagram, Linkedin, Plus, MessageCircle, } from "lucide-react";
import Resources from "./pages/Resources";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { ProtectedAdminWrapper } = useAuth();

  // Inline FloatingButton example (adapt items array as needed)
  const FloatingButtonExample = () => {
  const items = [
    {
      icon: <Facebook />,
      bgColor: "bg-[#1877f2]",
      link: "https://www.facebook.com/your-page",
      ariaLabel: "Follow us on Facebook",
      tooltipText: "Follow us on Facebook",
    },
    {
      icon: <Dribbble />,
      bgColor: "bg-[#ea4c89]",
      link: "https://dribbble.com/your-page",
      ariaLabel: "Follow us on Dribbble",
      tooltipText: "Follow us on Dribbble",
    },
    {
      icon: <Linkedin />,
      bgColor: "bg-[#0a66c2]",
      link: "https://www.linkedin.com/in/your-profile",
      ariaLabel: "Follow us on LinkedIn",
      tooltipText: "Follow us on LinkedIn",
    },
    {
      icon: <MessageCircle />,
      bgColor: "bg-[#25D366]",
      link: "https://whatsapp.com/channel/0029VbATpFc6RGJPUogzkP2p",
      ariaLabel: "Join WhatsApp channel for placement opportunities",
      tooltipText: "Join WhatsApp channel for placement opportunities",
    },
    {
      icon: <Instagram />,
      bgColor: "bg-gradient-to-r from-[#E4405F] to-[#F77737]",
      link: "https://www.instagram.com/your-page",
      ariaLabel: "Follow us on Instagram",
      tooltipText: "Follow us on Instagram",
    },
  ];

  return (
    <FloatingButton
      className="flex items-center justify-center h-12 w-12 rounded-full bg-[#333533] text-white z-10 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      triggerContent={<Plus size={20} aria-hidden="true" />}
      triggerAriaLabel="Open social media menu"
    >
      {items.map((item, key) => (
        <FloatingButtonItem key={key} ariaLabel={item.ariaLabel}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
              >
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center text-white/80 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                    item.bgColor
                  )}
                >
                  {React.cloneElement(item.icon, { size: 20, 'aria-hidden': true })}
                </div>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </FloatingButtonItem>
      ))}
    </FloatingButton>
  );
};

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navigation />}
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/careers" element={<Careers />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resources" element={<Resources />} />
          {/* <Route path="/resume-builder" element={<ResumeBuilder />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin login route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminWrapper>
                <Admin />
              </ProtectedAdminWrapper>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}

      {/* Integrated FloatingButton: Fixed bottom-right, hidden on admin routes */}
      {!isAdminRoute && (
        <div className="fixed bottom-4 right-4 z-50">
          <FloatingButtonExample />
        </div>
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;