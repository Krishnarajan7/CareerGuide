import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import InfiniteCarousel from "@/components/InfiniteCarousel";
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
} from "lucide-react";

const Home = () => {
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();

  const userTypes = [
    {
      icon: "🧑‍🎓",
      title: "College-Joining Students",
      description:
        "Get guidance on college selection, course recommendations, and career planning based on your interests and academic performance.",
      features: [
        "College Recommendations",
        "Course Selection",
        "Career Mapping",
        "Scholarship Info",
      ],
    },
    {
      icon: "🎓",
      title: "College Students",
      description:
        "Access internship opportunities, skill development programs, and industry insights to boost your career prospects.",
      features: [
        "Internship Portal",
        "Skill Assessment",
        "Industry Connect",
        "Project Guidance",
      ],
    },
    {
      icon: "👨‍💻",
      title: "Freshers",
      description:
        "Land your dream job with interview preparation, resume optimization, and personalized job recommendations.",
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
        "CareerGuide helped me land my dream job! The personalized guidance and interview preparation were game-changers.",
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
        "From college selection to job placement, CareerGuide was with me every step of the way. Highly recommended!",
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

  // Company logos for the infinite carousel
  const companyLogos = [
    <div
      key="google"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
        Google
      </span>
    </div>,
    <div
      key="microsoft"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-blue-600">Microsoft</span>
    </div>,
    <div
      key="amazon"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-orange-500">Amazon</span>
    </div>,
    <div
      key="apple"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-gray-800">Apple</span>
    </div>,
    <div
      key="netflix"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-red-600">Netflix</span>
    </div>,
    <div
      key="tesla"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-gray-900">Tesla</span>
    </div>,
    <div
      key="spotify"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-green-600">Spotify</span>
    </div>,
    <div
      key="uber"
      className="flex items-center justify-center h-20 w-40 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <span className="text-2xl font-bold text-black">Uber</span>
    </div>,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating bubbles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float floating-bubble"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float floating-bubble"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-float floating-bubble"
          style={{ animationDelay: "4s" }}
        ></div>

        <div
          ref={heroRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate pt-20"
        >
          <Badge className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary-foreground border-primary/20 hover-lift">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Career Guidance Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in">
            Find Your{" "}
            <span className="gradient-text animate-pulse">Next Step</span>
            <br />
            <span className="inline-block animate-[fade-in_1s_ease-out_0.5s_both]">
              in Your Career Journey
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed animate-[fade-in_1s_ease-out_1s_both]">
            Personalized AI-powered guidance for students and freshers to
            navigate their career path with confidence and achieve their dreams
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-[fade-in_1s_ease-out_1.5s_both]">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light shadow-xl text-lg px-8 py-4 h-auto hover-lift group"
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
              className="border-primary/30 hover:border-primary/60 text-lg px-8 py-4 h-auto hover-lift"
              asChild
            >
              <Link to="/courses">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Courses
              </Link>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="text-center hover-lift">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-24 page-bg-alternate">
        <div
          ref={featuresRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Designed for <span className="gradient-text">Every Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're starting college, currently studying, or ready to
              enter the workforce, we have the perfect guidance for your career
              stage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card key={index} className="content-section hover-lift group">
                <CardContent className="p-8">
                  <div className="text-6xl mb-6 text-center group-hover:animate-bounce">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                    {type.description}
                  </p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-light to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          ref={statsRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join our growing community of successful students and
              professionals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-lift">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 page-bg-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">CareerGuide?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="content-section hover-lift group text-center"
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 page-bg-alternate">
        <div
          ref={testimonialsRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our students who have successfully transformed their
              careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="content-section hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Trusted by Leading Companies
          </h3>
          <div className="content-section p-8">
            <InfiniteCarousel items={companyLogos} speed="normal" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-light to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-12 text-primary-foreground/90">
            Join thousands of students who have already started their journey to
            success
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-8 py-4 h-auto hover-lift group"
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
