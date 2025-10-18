// src/pages/Resources.jsx (or wherever your main file is)
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Zap,
  Briefcase,
  Building2,
  Landmark,
  FileText,
  GraduationCap,
  Users2,
  Target,
  Code,
  Users,
  Lightbulb,
  Megaphone,
  Award,
  File,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Import sub-components
import CategoryCard from "@/components/Resources/CategoryCard";
import SubGroupCard from "@/components/Resources/SubGroupCard";
import SubjectCard from "@/components/Resources/SubjectCard";
import YearPaperButton from "@/components/Resources/YearPaperButton";
import PreviewModal from "@/components/Resources/PreviewModal";
import LoadingOverlay from "@/components/Resources/LoadingOverlay";

// Slide variants for Framer Motion
const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const Resources = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const resourcesRef = useScrollAnimation();
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'subgroups', 'subjects', 'years'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const handleView = useCallback((item) => {
    if (!isAuthenticated) {
      toast({
        title: "Unlock Resources",
        description: "Please complete your registration to access resources.",
      });
      localStorage.setItem('pendingResource', JSON.stringify(item));
      navigate('/register');
      return;
    }
    setPreviewItem(item);
    toast({
      title: "Resource Ready",
      description: `${item.subject || item.title} is now available to view.`,
    });
  }, [isAuthenticated, navigate, toast]);

  // Handle category selection with loading and view change
  const handleCategorySelect = useCallback((slug) => {
    setIsCategoryLoading(true);
    // Simulate loading for 3-5 seconds
    const loadTime = Math.random() * 2000 + 3000; // 3-5 sec
    setTimeout(() => {
      setSelectedCategory(slug);
      setCurrentView('subgroups');
      setIsCategoryLoading(false);
    }, loadTime);
  }, []);

  // Handle subgroup selection and view change
  const handleSubGroupSelect = useCallback((slug) => {
    setSelectedSubGroup(slug);
    setCurrentView('subjects');
  }, []);

  // Handle subject selection and view change
  const handleSubjectSelect = useCallback((slug) => {
    setSelectedSubject(slug);
    setCurrentView('years');
  }, []);

  // Back navigation
  const handleBack = useCallback(() => {
    if (currentView === 'subgroups') {
      setCurrentView('categories');
      setSelectedCategory(null);
    } else if (currentView === 'subjects') {
      setCurrentView('subgroups');
      setSelectedSubGroup(null);
    } else if (currentView === 'years') {
      setCurrentView('subjects');
      setSelectedSubject(null);
    }
  }, [currentView]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentView]);

  // Check for pending resource after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const pendingStr = localStorage.getItem('pendingResource');
      if (pendingStr) {
        const item = JSON.parse(pendingStr);
        localStorage.removeItem('pendingResource');
        toast({
          title: "Welcome Back!",
          description: "Your requested resource is ready to view.",
        });
        setPreviewItem(item);
      }
    }
  }, [isAuthenticated, toast]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (previewItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewItem]);

  const getPdfPath = (item) => {
    const slug = item.category?.toLowerCase().replace(/\s+/g, '-') || 'resource';
    const subjectSlug = item.subject?.toLowerCase().replace(/\s+/g, '-') || 'general';
    const yearSlug = item.year || 'latest';
    return `/resources/${slug}/${subjectSlug}/${yearSlug}.pdf`;
  };

  const categories = [
    {
      slug: 'placement-papers',
      title: "Company-wise Placement Question Papers",
      subtitle: "Explore previous years' placement papers organized by top companies",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      subGroups: [
        {
          slug: 'tech-companies',
          title: "Tech Companies",
          description: "Papers from leading tech firms like IT services and software giants",
          icon: Building2,
          companies: [
            { slug: 'tcs', title: "TCS", description: "Tata Consultancy Services placement papers" },
            { slug: 'infosys', title: "Infosys", description: "Infosys technical and aptitude tests" },
            { slug: 'wipro', title: "Wipro", description: "Wipro coding and interview papers" },
            { slug: 'accenture', title: "Accenture", description: "Accenture consulting papers" },
            { slug: 'cognizant', title: "Cognizant", description: "Cognizant GenC papers" },
            { slug: 'hcl', title: "HCL", description: "HCL Technologies papers" }
          ]
        },
        {
          slug: 'finance-companies',
          title: "Finance Companies",
          description: "Papers from banking and finance sectors including investment firms",
          icon: Landmark,
          companies: [
            { slug: 'hdfc', title: "HDFC", description: "HDFC Bank aptitude papers" },
            { slug: 'icici', title: "ICICI", description: "ICICI Bank recruitment tests" },
            { slug: 'sbi', title: "SBI", description: "State Bank of India PO papers" },
            { slug: 'goldman-sachs', title: "Goldman Sachs", description: "Investment banking papers" },
            { slug: 'jpmorgan', title: "JPMorgan", description: "JPMorgan Chase finance papers" },
            { slug: 'axis-bank', title: "Axis Bank", description: "Axis Bank clerical papers" }
          ]
        }
      ]
    },
    {
  slug: 'last-5-years-papers',
  title: "Last 5 Years Question Papers – Subject Wise (TN HSC)",
  subtitle: "Comprehensive board exam papers by subject for the past 5 years (Tamil Nadu HSC)",
  icon: FileText,
  color: "from-green-500 to-emerald-500",
  bgColor: "bg-green-50",
  iconColor: "text-green-600",
  subGroups: [
    {
      slug: 'science-group',
      title: "Science Group (PCMB / PCMC etc.)",
      description: "Plus Two Science stream – Physics, Chemistry, Maths, Biology & allied subjects",
      icon: GraduationCap,
      subjects: [
        { slug: 'physics',            title: "Physics",             description: "TN HSC Physics question papers" },
        { slug: 'chemistry',          title: "Chemistry",           description: "TN HSC Chemistry question papers" },
        { slug: 'mathematics',        title: "Mathematics",         description: "TN HSC Mathematics question papers" },
        { slug: 'biology',            title: "Biology (Botany/Zoology)", description: "TN HSC Biology – Botany & Zoology question papers" },
        { slug: 'computer-science',   title: "Computer Science",     description: "TN HSC Computer Science question papers" },
        { slug: 'english',            title: "English (Core / Elective)", description: "TN HSC English question papers" }
      ]
    },
    {
      slug: 'commerce-group',
      title: "Commerce Group",
      description: "Plus Two Commerce stream – Accountancy, Economics, Business Studies, etc.",
      icon: Users2,
      subjects: [
        { slug: 'accountancy',     title: "Accountancy",     description: "TN HSC Accountancy question papers" },
        { slug: 'economics',       title: "Economics",       description: "TN HSC Economics question papers" },
        { slug: 'business-studies',title: "Business Studies",description: "TN HSC Business Studies question papers" },
        { slug: 'commerce-maths',  title: "Business Maths/Statistics", description: "TN HSC Business Mathematics & Statistics question papers" },
        { slug: 'english',         title: "English (Core / Elective)", description: "TN HSC English question papers" }
      ]
    },
    {
      slug: 'arts-group',
      title: "Arts / Humanities Group",
      description: "Plus Two Arts stream – History, Political Science, Geography, Sociology, etc.",
      icon: Lightbulb,
      subjects: [
        { slug: 'history',        title: "History",        description: "TN HSC History question papers" },
        { slug: 'geography',      title: "Geography",      description: "TN HSC Geography question papers" },
        { slug: 'political-science', title: "Political Science", description: "TN HSC Political Science question papers" },
        { slug: 'sociology',      title: "Sociology",      description: "TN HSC Sociology question papers" },
        { slug: 'english',        title: "English (Core / Elective)", description: "TN HSC English question papers" }
      ]
    }
  ]
},
    {
      slug: 'interview-questions',
      title: "Company-wise Most Asked Interview Questions",
      subtitle: "Frequently asked technical and HR questions by leading companies",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      subGroups: [
        {
          slug: 'tech-interviews',
          title: "Tech Interviews",
          description: "Questions from tech giants covering DSA, system design",
          icon: Code,
          companies: [
            { slug: 'google', title: "Google", description: "Google coding and behavioral questions" },
            { slug: 'microsoft', title: "Microsoft", description: "Microsoft Azure and .NET interviews" },
            { slug: 'amazon', title: "Amazon", description: "Amazon leadership principles questions" },
            { slug: 'meta', title: "Meta", description: "Facebook React and algorithms" },
            { slug: 'apple', title: "Apple", description: "Apple iOS and privacy focus" },
            { slug: 'netflix', title: "Netflix", description: "Netflix streaming tech questions" }
          ]
        },
        {
          slug: 'non-tech-interviews',
          title: "Non-Tech Interviews",
          description: "HR and general questions for consulting and finance roles",
          icon: Users,
          companies: [
            { slug: 'deloitte', title: "Deloitte", description: "Deloitte consulting case studies" },
            { slug: 'kpmg', title: "KPMG", description: "KPMG audit and advisory questions" },
            { slug: 'pwc', title: "PwC", description: "PwC assurance and tax interviews" },
            { slug: 'ey', title: "EY", description: "EY risk and transaction services" },
            { slug: 'mckinsey', title: "McKinsey", description: "McKinsey strategy case interviews" },
            { slug: 'bain', title: "Bain & Company", description: "Bain management consulting questions" }
          ]
        }
      ]
    },
    {
      slug: 'resume-tips',
      title: "Resume Building & Tips",
      subtitle: "Expert guides to craft standout resumes and cover letters",
      icon: File,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      subGroups: [
        {
          slug: 'templates',
          title: "Resume Templates",
          description: "ATS-friendly templates for various industries",
          icon: FileText,
          companies: [
            { slug: 'tech-resume', title: "Tech Resume", description: "Templates for software engineers" },
            { slug: 'finance-resume', title: "Finance Resume", description: "Templates for analysts" },
            { slug: 'marketing-resume', title: "Marketing Resume", description: "Creative templates for marketers" },
            { slug: 'general-resume', title: "General Resume", description: "Entry-level templates" }
          ]
        },
        {
          slug: 'tips',
          title: "Resume Tips",
          description: "Pro tips to optimize your resume for recruiters",
          icon: Lightbulb,
          companies: [
            { slug: 'keywords', title: "ATS Keywords", description: "How to beat applicant tracking systems" },
            { slug: 'quantify', title: "Quantify Achievements", description: "Using numbers to showcase impact" },
            { slug: 'cover-letter', title: "Cover Letters", description: "Crafting compelling cover letters" },
            { slug: 'common-mistakes', title: "Avoid Mistakes", description: "Top resume pitfalls to avoid" }
          ]
        }
      ]
    },
    {
      slug: 'career-advice',
      title: "Career Advice & Success Stories",
      subtitle: "Inspirational stories and expert advice from industry leaders",
      icon: Megaphone,
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      subGroups: [
        {
          slug: 'success-stories',
          title: "Success Stories",
          description: "Real student journeys to top companies",
          icon: Award,
          companies: [
            { slug: 'iit-graduate', title: "IIT Graduate to Google", description: "From campus to Silicon Valley" },
            { slug: 'commerce-to-finance', title: "Commerce to Finance", description: "Breaking into banking" },
            { slug: 'self-taught-dev', title: "Self-Taught Developer", description: "No degree to FAANG" },
            { slug: 'women-in-tech', title: "Women in Tech", description: "Empowering female engineers" }
          ]
        },
        {
          slug: 'advice',
          title: "Expert Advice",
          description: "Tips on networking, skill-building, and career growth",
          icon: Users,
          companies: [
            { slug: 'networking', title: "Networking Tips", description: "Building professional connections" },
            { slug: 'skill-development', title: "Skill Development", description: "Continuous learning strategies" },
            { slug: 'salary-negotiation', title: "Salary Negotiation", description: "Getting what you deserve" },
            { slug: 'work-life-balance', title: "Work-Life Balance", description: "Thriving in high-pressure roles" }
          ]
        }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.slug === selectedCategory);
  const currentSubGroup = currentCategory?.subGroups?.find(sg => sg.slug === selectedSubGroup);
  const years = [2025, 2024, 2023, 2022, 2021]; // Updated to current year

  // Get items for subjects view (handle both subjects and companies)
  const getCurrentItems = () => {
    if (currentSubGroup?.subjects) {
      return currentSubGroup.subjects;
    } else if (currentSubGroup?.companies) {
      return currentSubGroup.companies.map(company => ({
        ...company,
        description: company.description || `${company.title} related resources`
      }));
    }
    return [];
  };

  // Render specific view with transition
  const renderView = () => {
    const items = getCurrentItems();
    const currentSubject = items.find(item => item.slug === selectedSubject);
    const transitionClass = "transition-all duration-300 ease-in-out opacity-100 transform translate-y-0";

    if (currentView === 'categories') {
      return (
        <motion.section 
          variants={slideVariants}
          className={`py-8 md:py-20 lg:py-32 pb-20 md:pb-40 lg:pb-56 bg-gradient-to-br from-background via-muted/30 to-primary/10 overflow-hidden ${transitionClass}`}
        >
          {/* Floating rings */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 border-2 border-secondary/20 rounded-full animate-spin-reverse"></div>
          </div>

          <div ref={resourcesRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Badge className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 shadow-lg mb-4 md:mb-6 hover:text-white">
                  <Zap className="h-5 w-5 mr-2" strokeWidth={2} />
                  Essential Resources for 12th Students
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 md:mb-6"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
                >
                  Unlock Your <span className="gradient-text">Future Success</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground leading-tight"
                >
                  with Premium Resources
                </motion.p>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed"
              >
                Dive into a world of expertly curated study materials, past papers, interview prep, resume tips, and success stories. Tailored just for you to conquer exams, ace interviews, and land dream jobs.
              </motion.p>
              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="mb-12 md:mb-16"
              >
                <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8">
                  <div className="flex justify-between md:justify-center gap-4 md:gap-8 w-full md:w-auto">
                    <div className="text-center min-w-[100px] md:min-w-[120px] py-4 flex-1 md:flex-none">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">1000+</div>
                      <div className="text-sm md:text-base text-muted-foreground">Question Papers</div>
                    </div>
                    <div className="text-center min-w-[100px] md:min-w-[120px] py-4 flex-1 md:flex-none">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">100+</div>
                      <div className="text-sm md:text-base text-muted-foreground">Companies Covered</div>
                    </div>
                  </div>
                  <div className="text-center min-w-[120px] py-4 md:flex-none">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">20K+</div>
                    <div className="text-sm md:text-base text-muted-foreground">Students Helped</div>
                  </div>
                </div>
              </motion.div>
              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <CategoryCard 
                      category={category} 
                      onSelect={handleCategorySelect}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      );
    } else if (currentView === 'subgroups') {
      return (
        <motion.section 
          variants={slideVariants}
          className={`min-h-screen py-8 md:py-20 lg:py-32 pb-20 md:pb-40 lg:pb-56 bg-background/50 ${transitionClass}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 md:mb-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center mx-auto text-secondary hover:text-foreground text-base md:text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" strokeWidth={2} />
                  Back to Resources
                </Button>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6"
              >
                {currentCategory.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed"
              >
                {currentCategory.subtitle} Explore detailed resources tailored to your needs.
              </motion.p>
            </div>
            {/* Subgroups Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              {currentCategory.subGroups.map((subgroup, index) => (
                <motion.div
                  key={subgroup.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SubGroupCard subgroup={subgroup} onSelect={handleSubGroupSelect} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
    } else if (currentView === 'subjects') {
      return (
        <motion.section 
          variants={slideVariants}
          className={`min-h-screen py-8 md:py-20 lg:py-32 pb-20 md:pb-40 lg:pb-56 bg-background ${transitionClass}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 md:mb-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center mx-auto text-secondary hover:text-foreground text-base md:text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" strokeWidth={2} />
                  Back to {currentCategory.title}
                </Button>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-4"
              >
                {currentSubGroup.title}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              >
                {currentSubGroup.description} Select from a wide range of topics and companies.
              </motion.p>
            </div>
            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.18 }}
                >
                  <SubjectCard subject={item} onSelect={handleSubjectSelect} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
    } else if (currentView === 'years') {
      return (
        <motion.section 
          variants={slideVariants}
          className={`min-h-screen py-8 md:py-20 lg:py-32 pb-20 md:pb-40 lg:pb-56 bg-gradient-to-r from-primary/5 to-secondary/5 ${transitionClass}`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 md:mb-6"
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="flex items-center mx-auto text-secondary hover:text-foreground text-base md:text-lg"
                >
                  <ArrowRight className="h-5 w-5 mr-2 rotate-180" strokeWidth={2} />
                  Back to {currentSubGroup.title}
                </Button>
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4"
              >
                {currentSubject?.title} Papers
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Select a year to view or download the question paper. Includes solutions and analysis for better preparation.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="space-y-3 md:space-y-4">
                    {years.map((year, index) => (
                      <motion.div
                        key={year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <YearPaperButton
                          year={year}
                          subject={currentSubject}
                          category={currentCategory.title}
                          onView={handleView}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Overlay */}
      {isCategoryLoading && <LoadingOverlay message="Preparing your resources..." />}

      {/* Dynamic View with Slide Transitions */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={slideVariants}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <PreviewModal
          previewItem={previewItem}
          onClose={() => setPreviewItem(null)}
          getPdfPath={getPdfPath}
        />
      )}
    </div>
  );
};

export default Resources;