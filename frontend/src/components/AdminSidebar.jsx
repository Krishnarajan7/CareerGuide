import { NavLink, useLocation } from "react-router-dom";
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
import { Sheet, SheetContent } from "@/components/ui/sheet";

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
    isExact: true,
  },
  {
    title: "Add Job",
    url: "/admin/add-job",
    icon: Plus,
  },
  {
    title: "Manage Jobs",
    url: "/admin/jobs",
    icon: Briefcase,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border/20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-lg font-bold gradient-text">Admin Panel</span>
              <span className="text-xs text-muted-foreground">Management Dashboard</span>
            </div>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setOpenMobile(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">
            Admin Functions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end={item.isExact}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-gradient-to-r from-primary to-secondary text-black shadow-lg" 
                            : "hover:bg-muted/80 text-foreground hover:text-foreground"
                        }`
                      }
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Site">
                  <NavLink 
                    to="/" 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted/80 text-foreground hover:text-foreground"
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    <Home className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium group-data-[collapsible=icon]:hidden">Back to Site</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <button 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-destructive/10 text-destructive hover:text-destructive w-full"
                    onClick={() => {
                      console.log('Logout clicked');
                      isMobile && setOpenMobile(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium group-data-[collapsible=icon]:hidden">Logout</span>
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