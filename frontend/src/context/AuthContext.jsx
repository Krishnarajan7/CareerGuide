import { createContext, useState, useContext, useEffect, useRef } from "react";
import api from "../api/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Admin state (kept exactly as-is)
  const [admin, setAdmin] = useState(() => {
    // Load admin from localStorage on app start
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  // User state (new, frontend-only for registration)
  const [user, setUser] = useState(() => {
    // Load user from localStorage on app start
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const skipNextSessionCheck = useRef(false);

  // Derived user authenticated state (for home page and downloads)
  const isAuthenticated = !!user;

  // Check current admin session on admin routes (kept exactly as-is)
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
        localStorage.setItem("admin", JSON.stringify(res.data));
      } catch {
        setAdmin(null);
        localStorage.removeItem("admin");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, [location.pathname, navigate]);

  // Admin Login function (kept exactly as-is)
  const login = async (email, password) => {
    try {
      const res = await api.post(
        "/admins/login",
        { email, password },
        { suppressToast: true }
      );

      await wait(900);
      setAdmin(res.data.admin);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
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

  // Admin Logout function (kept exactly as-is)
  const logout = async () => {
    try {
      await api.post("/admins/logout", {}, { suppressToast: true });
      await wait(700);
      setAdmin(null);
      localStorage.removeItem("admin");

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

  // Protected admin wrapper (kept exactly as-is)
  const ProtectedAdminWrapper = ({ children }) => {
    useEffect(() => {
      if (!loading && !admin) navigate("/admin/login");
    }, [loading, admin, navigate]);

    if (loading)
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground">Checking session...</p>
          </div>
        </div>
      );

    if (!admin) return null;

    return <>{children}</>;
  };

  // Google Sheets script URLs (for user registration)
  const scriptURLs = {
    "college-joining":
      "https://script.google.com/macros/s/AKfycbx9p-rZnIWCoMMbf2hYhFlVWsiDlWXE-ikdIGgo_4sSSsBvF9xohvIJAZIiUkqHkggW/exec",
    "college-student":
      "https://script.google.com/macros/s/AKfycbz-xlzBpAUJI-bnQxRr2HTIO63XeHL7-feP945iYDn-Cmug1utcMsLtK_j5Pyx50LBV/exec",
    "fresher":
      "https://script.google.com/macros/s/AKfycbw2dssdElD_siMCzFbBKGuxJ039I6egX8lhO4xuGEDk4V2tJfw7gwq4yP7Y5Oh0DjlbHQ/exec",
  };

  // User Register function (frontend-only, handles Google Sheets submission)
  const register = async (formData, userType) => {
    try {
      await wait(900); // Simulate initial delay

      // Prepare payload and script URL based on userType
      let payload = new FormData();
      let scriptURL = "";

      if (userType === "college-joining") {
        scriptURL = scriptURLs["college-joining"];
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("district", formData.district);
        payload.append("cutoff", formData.cutoff);
        payload.append("school", formData.school);
      } else if (userType === "college-student") {
        scriptURL = scriptURLs["college-student"];
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("college", formData.college);
        payload.append("department", formData.department);
        payload.append("cgpa", formData.cgpa);
        payload.append("job", formData.interestedJob);
        payload.append("training", formData.trainingType);
      } else if (userType === "fresher") {
        scriptURL = scriptURLs["fresher"];
        payload.append("name", formData.name);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("skills", formData.skills);
        payload.append("projects", formData.fresherExperience);
        payload.append("experience", formData.experience);
        payload.append("currentCompany", formData.currentCompany);
        payload.append("resumeLink", formData.resumeLink);
      } else {
        throw new Error("Invalid user type");
      }

      // Submit to Google Sheets
      const response = await fetch(scriptURL, {
        method: "POST",
        body: payload,
      });

      const result = await response.json();

      if (result.result !== "success") {
        throw new Error(result.message || "Error saving to Google Sheets");
      }

      // On success: Create user object and "authenticate" (unlock downloads)
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        userType, // Store for potential future use
        registeredAt: new Date().toISOString(),
        ...formData, // Include all form data
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast({
        title: "Registration Successful!",
        description:
          "Your data has been saved successfully to Google Sheets. You can now download college lists!",
      });

      navigate("/"); // Redirect to home
      return { data: { user: newUser } };
    } catch (error) {
      await wait(500);
      toast({
        title: "Registration Failed",
        description:
          error.message || "There was an issue submitting your data. Please try again later.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // User Logout function (frontend-only, optional but useful)
  const userLogout = async () => {
    try {
      await wait(700); // Simulate network delay
      setUser(null);
      localStorage.removeItem("user");

      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });

      navigate("/");
    } catch (error) {
      await wait(700);
      toast({
        title: "Logout failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Protected user wrapper (new, for future user-protected routes)
  const ProtectedUserWrapper = ({ children }) => {
    useEffect(() => {
      if (!loading && !isAuthenticated) navigate("/register");
    }, [loading, isAuthenticated, navigate]);

    if (loading)
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground">Checking session...</p>
          </div>
        </div>
      );

    if (!isAuthenticated) return null;

    return <>{children}</>;
  };

  const value = {
    // Admin (kept exactly as-is)
    admin,
    login, // admin login
    logout, // admin logout
    ProtectedAdminWrapper,
    // User (new, frontend-only)
    user,
    isAuthenticated, // for home page and downloads
    register, // form-based registration via Sheets
    userLogout,
    ProtectedUserWrapper,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};