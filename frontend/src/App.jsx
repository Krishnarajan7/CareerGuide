import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Careers from "./pages/Careers";
import Courses from "./pages/Courses";
import ResumeBuilder from "./pages/ResumeBuilder";
import Contact from "./pages/Contact";
import CollegeDetails from "./pages/CollegeDetails";
import NotFound from "./pages/NotFound";

import { AuthProvider, useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { ProtectedAdminWrapper } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navigation />}
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
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
