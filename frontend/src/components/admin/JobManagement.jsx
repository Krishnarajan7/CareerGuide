import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import {
  Edit,
  Trash2,
  Eye,
  Users,
  Search,
  Filter,
  MoreHorizontal,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function JobManagement() {
  const { toast } = useToast();
  const { admin } = useAuth(); // Get admin from AuthContext
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingJob, setEditingJob] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [viewingJob, setViewingJob] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch jobs from backend on mount
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/jobs", {
          params: { searchQuery, category: filterCategory === "All" ? undefined : filterCategory },
        });
        setJobs(response.data.data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch jobs",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery, filterCategory, toast]);

  const filteredJobs = jobs; // Backend handles filtering via query params

  const categories = [
    "All",
    "ENGINEERING",
    "MANAGEMENT",
    "DESIGN",
    "MARKETING",
    "SALES",
    "DATA_SCIENCE",
    "PRODUCT",
  ];

  const handleDeleteJob = async (jobId) => {
    setIsLoading(true);
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job.id !== jobId));
      setDeletingJobId(null);
      toast({
        title: "Job Deleted",
        description: "The job posting has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete job",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setViewingJob(job);
    setIsViewDialogOpen(true);
  };

  const handleToggleJobStatus = async (jobId) => {
    try {
      const response = await api.patch(`/jobs/${jobId}/status`);
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, isActive: response.data.data.isActive } : job)));
      toast({
        title: "Job Status Updated",
        description: `The job status has been changed to ${response.data.data.isActive ? "active" : "inactive"}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update job status",
        variant: "destructive",
      });
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedJob) => {
    try {
      const response = await api.put(`/jobs/${updatedJob.id}`, updatedJob);
      setJobs(jobs.map((job) => (job.id === updatedJob.id ? response.data.data : job)));
      setIsEditDialogOpen(false);
      setEditingJob(null);
      toast({
        title: "Job Updated",
        description: "The job posting has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update job",
        variant: "destructive",
      });
    }
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
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "All" ? "All" : category.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
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
                        <Badge variant="secondary">{job.category.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={job.type === "FULL_TIME" ? "default" : "outline"}>
                          {job.type.replace("_", " ")}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewJob(job)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {admin && (
                              <>
                                <DropdownMenuItem onClick={() => handleEditJob(job)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleToggleJobStatus(job.id)}>
                                  {job.isActive ? (
                                    <>
                                      <XCircle className="h-4 w-4 mr-2 text-warning" />
                                      Mark Inactive
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2 text-success" />
                                      Mark Active
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => setDeletingJobId(job.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Job
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Job Dialog */}
      {viewingJob && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{viewingJob.title}</DialogTitle>
              <DialogDescription>
                {viewingJob.company} • {viewingJob.location}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{viewingJob.type.replace("_", " ")}</Badge>
                <Badge variant="secondary">{viewingJob.category.replace("_", " ")}</Badge>
                <Badge variant={viewingJob.isActive ? "default" : "destructive"}>
                  {viewingJob.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{viewingJob.description}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {viewingJob.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Benefits</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {viewingJob.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {viewingJob.skills.map((skill, i) => (
                    <Badge key={i} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">Salary: </span>
                  ₹{viewingJob.minSalary.toLocaleString()} - ₹{viewingJob.maxSalary.toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Experience: </span>
                  {viewingJob.experience.replace("_", " ")}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Job Dialog */}
      {editingJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Job Posting</DialogTitle>
              <DialogDescription>Update the job details below</DialogDescription>
            </DialogHeader>
            <JobEditForm job={editingJob} onSave={handleSaveEdit} onCancel={() => setIsEditDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingJobId} onOpenChange={() => setDeletingJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this job posting
              and remove all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingJobId && handleDeleteJob(deletingJobId)}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function JobEditForm({ job, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    category: job.category,
    experience: job.experience,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
    description: job.description,
    requirements: job.requirements.join("\n"),
    benefits: job.benefits.join("\n"),
    skills: job.skills.join(", "),
    applicationDeadline: new Date(job.applicationDeadline).toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedJob = {
        id: formData.id,
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        category: formData.category,
        experience: formData.experience,
        minSalary: parseInt(formData.minSalary),
        maxSalary: parseInt(formData.maxSalary),
        description: formData.description,
        requirements: formData.requirements.split("\n").map((r) => r.trim()).filter((r) => r),
        benefits: formData.benefits.split("\n").map((b) => b.trim()).filter((b) => b),
        skills: formData.skills.split(",").map((s) => s.trim()).filter((s) => s),
        applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
      };
      await onSave(updatedJob);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save job",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">Full Time</SelectItem>
              <SelectItem value="PART_TIME">Part Time</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
              <SelectItem value="CONTRACT">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ENGINEERING">Engineering</SelectItem>
              <SelectItem value="MANAGEMENT">Management</SelectItem>
              <SelectItem value="DESIGN">Design</SelectItem>
              <SelectItem value="MARKETING">Marketing</SelectItem>
              <SelectItem value="SALES">Sales</SelectItem>
              <SelectItem value="DATA_SCIENCE">Data Science</SelectItem>
              <SelectItem value="PRODUCT">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Experience</Label>
          <Select
            value={formData.experience}
            onValueChange={(value) => setFormData({ ...formData, experience: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FRESHER">Fresher</SelectItem>
              <SelectItem value="ZERO_TO_ONE">0-1 years</SelectItem>
              <SelectItem value="ONE_TO_THREE">1-3 years</SelectItem>
              <SelectItem value="THREE_TO_FIVE">3-5 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Min Salary (INR)</Label>
          <Input
            type="number"
            value={formData.minSalary}
            onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Max Salary (INR)</Label>
          <Input
            type="number"
            value={formData.maxSalary}
            onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
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
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Save Changes
        </Button>
      </div>
    </form>
  );
}