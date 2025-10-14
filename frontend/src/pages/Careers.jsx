import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { mockJobs, searchJobs } from "@/data/mockJobs";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Building,
  Briefcase,
  ExternalLink,
  Heart,
  Share2,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Target,
  Award,
} from "lucide-react";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const headerRef = useScrollAnimation();
  const filtersRef = useScrollAnimation();
  const jobsRef = useScrollAnimation();

  const filteredJobs = searchJobs(
    searchQuery,
    categoryFilter,
    experienceFilter,
    typeFilter
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
  const experienceLevels = [
    "All",
    "Fresher",
    "0-1 years",
    "1-3 years",
    "3-5 years",
  ];
  const jobTypes = ["All", "Full-time", "Part-time", "Internship", "Contract"];

  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const formatSalary = (job) => {
    const { min, max, currency } = job.salary;
    if (currency === "INR") {
      return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
    }
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const getExperienceColor = (experience) => {
    switch (experience) {
      case "Fresher":
        return "bg-green-100 text-green-800";
      case "0-1 years":
        return "bg-blue-100 text-blue-800";
      case "1-3 years":
        return "bg-purple-100 text-purple-800";
      case "3-5 years":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-primary/10 text-primary";
      case "Part-time":
        return "bg-secondary/10 text-secondary";
      case "Internship":
        return "bg-accent/10 text-accent";
      case "Contract":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const JobDetailsModal = ({ job }) => (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                  {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                <Badge variant="secondary">{job.category}</Badge>
                <Badge className={getExperienceColor(job.experience)}>
                  {job.experience}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSaveJob(job.id)}
                className={savedJobs.includes(job.id) ? "text-red-500" : ""}
              >
                <Heart
                  className={`h-4 w-4 ${
                    savedJobs.includes(job.id) ? "fill-current" : ""
                  }`}
                />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
              <span className="font-medium">{formatSalary(job)}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>{job.applicationsCount} applications</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-600 flex-shrink-0" />
              <span>
                Apply by{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Job Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-primary/5">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Requirements</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Benefits</h3>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Star className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="border-t border-border pt-4">
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light">
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply for this Position
          </Button>
        </div>
      </div>
    </div>
  );

  const featuredCompanies = [
    {
      name: "TCS",
      logoUrl: "/logos/Tata_Consultancy_Services_old_logo.svg",
      alt: "Tata Consultancy Services Logo",
    },
    {
      name: "Infosys",
      logoUrl: "/logos/Infosys_logo.svg",
      alt: "Infosys Logo",
    },
    {
      name: "Wipro",
      logoUrl: "/logos/Wipro_Primary_Logo_Color_RGB.svg",
      alt: "Wipro Logo",
    },
    {
      name: "Accenture",
      logoUrl: "/logos/Accenture.svg",
      alt: "Accenture Logo",
    },
    {
      name: "Cognizant",
      logoUrl: "/logos/Cognizant_logo_2022.svg",
      alt: "Cognizant Logo",
    },
    {
      name: "HCL",
      logoUrl: "/logos/HCL_Technologies_logo.svg",
      alt: "HCL Technologies Logo",
    },
    {
      name: "Hexaware",
      logoUrl: "/logos/kaartech.png",
      alt: "Kaartech Logo",
    },
  ];

  return (
    <div className="min-h-screen page-bg-gradient">
      <div className="page-container">
        {/* Header */}
        <div ref={headerRef} className="scroll-animate mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Dream <span className="gradient-text">Career</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore exciting opportunities from top companies. Start your
              journey with fresher-friendly positions and grow your career.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockJobs.length}+
                </div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
            </div>
          </div>

          {/* Featured Companies */}
          {/* Featured Companies */}
          <div className="mb-12">
            <h3 className="text-center text-lg font-semibold mb-6 text-muted-foreground">
              Trusted by Leading Companies
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {featuredCompanies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-center w-32 h-16 bg-white border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow p-2"
                >
                  <img
                    src={company.logoUrl}
                    alt={company.alt}
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div ref={filtersRef} className="scroll-animate mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search jobs, companies, skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
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
                    value={experienceFilter}
                    onValueChange={setExperienceFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jobs List */}
          <div ref={jobsRef} className="scroll-animate">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
              <h2 className="text-xl font-bold">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""}{" "}
                Found
              </h2>
              <div className="text-sm text-muted-foreground">
                Showing results for your search
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover-lift group cursor-pointer relative"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span className="font-medium">
                                  {job.company}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span className="font-medium">
                                  {formatSalary(job)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveJob(job.id);
                            }}
                            className={`absolute top-4 right-4 ${
                              savedJobs.includes(job.id) ? "text-red-500" : ""
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                savedJobs.includes(job.id) ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <Badge className={getTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                            <Badge variant="secondary">{job.category}</Badge>
                            <Badge
                              className={getExperienceColor(job.experience)}
                            >
                              {job.experience}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                              {job.applicationsCount} applied
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                              {Math.ceil(
                                (new Date(job.applicationDeadline).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days left
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-border gap-4">
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2 flex-wrap gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Job Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information about this position
                                  </DialogDescription>
                                </DialogHeader>
                                <JobDetailsModal job={job} />
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light"
                            >
                              Apply Now
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all available
                  positions
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("All");
                    setExperienceFilter("All");
                    setTypeFilter("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
