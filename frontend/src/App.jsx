import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageLoader from "./components/PageLoader";
import { usePageLoader } from "./hooks/usePageLoader";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Careers from "./pages/Careers";
import Courses from "./pages/Courses";
import ResumeBuilder from "./pages/ResumeBuilder";
import Contact from "./pages/Contact";
import CollegeDetails from "./pages/CollegeDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const isLoading = usePageLoader();
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader key="page-loader" />}
        </AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;