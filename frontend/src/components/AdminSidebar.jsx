import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Plus,
  Briefcase,
  Users,
  Settings,
  User,
  BarChart3,
  Shield,
  Home,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Slight delay for better UX
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const adminMenuItems = [
  { title: "Dashboard", url: "/admin", icon: BarChart3, isExact: true },
  { title: "Add Job", url: "/admin/add-job", icon: Plus },
  { title: "Manage Jobs", url: "/admin/jobs", icon: Briefcase },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open, isMobile, setOpenMobile, state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const isCollapsed = state === "collapsed";
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); 
      if (isMobile) setOpenMobile(false);
    } catch (err) {
      toast({
        title: "Logout failed",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 ease-in-out border-r border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-background">
        <div
          className={`flex items-center p-4 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div
            className={`flex items-center min-w-0 ${
              isCollapsed ? "justify-center" : "space-x-3"
            }`}
          >
            <div
              className={`bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-300 ${
                isCollapsed ? "w-9 h-9" : "w-10 h-10"
              }`}
            >
              <Shield
                className={`text-white ${isCollapsed ? "h-4 w-4" : "h-5 w-5"}`}
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 ml-3">
                <span className="text-lg font-bold gradient-text truncate">
                  Admin Panel
                </span>
                <span className="text-xs text-sidebar-foreground/60 truncate">
                  Management Dashboard
                </span>
              </div>
            )}
          </div>
          {isMobile && open && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close sidebar"
              onClick={() => setOpenMobile(false)}
              className="shrink-0 ml-2 md:hidden"
            >
              <X className="h-4 w-4 text-sidebar-foreground" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3 bg-sidebar-background">
        <SidebarGroup>
          <SidebarGroupLabel
            className={
              isCollapsed
                ? "sr-only"
                : "px-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2"
            }
          >
            Admin Functions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      end={item.isExact}
                      className={({ isActive }) =>
                        `flex items-center rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-primary to-secondary text-black shadow-md"
                            : "text-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        } ${
                          isCollapsed
                            ? "justify-center px-2 py-3"
                            : "gap-3 px-4 py-3"
                        }`
                      }
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium truncate">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pt-4 border-t border-sidebar-border">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? "Back to Site" : undefined}
                >
                  <NavLink
                    to="/"
                    className={`flex items-center rounded-lg transition-all duration-200 hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground ${
                      isCollapsed
                        ? "justify-center px-2 py-3"
                        : "gap-3 px-4 py-3"
                    }`}
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    <Home className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium truncate">Back to Site</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? "Logout" : undefined}
                >
                  <button
                    className={`flex items-center rounded-lg transition-all duration-200 hover:bg-destructive/10 text-destructive hover:text-destructive w-full ${
                      isCollapsed
                        ? "justify-center px-2 py-3"
                        : "gap-3 px-4 py-3"
                    }`}
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <LoadingSpinner size="sm" className="h-5 w-5 shrink-0" />
                    ) : (
                      <LogOut className="h-5 w-5 shrink-0" />
                    )}
                    {!isCollapsed && (
                      <span className="font-medium truncate">
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </span>
                    )}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
