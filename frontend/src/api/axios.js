import axios from "axios";
import { toast } from "@/hooks/use-toast";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast({
        title: "Network error",
        description: "Check your internet connection",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    const { status, data, config } = error.response;
    const suppressToast = config?.suppressToast;
    const message = data?.message || error.message || "Something went wrong";

    if (suppressToast) return Promise.reject(error);
    const isAuthRoute =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin/login");

    switch (status) {
      case 400:
        toast({
          title: "Invalid request",
          description: message,
          variant: "destructive",
        });
        break;

      case 401:
        if (!isAuthRoute) {
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
        }
        break;

      case 403:
        toast({
          title: "Access denied",
          description: message,
          variant: "destructive",
        });
        break;

      case 404:
        toast({
          title: "Not found",
          description: message,
          variant: "destructive",
        });
        break;

      default:
        toast({
          title: "Server error",
          description: message,
          variant: "destructive",
        });
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
