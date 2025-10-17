import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionSearchBar } from "@/components/ui/action-search-bar";
import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { companyLogos } from "@/components/CompanyLogos";
import SectionHeader from "@/components/SectionHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useContext, useEffect, useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Zap,
  Target,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Sparkles,
  GraduationCap,
  Briefcase,
  Calculator,
  Palette,
  Stethoscope,
  Code,
  Building,
  Atom,
  Download,
  Eye,
  X,
  Fish,
  Scale,
  Wrench,
  Leaf
} from "lucide-react";

// Reusable Study Goal Card
const StudyGoalCard = ({ goal, index, onView }) => (
  <Card
    key={index}
    className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-primary/50"
  >
    <CardContent className="p-6 text-center">
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${goal.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
      >
        <goal.icon className={`h-8 w-8 ${goal.iconColor}`} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
        {goal.title}
      </h3>
      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80">
        {goal.subtitle}
      </p>
      <div
        className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500 mt-4 mx-auto`}
      ></div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full group-hover:bg-primary/10 hover:text-primary transition-colors"
        onClick={(e) => {
          e.stopPropagation(); 
          onView(goal);
        }}
      >
        <Eye className="h-4 w-4 mr-2" strokeWidth={2} />
        View College List
      </Button>
    </CardContent>
  </Card>
);

// Reusable User Type Card
const UserTypeCard = ({ type, index }) => (
  <Card key={index} className="hover-lift group">
    <CardContent className="p-8">
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <type.icon className="h-10 w-10 text-primary" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold mb-4 text-center">{type.title}</h3>
      <p className="text-muted-foreground mb-6 text-center leading-relaxed">
        {type.description}
      </p>
      <div className="space-y-3">
        {type.features.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" strokeWidth={2} />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Reusable Stat Card
const StatCard = ({ stat, index }) => (
  <div key={index} className="text-center group hover-lift">
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300">
      <stat.icon className="h-10 w-10 mx-auto mb-4 text-accent" strokeWidth={2} />
      <div className="text-2xl font-bold mb-2">{stat.value}</div>
      <div className="text-primary-foreground/80">{stat.label}</div>
    </div>
  </div>
);

// Reusable Feature Card
const FeatureCard = ({ feature, index }) => (
  <Card key={index} className="hover-lift group text-center">
    <CardContent className="p-8">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <feature.icon className="h-8 w-8 text-primary" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </CardContent>
  </Card>
);

// Reusable Testimonial Card
const TestimonialCard = ({ testimonial, index }) => (
  <Card key={index} className="hover-lift">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mr-4 object-cover"
          loading="lazy"
        />
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" strokeWidth={2} />
        ))}
      </div>
      <p className="text-muted-foreground italic">"{testimonial.content}"</p>
    </CardContent>
  </Card>
);

// Hero Section 
const HeroSection = ({ heroRef, handleCollegeSelect, studyGoals, onView }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-primary/20 overflow-hidden py-12 md:py-16">
      {/* Background decoration with rings and gradients */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_50%_50%,theme(colors.secondary/0.1),transparent_70%)] rounded-full blur-3xl animate-bounce-slow"></div>
      {/* Floating rings */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 border-2 border-secondary/20 rounded-full animate-spin-reverse"></div>
      </div>

      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate z-10 pt-12 sm:pt-16 md:pt-12 lg:pt-12 opacity-0 fade-in-hero"
      >
        <Badge className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 shadow-lg hover:text-white fade-in-hero-item delay-100">
          <Sparkles className="h-5 w-5 mr-2" strokeWidth={2} />
          AI-Powered Career Guidance
        </Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-snug tracking-tight fade-in-hero-item delay-200">
          Discover Your <span className="gradient-text">Career Path</span>
          <br />
          <span className="inline-block">with Confidence</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed fade-in-hero-item delay-400">
          Unlock your potential with personalized, AI-driven guidance to
          navigate your career journey and achieve your dreams.
        </p>

        <div className="mb-12 max-w-2xl mx-auto fade-in-hero-item delay-500">
          <ActionSearchBar onCollegeSelect={handleCollegeSelect} />
        </div>

        <div className="mb-16 fade-in-hero-item delay-600">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Choose Your Study Goal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studyGoals.map((goal, index) => (
              <StudyGoalCard goal={goal} index={index} key={index} onView={onView} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-hero-item delay-700">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light shadow-xl text-lg px-8 py-3 h-auto hover-lift group w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 hover:border-primary/60 text-lg px-8 py-3 h-auto hover-lift w-full sm:w-auto"
            asChild
          >
            <Link to="/courses">
              <BookOpen className="h-5 w-5 mr-2" strokeWidth={2} />
              Explore Courses
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
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();
  const [previewGoal, setPreviewGoal] = useState(null);

  const handleCollegeSelect = (college) => {
    navigate(`/college/${college.id}`);
  };

  // Handler for view button click (now opens preview instead of download)
  const handleView = useCallback((goal) => {
    if (!isAuthenticated) {
      toast({
        title: "Unlock College Lists",
        description: "Please complete your registration to view college lists.",
      });
      localStorage.setItem('pendingView', JSON.stringify(goal));
      navigate('/register');
      return;
    }
    setPreviewGoal(goal);
    toast({
      title: "College List Ready",
      description: `${goal.title} College List is now available to view.`,
    });
  }, [isAuthenticated, navigate, toast]);

  // Check for pending view after authentication
  useEffect(() => {
    if (isAuthenticated) {
      const pendingStr = localStorage.getItem('pendingView');
      if (pendingStr) {
        const goal = JSON.parse(pendingStr);
        localStorage.removeItem('pendingView');
        toast({
          title: "Welcome Back!",
          description: "Your requested college list is ready to view.",
        });
        setPreviewGoal(goal);
      }
    }
  }, [isAuthenticated, toast]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (previewGoal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewGoal]);

  const getPdfPath = (goal) => `/pdfs/${goal.title.toLowerCase()}.pdf`;

  const studyGoals = [
    {
    icon: Code,
    title: "Engineering",
    subtitle: "BE/B.Tech, Diploma, M.Tech",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Briefcase,
    title: "Management",
    subtitle: "MBA, BBA, PGDM",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Calculator,
    title: "Commerce",
    subtitle: "B.Com, M.Com, CA, CS",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Palette,
    title: "Arts",
    subtitle: "BA, MA, Fine Arts, Design",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Stethoscope,
    title: "Medical",
    subtitle: "MBBS, BDS, BAMS, Nursing",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    icon: Atom,
    title: "Science",
    subtitle: "B.Sc, M.Sc, Research",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Building,
    title: "Architecture",
    subtitle: "B.Arch, M.Arch, Planning",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "B.Ed, M.Ed, D.Ed",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Scale, 
    title: "Law",
    subtitle: "LLB, LLM, B.A. LL.B, Corporate Law",
    color: "from-rose-500 to-fuchsia-500",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Wrench, 
    title: "Polytechnic",
    subtitle: "Diploma in Engineering, Technical Education",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
  },
  {
    icon: Fish, 
    title: "Fisheries",
    subtitle: "B.F.Sc, M.F.Sc, Aquaculture, Marine Science",
    color: "from-sky-500 to-blue-400",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    icon: Leaf,
    title: "Agriculture",
    subtitle: "B.Sc Agri, M.Sc Agri, Horticulture, Agronomy",
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-50",
    iconColor: "text-lime-600",
  },
    
  ];

  const userTypes = [
    {
      icon: Target,
      title: "12th Students",
      description:
        "Get AI-powered guidance on college selection, course recommendations, and strategic career planning based on your interests and academic performance.",
      features: [
        "College Recommendations",
        "Course Selection",
        "Career Mapping",
        "Scholarship Info",
      ],
    },
    {
      icon: GraduationCap,
      title: "College Students",
      description:
        "Access premium internship opportunities, advanced skill development programs, and exclusive industry insights to accelerate your career trajectory.",
      features: [
        "Internship Portal",
        "Skill Assessment",
        "Industry Connect",
        "Project Guidance",
      ],
    },
    {
      icon: Briefcase,
      title: "Freshers",
      description:
        "Land your dream job with professional interview preparation, expert resume optimization, and AI-driven personalized job recommendations.",
      features: [
        "Job Matching",
        "Interview Prep",
        "Resume Builder",
        "Salary Insights",
      ],
    },
  ];

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Students Guided",
      color: "text-primary",
    },
    {
      icon: BookOpen,
      value: "50+",
      label: "Courses Available",
      color: "text-secondary",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      color: "text-accent",
    },
    {
      icon: Award,
      value: "500+",
      label: "Companies Partner",
      color: "text-success",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TCS",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content:
        "P2P Career Guidance helped me land my dream job! The personalized guidance and interview preparation were game-changers.",
      rating: 5,
    },
    {
      name: "Rohit Kumar",
      role: "Data Scientist at Flipkart",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "The AI-powered recommendations were spot-on. I got placed in my preferred company within 3 months!",
      rating: 5,
    },
    {
      name: "Anita Patel",
      role: "Product Manager at Zomato",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "From college selection to job placement, P2P Career Guidance was with me every step of the way. Highly recommended!",
      rating: 5,
    },
    {
      name: "Karan Mehta",
      role: "Frontend Developer at Swiggy",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content:
        "The mentorship and project guidance helped me land my first role as a frontend developer. Truly amazing experience!",
      rating: 5,
    },
    {
      name: "Sneha Gupta",
      role: "Backend Developer at Zomato",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      content:
        "Excellent support and practical guidance. I felt confident during my interviews and secured my dream backend role.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Data Analyst at Amazon",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face",
      content:
        "The career guidance platform was instrumental in helping me analyze and improve my skills. Highly recommend it!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match you with perfect opportunities",
    },
    {
      icon: Target,
      title: "Personalized Guidance",
      description: "Tailored advice based on your unique profile and goals",
    },
    {
      icon: Globe,
      title: "Industry Network",
      description: "Connect with professionals and companies in your field",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your career queries",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        heroRef={heroRef}
        handleCollegeSelect={handleCollegeSelect}
        studyGoals={studyGoals}
        onView={handleView}
      />

      {/* Preview Modal */}
      {previewGoal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{previewGoal.title} College List</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewGoal(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <iframe
                src={getPdfPath(previewGoal)}
                className="w-full h-[60vh] border"
                title={`${previewGoal.title} PDF Preview`}
              />
            </div>
            <div className="p-6 border-t flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  window.open(getPdfPath(previewGoal), '_blank');
                }}
              >
                <Eye className="h-4 w-4 mr-2" strokeWidth={2} />
                View Full Size
              </Button>
              <a
                href={getPdfPath(previewGoal)}
                download={`${previewGoal.title.toLowerCase()}-college-list.pdf`}
              >
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Download PDF
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* User Types Section */}
      <section className="py-20 bg-background/50">
        <div
          ref={featuresRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed for <span className="gradient-text">Every Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're starting college, currently studying, or entering
              the workforce, we provide tailored guidance for your career stage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <UserTypeCard type={type} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          ref={statsRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join our growing community of successful students and
              professionals.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard stat={stat} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose{" "}
              <span className="gradient-text">P2P Career Guidance?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard feature={feature} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background/50">
        <div
          ref={testimonialsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our students who have successfully transformed their
              careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg md:text-xl mb-12 text-primary-foreground/90">
            Join thousands of students who have already started their journey to
            success
          </p>
          <Button
            size="lg"
            className="bg-white text-black/90 hover:bg-white/90 shadow-xl text-lg px-8 py-3 h-auto hover-lift group w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="pt-40  bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <GradientHeading size="lg" variant="default">
              Trusted by <span className="gradient-text" size="lg">Leading Tech Companies</span>
            </GradientHeading>
          </div>
          <div className="flex justify-center">
            <LogoCarousel columnCount={3} logos={companyLogos} />
          </div>
        </div>
      </section>
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Home;