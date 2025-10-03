import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobStats } from "@/data/mockJobs";
import {
  Briefcase,
  Users,
  Building,
  TrendingUp,
} from "lucide-react";

export function AdminDashboard() {
  const stats = getJobStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here's an overview of your recruitment metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalApplications}</p>
                <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partner Companies</p>
                <p className="text-3xl font-bold text-accent">{stats.companies}</p>
                <p className="text-xs text-muted-foreground mt-1">+3 new partners</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <Building className="h-8 w-8 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Applications</p>
                <p className="text-3xl font-bold text-success">{Math.round(stats.totalApplications / stats.total)}</p>
                <p className="text-xs text-muted-foreground mt-1">Per job posting</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Frontend Developer", company: "TechCorp", applications: 45 },
                { title: "Data Scientist", company: "DataInc", applications: 32 },
                { title: "UI/UX Designer", company: "DesignCo", applications: 28 },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{job.applications}</p>
                    <p className="text-sm text-muted-foreground">applications</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-left transition-colors">
                  <Briefcase className="h-6 w-6 text-primary mb-2" />
                  <p className="font-medium">Post New Job</p>
                  <p className="text-sm text-muted-foreground">Create job listing</p>
                </button>
                <button className="p-4 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-left transition-colors">
                  <Users className="h-6 w-6 text-secondary mb-2" />
                  <p className="font-medium">View Applications</p>
                  <p className="text-sm text-muted-foreground">Review candidates</p>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}