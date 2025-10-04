import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { JobManagement } from "@/components/admin/JobManagement";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { AdminProfile } from "@/components/admin/AdminProfile";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockJobs } from "@/data/mockJobs";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const AddJobPage = () => {
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);

  const JobForm = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
      title: job?.title || "",
      company: job?.company || "",
      location: job?.location || "",
      type: job?.type || "Full-time",
      category: job?.category || "Engineering",
      experience: job?.experience || "Fresher",
      salaryMin: job?.salary.min || 0,
      salaryMax: job?.salary.max || 0,
      description: job?.description || "",
      requirements: job?.requirements.join("\n") || "",
      benefits: job?.benefits.join("\n") || "",
      skills: job?.skills.join(", ") || "",
      applicationDeadline: job?.applicationDeadline || ""
    });

    const categories = ["All", "Engineering", "Management", "Design", "Marketing", "Sales", "Data Science", "Product"];

    const handleSubmit = (e) => {
      e.preventDefault();
      const newJob = {
        id: job?.id || Date.now().toString(),
        ...formData,
        salary: {
          min: formData.salaryMin,
          max: formData.salaryMax,
          currency: "INR"
        },
        requirements: formData.requirements.split("\n").filter(r => r.trim()),
        benefits: formData.benefits.split("\n").filter(b => b.trim()),
        skills: formData.skills.split(", ").map(s => s.trim()).filter(s => s),
        postedDate: job?.postedDate || new Date().toISOString().split('T')[0],
        isActive: job?.isActive ?? true,
        applicationsCount: job?.applicationsCount || 0
      };

      if (job) {
        setJobs(jobs.map(j => j.id === job.id ? newJob : j));
      } else {
        setJobs([...jobs, newJob]);
      }
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Application Deadline</label>
            <Input
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Job Type</label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(c => c !== "All").map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Experience</label>
            <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="0-1 years">0-1 years</SelectItem>
                <SelectItem value="1-3 years">1-3 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Min Salary (INR)</label>
            <Input
              type="number"
              value={formData.salaryMin}
              onChange={(e) => setFormData({...formData, salaryMin: parseInt(e.target.value)})}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Max Salary (INR)</label>
            <Input
              type="number"
              value={formData.salaryMax}
              onChange={(e) => setFormData({...formData, salaryMax: parseInt(e.target.value)})}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Skills (comma-separated)</label>
          <Input
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
            placeholder="React, JavaScript, TypeScript"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Job Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Requirements (one per line)</label>
          <Textarea
            value={formData.requirements}
            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            rows={4}
            placeholder="Bachelor's degree in Computer Science&#10;2+ years of experience&#10;Strong problem-solving skills"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Benefits (one per line)</label>
          <Textarea
            value={formData.benefits}
            onChange={(e) => setFormData({...formData, benefits: e.target.value})}
            rows={3}
            placeholder="Health insurance&#10;Performance bonuses&#10;Flexible working hours"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
            {job ? "Update Job" : "Create Job"}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Add New Job</h1>
        <p className="text-muted-foreground">
          Create a new job posting to attract qualified candidates.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Job Details</CardTitle>
          <p className="text-muted-foreground">Fill in all the required information for the job posting.</p>
        </CardHeader>
        <CardContent>
          <JobForm onClose={() => {}} />
        </CardContent>
      </Card>
    </div>
  );
};


const AdminContent = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <>
      <AdminSidebar />
      <SidebarInset className="flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="shrink-0" aria-label="Toggle sidebar">
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-foreground" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-foreground" />
              )}
            </SidebarTrigger>
            <Separator orientation="vertical" className="mr-2 h-6" />
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 p-6 max-w-full">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="add-job" element={<AddJobPage />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </SidebarInset>
    </>
  );
};

const Admin = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AdminContent />
      </div>
    </SidebarProvider>
  );
};

export default Admin;