import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, 
  BookOpen, 
  BriefcaseBusiness, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Star, 
  TrendingUp,
  Calendar,
  Users,
  Award,
  Target,
  Clock,
  ArrowRight
} from "lucide-react";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Dashboard = () => {
  const [userType] = useState<"college-joining" | "college-student" | "fresher">("college-student");
  const headerRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  const notifications = [
    { id: 1, text: "New internship at Google available", type: "opportunity", time: "2h ago" },
    { id: 2, text: "Your resume score has improved!", type: "achievement", time: "1d ago" },
    { id: 3, text: "Upcoming tech event in your city", type: "event", time: "3d ago" }
  ];

  const collegeJoiningContent = {
    title: "Find Your Perfect College",
    stats: [
      { label: "Colleges Matched", value: "24", icon: GraduationCap },
      { label: "City Options", value: "8", icon: MapPin },
      { label: "Average Fees", value: "₹2.5L", icon: TrendingUp }
    ],
    recommendations: [
      {
        name: "RV College of Engineering",
        location: "Bangalore",
        cutoffMatch: "95%",
        fees: "₹3.2L",
        rating: 4.5
      },
      {
        name: "PES University",
        location: "Bangalore", 
        cutoffMatch: "88%",
        fees: "₹4.5L",
        rating: 4.3
      },
      {
        name: "BMS College of Engineering",
        location: "Bangalore",
        cutoffMatch: "92%",
        fees: "₹2.8L",
        rating: 4.2
      }
    ]
  };

  const collegeStudentContent = {
    title: "Boost Your Career Prospects",
    stats: [
      { label: "Internships", value: "156", icon: BriefcaseBusiness },
      { label: "Hackathons", value: "12", icon: Award },
      { label: "Companies", value: "89", icon: Users }
    ],
    opportunities: [
      {
        title: "Software Engineering Intern",
        company: "Microsoft",
        location: "Bangalore",
        duration: "6 months",
        stipend: "₹50,000/month",
        deadline: "15 days left"
      },
      {
        title: "Data Science Intern",
        company: "Amazon",
        location: "Hyderabad",
        duration: "4 months", 
        stipend: "₹45,000/month",
        deadline: "8 days left"
      },
      {
        title: "Full Stack Developer",
        company: "Flipkart",
        location: "Bangalore",
        duration: "6 months",
        stipend: "₹40,000/month",
        deadline: "22 days left"
      }
    ]
  };

  const fresherContent = {
    title: "Launch Your Tech Career",
    stats: [
      { label: "Job Openings", value: "2,450", icon: BriefcaseBusiness },
      { label: "Resume Score", value: "85%", icon: FileText },
      { label: "Skill Match", value: "92%", icon: Target }
    ],
    jobs: [
      {
        title: "Junior Software Developer",
        company: "TCS",
        location: "Bangalore",
        salary: "₹3.5 LPA",
        experience: "0-1 years",
        skills: "Java, Spring Boot, SQL"
      },
      {
        title: "Frontend Developer",
        company: "Infosys",
        location: "Pune",
        salary: "₹4.2 LPA", 
        experience: "0-2 years",
        skills: "React, JavaScript, CSS"
      },
      {
        title: "Data Analyst",
        company: "Wipro",
        location: "Hyderabad",
        salary: "₹3.8 LPA",
        experience: "0-1 years",
        skills: "Python, SQL, Excel"
      }
    ]
  };

  const renderContent = () => {
    switch (userType) {
      case "college-joining":
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collegeJoiningContent.stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* College Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Recommended Colleges
                </CardTitle>
                <CardDescription>Based on your cutoff and preferred location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collegeJoiningContent.recommendations.map((college, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">{college.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {college.location}
                            </span>
                            <span>Fees: {college.fees}</span>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-warning fill-current" />
                              {college.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">
                            {college.cutoffMatch} Match
                          </Badge>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "college-student":
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {collegeStudentContent.stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <stat.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BriefcaseBusiness className="h-5 w-5 mr-2" />
                  Latest Opportunities
                </CardTitle>
                <CardDescription>Internships and entry-level positions for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collegeStudentContent.opportunities.map((opp, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">{opp.title}</h3>
                          <p className="text-sm font-medium text-primary">{opp.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {opp.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {opp.duration}
                            </span>
                            <span>{opp.stipend}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {opp.deadline}
                          </Badge>
                          <Button size="sm">
                            Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "fresher":
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fresherContent.stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <stat.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resume Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resume Builder Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <Button variant="outline" className="w-full">
                    Complete Your Resume
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BriefcaseBusiness className="h-5 w-5 mr-2" />
                  Recommended Jobs
                </CardTitle>
                <CardDescription>Based on your skills and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fresherContent.jobs.map((job, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <p className="text-sm font-medium text-primary">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span>{job.salary}</span>
                            <span>{job.experience}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Skills: {job.skills}
                          </p>
                        </div>
                        <Button size="sm">
                          Apply <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container page-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 scroll-animate"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Priya! 👋
            </h1>
            <p className="text-muted-foreground">
              {userType === "college-joining" && "Let's find your perfect college"}
              {userType === "college-student" && "Explore new opportunities to grow your career"}
              {userType === "fresher" && "Your next job opportunity awaits"}
            </p>
          </div>
          
          {/* Notifications */}
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 scroll-animate"
        >
          <Button variant="outline" className="justify-start h-auto p-4">
            <BookOpen className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Browse Courses</p>
              <p className="text-xs text-muted-foreground">Learn new skills</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <FileText className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Resume Builder</p>
              <p className="text-xs text-muted-foreground">Create perfect resume</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <Calendar className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Events</p>
              <p className="text-xs text-muted-foreground">Upcoming events</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <Award className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Achievements</p>
              <p className="text-xs text-muted-foreground">Track progress</p>
            </div>
          </Button>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="scroll-animate">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;