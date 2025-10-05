import { createContext, useState, useContext, useEffect, useRef } from "react";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const justLoggedIn = useRef(false);

  // Check current admin session (only on /admin routes)
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      setLoading(false);
      return;
    }

    const checkAdminSession = async () => {
      try {
        const res = await api.get("/admins/me", { suppressToast: true });
        setAdmin(res.data);
      } catch {
        setAdmin(null);
        if (!justLoggedIn.current) {
          navigate("/admin/login");
        } else {
          justLoggedIn.current = false;
        }
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, [location.pathname, navigate]);

  // Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/admins/login", { email, password });
      setAdmin(res.data.admin);

      toast({
        title: "Login successful",
        description: `Welcome back, ${res.data.admin.name || "Admin"}!`,
      });

      justLoggedIn.current = true;
      navigate("/admin");
      return res;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/admins/logout", { suppressToast: true });
      setAdmin(null);
      toast({ title: "Logged out successfully" });
      navigate("/admin/login");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
