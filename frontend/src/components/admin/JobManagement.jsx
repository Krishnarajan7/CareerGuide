import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockJobs } from "@/data/mockJobs";
import { useToast } from "@/hooks/use-toast";
import {
  Edit,
  Trash2,
  Eye,
  Users,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
} from "lucide-react";

export function JobManagement() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingJob, setEditingJob] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Engineering", "Management", "Design", "Marketing", "Sales", "Data Science", "Product"];

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "The job posting has been removed successfully.",
    });
  };

  const handleToggleJobStatus = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
    toast({
      title: "Job Status Updated",
      description: "The job status has been changed successfully.",
    });
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedJob) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    setIsEditDialogOpen(false);
    setEditingJob(null);
    toast({
      title: "Job Updated",
      description: "The job posting has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Job Management</h1>
        <p className="text-muted-foreground">
          View, edit, and manage all job postings from this centralized dashboard.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl">All Job Postings</CardTitle>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Job Title</TableHead>
                  <TableHead className="min-w-[150px]">Company</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Type</TableHead>
                  <TableHead className="min-w-[120px]">Applications</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{job.company}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{job.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.type === "Full-time" ? "default" : "outline"}>
                        {job.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        {job.applicationsCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={job.isActive ? "default" : "destructive"}>
                        {job.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditJob(job)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleToggleJobStatus(job.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Job Dialog */}
      {editingJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Job Posting</DialogTitle>
              <DialogDescription>
                Update the job details below
              </DialogDescription>
            </DialogHeader>
            <JobEditForm job={editingJob} onSave={handleSaveEdit} onCancel={() => setIsEditDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function JobEditForm({ job, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    ...job,
    requirements: job.requirements.join("\n"),
    benefits: job.benefits.join("\n"),
    skills: job.skills.join(", "),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJob = {
      ...formData,
      requirements: formData.requirements.split("\n").filter(r => r.trim()),
      benefits: formData.benefits.split("\n").filter(b => b.trim()),
      skills: formData.skills.split(", ").map(s => s.trim()).filter(s => s),
    };
    onSave(updatedJob);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Job Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Company</Label>
          <Input
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Application Deadline</Label>
          <Input
            type="date"
            value={formData.applicationDeadline}
            onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Job Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type})}>
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
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Experience</Label>
          <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience})}>
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
        <div className="space-y-2">
          <Label>Min Salary (INR)</Label>
          <Input
            type="number"
            value={formData.salary.min}
            onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, min: parseInt(e.target.value) } })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Max Salary (INR)</Label>
          <Input
            type="number"
            value={formData.salary.max}
            onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, max: parseInt(e.target.value) } })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Skills (comma-separated)</Label>
        <Input
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="React, JavaScript, TypeScript"
        />
      </div>

      <div className="space-y-2">
        <Label>Job Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Requirements (one per line)</Label>
        <Textarea
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Benefits (one per line)</Label>
        <Textarea
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}