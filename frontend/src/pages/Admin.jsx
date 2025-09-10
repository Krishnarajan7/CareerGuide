import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { mockJobs, getJobStats } from "@/data/mockJobs";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Briefcase,
  Building,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
  Download,
  AlertTriangle,
  CheckCircle2,
  X,
  Loader2,
  FileText,
} from "lucide-react";

const Admin = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title"); // New: Sorting
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isEditJobOpen, setIsEditJobOpen] = useState(false);
  const [isViewJobOpen, setIsViewJobOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState(new Set()); // New: Bulk selection
  const [currentPage, setCurrentPage] = useState(1); // New: Pagination
  const [itemsPerPage] = useState(10); // New: Pagination
  const [isSubmitting, setIsSubmitting] = useState(false); // New: Loading state

  const headerRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const jobsRef = useScrollAnimation();

  const stats = getJobStats();

  // Sorting function
  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "company") return a.company.localeCompare(b.company);
    if (sortBy === "applications") return b.applicationsCount - a.applicationsCount;
    if (sortBy === "posted") return new Date(b.postedDate) - new Date(a.postedDate);
    return 0;
  });

  const filteredJobs = sortedJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || job.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories = [
    "All",
    "Engineering",
    "Management",
    "Design",
    "Marketing",
    "Sales",
    "Data Science",
    "Product",
  ];

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    setIsDeleteConfirmOpen(false);
    setDeleteJobId(null);
  };

  const handleBulkDelete = () => {
    setJobs(jobs.filter((job) => !selectedJobs.has(job.id)));
    setSelectedJobs(new Set());
  };

  const handleBulkToggleStatus = () => {
    setJobs(
      jobs.map((job) =>
        selectedJobs.has(job.id) ? { ...job, isActive: !job.isActive } : job
      )
    );
    setSelectedJobs(new Set());
  };

  const handleToggleJobStatus = (jobId) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, isActive: !job.isActive } : job
      )
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobs(new Set(filteredJobs.map((job) => job.id)));
    } else {
      setSelectedJobs(new Set());
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Export to CSV (simple implementation)
  const handleExportCSV = () => {
    const csvContent = [
      ["Title", "Company", "Category", "Type", "Applications", "Status"],
      ...filteredJobs.map((job) => [
        job.title,
        job.company,
        job.category,
        job.type,
        job.applicationsCount,
        job.isActive ? "Active" : "Inactive",
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs.csv";
    a.click();
  };

  const formatSalary = (job) => {
    const { min, max } = job.salary;
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
  };

  const JobForm = ({ job, onClose, isViewOnly = false }) => {
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
      applicationDeadline: job?.applicationDeadline || "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API delay
      setTimeout(() => {
        const newJob = {
          id: job?.id || Date.now().toString(),
          ...formData,
          salary: {
            min: parseInt(formData.salaryMin),
            max: parseInt(formData.salaryMax),
            currency: "INR",
          },
          requirements: formData.requirements.split("\n").filter((r) => r.trim()),
          benefits: formData.benefits.split("\n").filter((b) => b.trim()),
          skills: formData.skills
            .split(", ")
            .map((s) => s.trim())
            .filter((s) => s),
          postedDate: job?.postedDate || new Date().toISOString().split("T")[0],
          isActive: job?.isActive ?? true,
          applicationsCount: job?.applicationsCount || 0,
        };

        if (job) {
          setJobs(jobs.map((j) => (j.id === job.id ? newJob : j)));
        } else {
          setJobs([...jobs, newJob]);
        }
        setIsSubmitting(false);
        onClose();
      }, 1000);
    };

    if (isViewOnly) {
      return (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
            <p className="text-muted-foreground mb-2">{job.company} - {job.location}</p>
            <Badge variant="secondary">{job.category}</Badge>
            <Badge className="ml-2">{job.type}</Badge>
            <Badge className="ml-2" variant={job.isActive ? "default" : "destructive"}>
              {job.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-muted-foreground">{job.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Salary</h4>
            <p className="text-muted-foreground">{formatSalary(job)}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <Badge key={i} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Requirements</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {job.requirements.map((req, i) => <li key={i}>&bull; {req}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Benefits</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {job.benefits.map((benefit, i) => <li key={i}>&bull; {benefit}</li>)}
            </ul>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
            <p>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
            <p>Applications: {job.applicationsCount}</p>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Job Title</label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <Input
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
              disabled={isViewOnly}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Application Deadline</label>
            <Input
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationDeadline: e.target.value,
                })
              }
              required
              disabled={isViewOnly}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Job Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
              disabled={isViewOnly}
            >
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
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              disabled={isViewOnly}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((c) => c !== "All")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Experience</label>
            <Select
              value={formData.experience}
              onValueChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
              disabled={isViewOnly}
            >
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Min Salary (INR)</label>
            <Input
              type="number"
              value={formData.salaryMin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salaryMin: parseInt(e.target.value) || 0,
                })
              }
              required
              disabled={isViewOnly}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Max Salary (INR)</label>
            <Input
              type="number"
              value={formData.salaryMax}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salaryMax: parseInt(e.target.value) || 0,
                })
              }
              required
              disabled={isViewOnly}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Skills (comma-separated)
          </label>
          <Input
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            placeholder="React, JavaScript, TypeScript"
            disabled={isViewOnly}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Job Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            required
            disabled={isViewOnly}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Requirements (one per line)
          </label>
          <Textarea
            value={formData.requirements}
            onChange={(e) =>
              setFormData({ ...formData, requirements: e.target.value })
            }
            rows={4}
            placeholder="Bachelor's degree in Computer Science&#10;2+ years of experience&#10;Strong problem-solving skills"
            disabled={isViewOnly}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Benefits (one per line)</label>
          <Textarea
            value={formData.benefits}
            onChange={(e) =>
              setFormData({ ...formData, benefits: e.target.value })
            }
            rows={3}
            placeholder="Health insurance&#10;Performance bonuses&#10;Flexible working hours"
            disabled={isViewOnly}
          />
        </div>

        <DialogFooter className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isViewOnly}>
            Close
          </Button>
          {!isViewOnly && (
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {job ? "Updating..." : "Creating..."}
                </>
              ) : (
                job ? "Update Job" : "Create Job"
              )}
            </Button>
          )}
        </DialogFooter>
      </form>
    );
  };

  const DeleteConfirmDialog = ({ jobId, onConfirm, onCancel }) => (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
            Confirm Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen page-bg-gradient">
      <div className="page-container">
        {/* Header */}
        <div ref={headerRef} className="scroll-animate mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Manage job postings, track applications, and analyze recruitment
              metrics with advanced tools and real-time insights.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards - Improved Responsive */}
          <div
            ref={statsRef}
            className="scroll-animate mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Total Jobs
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Total Applications
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                      {stats.totalApplications}
                    </p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Partner Companies
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {stats.companies}
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Building className="h-8 w-8 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Avg. Applications per Job
                    </p>
                    <p className="text-2xl font-bold text-success">
                      {stats.total > 0 ? Math.round(stats.totalApplications / stats.total) : 0}
                    </p>
                  </div>
                  <div className="p-3 bg-success/10 rounded-full">
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Management - Enhanced with Bulk Actions, Sorting, Pagination */}
          <div ref={jobsRef} className="scroll-animate">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                  <div>
                    <CardTitle className="text-2xl">Job Management</CardTitle>
                    <p className="text-muted-foreground">
                      Create, edit, and manage job postings with advanced filtering and bulk actions
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleExportCSV}
                      className="border-primary/30 hover:border-primary/60"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light shadow-lg">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-6xl max-h-[95vh]">
                        <DialogHeader>
                          <DialogTitle>Create New Job</DialogTitle>
                          <DialogDescription>
                            Fill in the details to create a new job posting
                          </DialogDescription>
                        </DialogHeader>
                        <JobForm job={null} onClose={() => setIsAddJobOpen(false)} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Filters & Sorting - Responsive */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search jobs by title or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="applications">Applications</SelectItem>
                      <SelectItem value="posted">Posted Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedJobs.size > 0 && (
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={selectedJobs.size === filteredJobs.length}
                        onCheckedChange={(checked) => handleSelectAll(checked)}
                      />
                      <span className="text-sm font-medium">
                        {selectedJobs.size} job{selectedJobs.size > 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Bulk Actions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toggle" onSelect={handleBulkToggleStatus}>
                            Toggle Status
                          </SelectItem>
                          <SelectItem value="delete" onSelect={handleBulkDelete}>
                            Delete Selected
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border/50">
                        <TableHead className="w-8">
                          <Checkbox 
                            checked={selectedJobs.size === filteredJobs.length}
                            onCheckedChange={(checked) => handleSelectAll(checked)}
                          />
                        </TableHead>
                        <TableHead className="w-[200px]">Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedJobs.length > 0 ? (
                        paginatedJobs.map((job) => (
                          <TableRow key={job.id} className="hover:bg-muted/50 border-b border-border/20">
                            <TableCell>
                              <Checkbox 
                                checked={selectedJobs.has(job.id)}
                                onCheckedChange={(checked) => {
                                  const newSelected = new Set(selectedJobs);
                                  if (checked) {
                                    newSelected.add(job.id);
                                  } else {
                                    newSelected.delete(job.id);
                                  }
                                  setSelectedJobs(newSelected);
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium max-w-[200px] truncate">
                              <div className="flex flex-col">
                                <span className="font-semibold">{job.title}</span>
                                <span className="text-sm text-muted-foreground flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {job.location}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {/* Placeholder for logo */}
                                <div className="w-6 h-6 bg-muted rounded mr-2"></div>
                                {job.company}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">{job.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={job.type === "Full-time" ? "default" : "outline"}
                                className="text-xs"
                              >
                                {job.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              <DollarSign className="h-3 w-3 inline mr-1" />
                              {formatSalary(job)}
                            </TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                {job.applicationsCount}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={job.isActive ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {job.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(job.postedDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Dialog open={isViewJobOpen && viewingJob?.id === job.id} onOpenChange={() => setIsViewJobOpen(false)}>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => { setViewingJob(job); setIsViewJobOpen(true); }}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[90vh]">
                                    <DialogHeader>
                                      <DialogTitle>Job Details</DialogTitle>
                                      <DialogDescription>
                                        View complete job information
                                      </DialogDescription>
                                    </DialogHeader>
                                    <JobForm job={job} onClose={() => setIsViewJobOpen(false)} isViewOnly={true} />
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingJob(job);
                                    setIsEditJobOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setDeleteJobId(job.id);
                                    setIsDeleteConfirmOpen(true);
                                  }}
                                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-8">
                            <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination - New */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 bg-muted/50 rounded-b-lg">
                    <div className="text-sm text-muted-foreground">
                      Showing { (currentPage - 1) * itemsPerPage + 1 } to { Math.min(currentPage * itemsPerPage, filteredJobs.length) } of { filteredJobs.length } jobs
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <Button
                            key={i}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Delete Confirmation Dialog */}
          {isDeleteConfirmOpen && deleteJobId && (
            <DeleteConfirmDialog
              jobId={deleteJobId}
              onConfirm={() => handleDeleteJob(deleteJobId)}
              onCancel={() => setIsDeleteConfirmOpen(false)}
            />
          )}

          {/* Edit Job Dialog */}
          {isEditJobOpen && editingJob && (
            <Dialog open={true} onOpenChange={() => setIsEditJobOpen(false)}>
              <DialogContent className="max-w-6xl max-h-[95vh]">
                <DialogHeader>
                  <DialogTitle>Edit Job</DialogTitle>
                  <DialogDescription>
                    Update the job posting details
                  </DialogDescription>
                </DialogHeader>
                <JobForm job={editingJob} onClose={() => setIsEditJobOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;