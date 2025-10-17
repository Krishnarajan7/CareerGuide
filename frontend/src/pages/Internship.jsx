import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientHeading } from "@/components/ui/gradient-heading";
import ScrollToTop from "@/components/ScrollToTop";
import MNCLogoCarousel from "@/components/MNCLogoCarousel";
import {
  ArrowRight,
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Target,
  Upload,
  CheckCircle,
  Filter,
  Fullscreen,
  Clock2,
} from "lucide-react";

// Sample Data
const fullTimeInternships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Google",
    location: "Bangalore, KA",
    duration: "3 months",
    description: "Join our innovative team to build scalable web applications using React and Node.js.",
    requirements: "B.Tech CS/IT, 7+ CGPA",
    skills: ["React", "Node.js", "MongoDB"],
    salary: "₹25,000/month",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Microsoft",
    location: "Hyderabad, TS",
    duration: "6 months",
    description: "Analyze large datasets to derive actionable insights for product teams.",
    requirements: "B.Sc Stats, SQL proficiency",
    skills: ["Python", "SQL", "Tableau"],
    salary: "₹20,000/month",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "Amazon",
    location: "Mumbai, MH",
    duration: "3 months",
    description: "Assist in digital campaigns and market research for e-commerce growth.",
    requirements: "BBA, creative mindset",
    skills: ["SEO", "Content Writing", "Analytics"],
    salary: "₹18,000/month",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    id: 7,
    title: "Product Manager Intern",
    company: "Apple",
    location: "Remote",
    duration: "4 months",
    description: "Assist in product roadmap and user experience enhancements.",
    requirements: "MBA, analytical skills",
    skills: ["Agile", "Jira", "Research"],
    salary: "₹30,000/month",
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    id: 9,
    title: "DevOps Engineer Intern",
    company: "IBM",
    location: "Pune, MH",
    duration: "3 months",
    description: "Support cloud infrastructure and automation pipelines.",
    requirements: "B.Tech, AWS knowledge",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    salary: "₹22,000/month",
    logo: "https://logo.clearbit.com/ibm.com",
  },
];

const partTimeInternships = [
  {
    id: 4,
    title: "UI/UX Designer Intern",
    company: "Flipkart",
    location: "Remote",
    duration: "20 hours/week",
    description: "Design intuitive user interfaces for our mobile app using Figma.",
    requirements: "B.Des, portfolio required",
    skills: ["Figma", "Adobe XD", "User Research"],
    salary: "₹15,000/month",
    logo: "https://logo.clearbit.com/flipkart.com",
  },
  {
    id: 5,
    title: "Content Writer Intern",
    company: "Zomato",
    location: "Delhi, DL",
    duration: "15 hours/week",
    description: "Create engaging food reviews and blog posts to captivate our audience.",
    requirements: "BA English, writing samples",
    skills: ["Copywriting", "SEO", "WordPress"],
    salary: "₹12,000/month",
    logo: "https://logo.clearbit.com/zomato.com",
  },
  {
    id: 6,
    title: "Social Media Intern",
    company: "Paytm",
    location: "Remote",
    duration: "10 hours/week",
    description: "Manage social channels and create viral content strategies.",
    requirements: "B.Com, social savvy",
    skills: ["Instagram", "Twitter", "Canva"],
    salary: "₹10,000/month",
    logo: "https://logo.clearbit.com/paytm.com",
  },
  {
    id: 8,
    title: "Graphic Designer Intern",
    company: "Swiggy",
    location: "Bangalore, KA",
    duration: "12 hours/week",
    description: "Create visual assets for marketing campaigns.",
    requirements: "BFA, Adobe Suite",
    skills: ["Photoshop", "Illustrator", "Branding"],
    salary: "₹8,000/month",
    logo: "https://logo.clearbit.com/swiggy.com",
  },
  {
    id: 10,
    title: "HR Coordinator Intern",
    company: "TCS",
    location: "Chennai, TN",
    duration: "18 hours/week",
    description: "Support recruitment and employee engagement activities.",
    requirements: "BBA HR, communication skills",
    skills: ["Recruitment", "Excel", "Communication"],
    salary: "₹9,000/month",
    logo: "https://logo.clearbit.com/tcs.com",
  },
];

// Reusable Internship Card
const InternshipCard = ({ internship, onApply }) => (
  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm overflow-hidden">
    <CardHeader className="p-6 md:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="flex items-start justify-between mb-4">
        <img src={internship.logo} alt={internship.company} className="w-12 h-12 rounded-lg" />
        <Badge variant="secondary" className="text-xs">{internship.duration}</Badge>
      </div>
      <CardTitle className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
        {internship.title}
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground mb-3">{internship.company}</CardDescription>
      <div className="flex items-center text-xs text-muted-foreground mb-3">
        <MapPin className="h-3 w-3 mr-1" />
        {internship.location}
      </div>
    </CardHeader>
    <CardContent className="p-6 md:p-8 pt-0">
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{internship.description}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-xs text-primary">
          <DollarSign className="h-3 w-3 mr-1" />
          {internship.salary}
        </div>
        <div className="flex flex-wrap gap-1">
          {internship.skills.slice(0, 2).map((skill, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
          ))}
        </div>
      </div>
      <Button
        onClick={() => onApply(internship)}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
        size="sm"
      >
        Apply Now <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </CardContent>
  </Card>
);

// Filter Component
const Filters = ({ onSearch, onLocationChange, selectedLocation }) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-muted/20 rounded-xl">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search internships..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
    <div className="flex-1">
      <Select value={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger aria-label="Filter internships by location">
          <SelectValue placeholder="Filter by Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Bangalore">Bangalore</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Mumbai">Mumbai</SelectItem>
          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          <SelectItem value="Delhi">Delhi</SelectItem>
          <SelectItem value="Pune">Pune</SelectItem>
          <SelectItem value="Chennai">Chennai</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button variant="outline" size="sm" className="self-center">
      <Filter className="h-4 w-4 mr-2" />
      More Filters
    </Button>
  </div>
);

// Application Form Modal
const ApplicationForm = ({ internship, open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Application submitted:", { ...formData, internship });
    onClose();
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Apply for {internship.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Why are you a great fit for this internship?"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="resume">Upload Resume</Label>
            <div className="flex items-center justify-between p-3 border border-border rounded-md">
              <span className="text-sm text-muted-foreground">
                {formData.resume ? formData.resume.name : "No file selected"}
              </span>
              <label htmlFor="resume" className="cursor-pointer" aria-label="Upload resume">
                <Upload className="h-4 w-4 text-primary" aria-hidden="true" />
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
              Submit Application <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Internship Hero Section
const InternshipHeroSection = ({ heroRef }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_50%_50%,theme(colors.secondary/0.1),transparent_70%)] rounded-full blur-3xl animate-bounce-slow"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 border-2 border-secondary/20 rounded-full animate-spin-reverse"></div>
      </div>

      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full opacity-0 fade-in-hero"
      >
        <Badge className="mb-6 inline-flex items-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg fade-in-hero-item delay-100">
          <Briefcase className="h-4 w-4 mr-2" />
          Unlock Your First Step
        </Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight text-foreground fade-in-hero-item delay-200">
          Internship <span className="block gradient-text">Opportunities</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4 fade-in-hero-item delay-400">
          Dive into real-world experience with top MNCs. Our curated internships blend skill-building with professional growth, tailored for full-time dedication or part-time flexibility. Apply today and launch your career.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-hero-item delay-600">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl text-base md:text-lg px-8 md:px-10 py-4 h-auto font-semibold w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              Find Your Internship
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-black text-black hover:bg-primary/80 text-base md:text-lg px-8 md:px-10 py-4 h-auto w-full sm:w-auto"
            asChild
          >
            <Link to="/courses">
              Build Skills First
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      <style>{`
        .fade-in-hero {
          animation: fadeInOut 1s ease-out forwards;
        }
        .fade-in-hero-item {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

// Internship Selection Section
const SelectionSection = ({ internshipsRef, activeTab, onTabChange }) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/10">
      <div
        ref={internshipsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <GradientHeading size="xl" className="mb-4 md:mb-6">
            Choose Your <span className="gradient-text">Path</span>
          </GradientHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Full-time for immersive experiences or part-time for balanced growth—pick what fits your schedule.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => onTabChange('full-time')}
            variant={activeTab === 'full-time' ? 'default' : 'outline'}
            className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'full-time'
                ? 'bg-gradient-to-r from-primary to-secondary shadow-lg'
                : 'border-black hover:bg-primary/90 hover:border-primary'
            }`}
          >
            <Fullscreen className="h-5 w-5 mr-2" />
            Full-Time Internships
          </Button>
          <Button
            onClick={() => onTabChange('part-time')}
            variant={activeTab === 'part-time' ? 'default' : 'outline'}
            className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'part-time'
                ? 'bg-gradient-to-r from-primary to-secondary shadow-lg'
                : 'border-black hover:bg-primary/90 hover:border-primary' 
            }`}
          >
            <Clock2 className="h-5 w-5 mr-2" />
            Part-Time Internships
          </Button>
        </div>
      </div>
    </section>
  );
};

// Internships List Section
const InternshipsListSection = ({ listRef, activeTab, filteredInternships, onSearch, onLocationChange, selectedLocation, onApply }) => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div
        ref={listRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <GradientHeading size="lg" className="text-center mb-4 md:mb-6">
          {activeTab === 'full-time' ? 'Full-Time' : 'Part-Time'} <span className="gradient-text">Openings</span>
        </GradientHeading>
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {filteredInternships.length} opportunities to kickstart your professional journey.
        </p>
        <Filters
          onSearch={onSearch}
          onLocationChange={onLocationChange}
          selectedLocation={selectedLocation}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} onApply={onApply} />
          ))}
        </div>
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No internships match your filters. Try adjusting them!</p>
          </div>
        )}
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          Ready to <span className="text-black/90">Apply?</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 md:mb-12 text-primary-foreground/90">
          Secure your spot in a top internship. Your future self will thank you.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 shadow-2xl text-base md:text-lg px-10 md:px-12 py-4 h-auto font-semibold"
          asChild
        >
          <Link to="/register">
            Browse More Opportunities
            <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

const Internships = () => {
  const heroRef = useScrollAnimation();
  const internshipsRef = useScrollAnimation();
  const listRef = useScrollAnimation();
  const [activeTab, setActiveTab] = useState('full-time');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredInternships, setFilteredInternships] = useState([]);

  useEffect(() => {
    const currentInternships = activeTab === 'full-time' ? fullTimeInternships : partTimeInternships;
    let filtered = currentInternships;
    if (searchQuery) {
      filtered = filtered.filter((internship) =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedLocation !== 'all') {
      filtered = filtered.filter((internship) => internship.location.includes(selectedLocation));
    }
    setFilteredInternships(filtered);
  }, [activeTab, searchQuery, selectedLocation]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSelectedLocation('all');
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const mncsRef = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <InternshipHeroSection heroRef={heroRef} />
      <SelectionSection
        internshipsRef={internshipsRef}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <InternshipsListSection
        listRef={listRef}
        activeTab={activeTab}
        filteredInternships={filteredInternships}
        onSearch={handleSearch}
        onLocationChange={handleLocationChange}
        selectedLocation={selectedLocation}
        onApply={handleApply}
      />
      <MNCLogoCarousel refProp={mncsRef} />
      <ScrollToTop />
      <CTASection />
      <ApplicationForm
        internship={selectedInternship}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Internships;