import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Mail,
  Shield,
  Database,
  Globe,
  Paintbrush,
  Save,
} from "lucide-react";

export function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "Career Guidance Platform",
    adminEmail: "admin@careerguide.com",
    supportEmail: "support@careerguide.com",
    emailNotifications: true,
    applicationAlerts: true,
    weeklyReports: false,
    maintenanceMode: false,
    registrationOpen: true,
    jobPostingApproval: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your platform settings and preferences.
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>General Settings</CardTitle>
          </div>
          <CardDescription>
            Configure basic platform information and settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => handleSettingChange("siteName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>
            Control how and when you receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important events
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) =>
                handleSettingChange("emailNotifications", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Application Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new applications are submitted
              </p>
            </div>
            <Switch
              checked={settings.applicationAlerts}
              onCheckedChange={(checked) =>
                handleSettingChange("applicationAlerts", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Receive weekly summary reports via email
              </p>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) =>
                handleSettingChange("weeklyReports", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>System Settings</CardTitle>
          </div>
          <CardDescription>
            Configure system-wide settings and access controls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Temporarily disable public access to the platform
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                handleSettingChange("maintenanceMode", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>User Registration</Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to register on the platform
              </p>
            </div>
            <Switch
              checked={settings.registrationOpen}
              onCheckedChange={(checked) =>
                handleSettingChange("registrationOpen", checked)
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Job Posting Approval</Label>
              <p className="text-sm text-muted-foreground">
                Require admin approval for new job postings
              </p>
            </div>
            <Switch
              checked={settings.jobPostingApproval}
              onCheckedChange={(checked) =>
                handleSettingChange("jobPostingApproval", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}