import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActionSearchBar } from "@/components/ui/action-search-bar";
import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import SectionHeader from "@/components/SectionHeader";
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
  Atom
} from "lucide-react";

// Reusable Study Goal Card
const StudyGoalCard = ({ goal, index }) => (
  <Card
    key={index}
    className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-primary/50"
  >
    <CardContent className="p-6 text-center">
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${goal.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <goal.icon className={`h-8 w-8 ${goal.iconColor}`} />
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
    </CardContent>
  </Card>
);

// Reusable User Type Card
const UserTypeCard = ({ type, index }) => (
  <Card key={index} className="hover-lift group">
    <CardContent className="p-8">
      <div className="text-5xl mb-6 text-center group-hover:animate-bounce">{type.icon}</div>
      <h3 className="text-xl font-bold mb-4 text-center">{type.title}</h3>
      <p className="text-muted-foreground mb-6 text-center leading-relaxed">{type.description}</p>
      <div className="space-y-3">
        {type.features.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
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
      <stat.icon className="h-10 w-10 mx-auto mb-4 text-accent" />
      <div className="text-2xl font-bold mb-2">{stat.value}</div>
      <div className="text-primary-foreground/80">{stat.label}</div>
    </div>
  </div>
);

// Reusable Feature Card
const FeatureCard = ({ feature, index }) => (
  <Card key={index} className="hover-lift group text-center">
    <CardContent className="p-8">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <feature.icon className="h-8 w-8 text-primary" />
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
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-muted-foreground italic">"{testimonial.content}"</p>
    </CardContent>
  </Card>
);

// Hero Section (adjusted padding to avoid navbar overlap)
const HeroSection = ({ heroRef, handleCollegeSelect, studyGoals }) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate z-10 pt-12 sm:pt-16 md:pt-12 lg:pt-12" 
      >
        <Badge className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 shadow-lg hover:text-white" >
          <Sparkles className="h-5 w-5 mr-2" />
          AI-Powered Career Guidance
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Discover Your{" "}
          <span className="gradient-text">Career Path</span>
          <br />
          <span className="inline-block">with Confidence</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Unlock your potential with personalized, AI-driven guidance to navigate your career journey and achieve your dreams.
        </p>

        <div className="mb-12 max-w-2xl mx-auto">
          <ActionSearchBar onCollegeSelect={handleCollegeSelect} />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
            Choose Your Study Goal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {studyGoals.map((goal, index) => (
              <StudyGoalCard goal={goal} index={index} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light shadow-xl text-lg px-8 py-3 h-auto hover-lift group w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              <Zap className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Start Your Journey
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 hover:border-primary/60 text-lg px-8 py-3 h-auto hover-lift w-full sm:w-auto"
            asChild
          >
            <Link to="/courses">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();

  const handleCollegeSelect = (college) => {
    navigate(`/college/${college.id}`);
  };

  const studyGoals = [
    {
      icon: Code,
      title: "Engineering",
      subtitle: "BE/B.Tech, Diploma, M.Tech",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      icon: Briefcase,
      title: "Management", 
      subtitle: "MBA, BBA, PGDM",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      icon: Calculator,
      title: "Commerce",
      subtitle: "B.Com, M.Com, CA, CS",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50", 
      iconColor: "text-green-600"
    },
    {
      icon: Palette,
      title: "Arts",
      subtitle: "BA, MA, Fine Arts, Design",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    },
    {
      icon: Stethoscope,
      title: "Medical",
      subtitle: "MBBS, BDS, BAMS, Nursing",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      icon: Atom,
      title: "Science",
      subtitle: "B.Sc, M.Sc, Research",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: Building,
      title: "Architecture",
      subtitle: "B.Arch, M.Arch, Planning",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      icon: GraduationCap,
      title: "Education",
      subtitle: "B.Ed, M.Ed, D.Ed",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600"
    }
  ];

  const userTypes = [
    {
      icon: "🎯",
      title: "College-Joining Students",
      description: "Get AI-powered guidance on college selection, course recommendations, and strategic career planning based on your interests and academic performance.",
      features: ["🏛️ College Recommendations", "📚 Course Selection", "🗺️ Career Mapping", "💰 Scholarship Info"]
    },
    {
      icon: "🚀",
      title: "College Students", 
      description: "Access premium internship opportunities, advanced skill development programs, and exclusive industry insights to accelerate your career trajectory.",
      features: ["💼 Internship Portal", "📊 Skill Assessment", "🤝 Industry Connect", "🔬 Project Guidance"]
    },
    {
      icon: "💎",
      title: "Freshers",
      description: "Land your dream job with professional interview preparation, expert resume optimization, and AI-driven personalized job recommendations.",
      features: ["🎯 Job Matching", "🎤 Interview Prep", "📋 Resume Builder", "💸 Salary Insights"]
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Students Guided", color: "text-primary" },
    { icon: BookOpen, value: "50+", label: "Courses Available", color: "text-secondary" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "text-accent" },
    { icon: Award, value: "500+", label: "Companies Partner", color: "text-success" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TCS",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "CareerGuide helped me land my dream job! The personalized guidance and interview preparation were game-changers.",
      rating: 5
    },
    {
      name: "Rohit Kumar",
      role: "Data Scientist at Flipkart",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The AI-powered recommendations were spot-on. I got placed in my preferred company within 3 months!",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Product Manager at Zomato",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "From college selection to job placement, CareerGuide was with me every step of the way. Highly recommended!",
      rating: 5
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match you with perfect opportunities"
    },
    {
      icon: Target,
      title: "Personalized Guidance",
      description: "Tailored advice based on your unique profile and goals"
    },
    {
      icon: Globe,
      title: "Industry Network",
      description: "Connect with professionals and companies in your field"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your career queries"
    }
  ];

  const companyLogos = [
    <div key="google" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Google</span>
    </div>,
    <div key="microsoft" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-blue-600">Microsoft</span>
    </div>,
    <div key="amazon" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-orange-500">Amazon</span>
    </div>,
    <div key="apple" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-gray-800">Apple</span>
    </div>,
    <div key="netflix" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-red-600">Netflix</span>
    </div>,
    <div key="tesla" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-gray-900">Tesla</span>
    </div>,
    <div key="spotify" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-green-600">Spotify</span>
    </div>,
    <div key="uber" className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300">
      <span className="text-2xl font-bold text-black">Uber</span>
    </div>,
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        heroRef={heroRef}
        handleCollegeSelect={handleCollegeSelect}
        studyGoals={studyGoals}
      />

      {/* User Types Section */}
      <section className="py-20 bg-background/50">
        <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed for <span className="gradient-text">Every Journey</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're starting college, currently studying, or entering the workforce, we provide tailored guidance for your career stage.
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
        <div ref={statsRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Thousands</h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join our growing community of successful students and professionals.
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
              Why Choose <span className="gradient-text">CareerGuide?</span>
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
        <div ref={testimonialsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our students who have successfully transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard testimonial={testimonial} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Partners"
            title="Trusted by Leading Companies"
            subtitle="Industry leaders that trust graduates using our platform"
          />
          <div className="p-8 mt-6">
            <InfiniteCarousel items={companyLogos} speed="normal" ariaLabel="trusted companies logos" />
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
            Join thousands of students who have already started their journey to success
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-3 h-auto hover-lift group w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              Get Started Today
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;