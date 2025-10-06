import { createContext, useState, useContext, useEffect, useRef } from "react";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const skipNextSessionCheck = useRef(false);

  //Check current admin session
  useEffect(() => {
    if (
      skipNextSessionCheck.current ||
      !location.pathname.startsWith("/admin") ||
      location.pathname === "/admin/login"
    ) {
      skipNextSessionCheck.current = false;
      setLoading(false);
      return;
    }

    const checkAdminSession = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admins/me", { suppressToast: true });
        setAdmin(res.data);
      } catch {
        setAdmin(null);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, [location.pathname, navigate]);

  //Login
  const login = async (email, password) => {
    try {
      //suppressToast added here to prevent duplicate toast
      const res = await api.post(
        "/admins/login",
        { email, password },
        { suppressToast: true }
      );

      await wait(900);
      setAdmin(res.data.admin);

      skipNextSessionCheck.current = true;

      toast({
        title: "Login successful",
        description: `Welcome back, ${res.data.admin.name || "Admin"}!`,
      });

      navigate("/admin");
      return res;
    } catch (error) {
      await wait(500);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  //Logout
  const logout = async () => {
    try {
      //Properly pass suppressToast in config
      await api.post("/admins/logout", {}, { suppressToast: true });
      await wait(700);
      setAdmin(null);

      toast({
        title: "Logged out successfully",
        description: "Redirecting to login page...",
      });

      navigate("/admin/login");
    } catch (error) {
      await wait(700);
      toast({
        title: "Logout failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  //Protected wrapper
  const ProtectedAdminWrapper = ({ children }) => {
    if (loading)
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground">Checking session...</p>
          </div>
        </div>
      );

    if (!admin) {
      navigate("/admin/login");
      return null;
    }

    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, ProtectedAdminWrapper }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
