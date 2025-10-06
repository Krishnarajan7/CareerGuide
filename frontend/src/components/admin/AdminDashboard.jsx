import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobStats } from "@/data/mockJobs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  Building,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  FileText,
} from "lucide-react";

export function AdminDashboard() {
  const stats = getJobStats();

  const recentActivity = [
    { type: "application", user: "John Doe", job: "Frontend Developer", time: "2 mins ago", status: "new" },
    { type: "job", title: "Data Analyst", action: "posted", time: "1 hour ago", status: "active" },
    { type: "application", user: "Sarah Johnson", job: "UI/UX Designer", time: "3 hours ago", status: "reviewed" },
    { type: "user", name: "Mike Wilson", action: "registered", time: "5 hours ago", status: "new" },
    { type: "application", user: "Emily Davis", job: "Backend Engineer", time: "1 day ago", status: "shortlisted" },
  ];

  const topJobs = [
    { title: "Frontend Developer", company: "TechCorp", applications: 45, views: 234, trending: "up" },
    { title: "Data Scientist", company: "DataInc", applications: 32, views: 189, trending: "up" },
    { title: "UI/UX Designer", company: "DesignCo", applications: 28, views: 156, trending: "down" },
    { title: "Backend Engineer", company: "CodeLabs", applications: 38, views: 201, trending: "up" },
  ];

  const applicationStats = [
    { status: "Pending Review", count: 45, color: "text-yellow-600 bg-yellow-50" },
    { status: "Under Review", count: 23, color: "text-blue-600 bg-blue-50" },
    { status: "Shortlisted", count: 12, color: "text-green-600 bg-green-50" },
    { status: "Rejected", count: 8, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights and analytics for your recruitment platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
                <div className="flex items-center mt-2 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-primary/20 rounded-full">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </div>
            <Progress value={75} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="hover-lift border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-3xl font-bold text-secondary">{stats.totalApplications}</p>
                <div className="flex items-center mt-2 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-secondary/20 rounded-full">
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </div>
            <Progress value={60} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="hover-lift border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partner Companies</p>
                <p className="text-3xl font-bold text-accent">{stats.companies}</p>
                <div className="flex items-center mt-2 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+3 new this week</span>
                </div>
              </div>
              <div className="p-3 bg-accent/20 rounded-full">
                <Building className="h-8 w-8 text-accent" />
              </div>
            </div>
            <Progress value={85} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="hover-lift border-success/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Applications</p>
                <p className="text-3xl font-bold text-success">{Math.round(stats.totalApplications / stats.total)}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <span>Per job posting</span>
                </div>
              </div>
              <div className="p-3 bg-success/20 rounded-full">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </div>
            <Progress value={90} className="mt-4 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Application Status & Top Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Application Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{stat.status}</p>
                      <p className="text-sm text-muted-foreground">{stat.count} applications</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{stat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Top Performing Jobs
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{job.title}</p>
                      {job.trending === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {job.applications}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {job.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'new' ? 'bg-blue-100 text-blue-600' :
                      activity.status === 'active' ? 'bg-green-100 text-green-600' :
                      activity.status === 'reviewed' ? 'bg-purple-100 text-purple-600' :
                      activity.status === 'shortlisted' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'application' && <FileText className="h-4 w-4" />}
                      {activity.type === 'job' && <Briefcase className="h-4 w-4" />}
                      {activity.type === 'user' && <UserPlus className="h-4 w-4" />}
                    </div>
                    <div>
                      {activity.type === 'application' && (
                        <>
                          <p className="font-medium text-sm">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">Applied for {activity.job}</p>
                        </>
                      )}
                      {activity.type === 'job' && (
                        <>
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">Job {activity.action}</p>
                        </>
                      )}
                      {activity.type === 'user' && (
                        <>
                          <p className="font-medium text-sm">{activity.name}</p>
                          <p className="text-xs text-muted-foreground">User {activity.action}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{activity.status}</Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                <Briefcase className="h-6 w-6 text-primary mb-2" />
                <p className="font-medium">Post New Job</p>
                <p className="text-xs text-muted-foreground">Create job listing</p>
              </button>
              <button className="w-full p-4 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                <Users className="h-6 w-6 text-secondary mb-2" />
                <p className="font-medium">View Applications</p>
                <p className="text-xs text-muted-foreground">Review candidates</p>
              </button>
              <button className="w-full p-4 bg-accent/10 hover:bg-accent/20 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                <Building className="h-6 w-6 text-accent mb-2" />
                <p className="font-medium">Manage Companies</p>
                <p className="text-xs text-muted-foreground">Partner management</p>
              </button>
              <button className="w-full p-4 bg-success/10 hover:bg-success/20 rounded-lg text-left transition-all hover:-translate-y-1 hover:shadow-lg">
                <Calendar className="h-6 w-6 text-success mb-2" />
                <p className="font-medium">Schedule Interviews</p>
                <p className="text-xs text-muted-foreground">Set up meetings</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}