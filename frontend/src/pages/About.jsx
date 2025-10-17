import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { companyLogos } from "@/components/CompanyLogos";
import ScrollToTop from "@/components/ScrollToTop";
import {
  ArrowRight,
  Heart,
  Lightbulb,
  Shield,
  BarChart3,
  CheckCircle,
  Zap,
  Target,
  Users2,
  Clock,
  Star,
  Users,
  TrendingUp,
  Award,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BookOpen,
} from "lucide-react";

// Reusable Value Card
const ValueCard = ({ value, index }) => (
  <Card
    key={index}
    className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm overflow-hidden"
  >
    <CardContent className="p-6 md:p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-3xl ${value.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        <value.icon className={`h-8 w-8 md:h-10 md:w-10 ${value.iconColor}`} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center text-foreground group-hover:text-primary transition-colors">
        {value.title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground text-center leading-relaxed">
        {value.description}
      </p>
    </CardContent>
  </Card>
);

// Reusable Timeline Item (Vertical for better mobile)
const TimelineItem = ({ item, index }) => (
  <div className="relative mb-8 last:mb-0">
    <div className="flex items-center mb-4">
      <div className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <Calendar className="h-4 w-4 text-primary mr-2" />
          <span className="font-bold text-primary text-sm">{item.year}</span>
        </div>
        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
    {index < 5 && <div className="absolute left-1.5 top-4 h-20 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>}
  </div>
);

// Reusable Impact Card
const ImpactCard = ({ impact, index }) => (
  <Card key={index} className="group hover-lift bg-white/20 backdrop-blur-md border-0">
    <CardContent className="p-6 text-center">
      <impact.icon className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-primary group-hover:scale-110 transition-transform" />
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{impact.title}</h3>
      <p className="text-primary-foreground/90 text-sm md:text-base">{impact.description}</p>
      <div className="mt-3 md:mt-4 h-1 w-0 group-hover:w-full bg-white rounded-full transition-all duration-300"></div>
    </CardContent>
  </Card>
);

// Enhanced Hero Section with Page Load Animations
const AboutHeroSection = ({ heroRef }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-primary/20 overflow-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,theme(colors.primary/0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_50%_50%,theme(colors.secondary/0.1),transparent_70%)] rounded-full blur-3xl animate-bounce-slow"></div>
      {/* Floating particles or subtle animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 border-2 border-secondary/20 rounded-full animate-spin-reverse"></div>
      </div>

      <div
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 w-full opacity-0 fade-in-hero"
      >
        <Badge className="mb-6 inline-flex items-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg fade-in-hero-item delay-100">
          <Heart className="h-4 w-4 mr-2" />
          Empowering Careers Since 2020
        </Badge>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight text-foreground fade-in-hero-item delay-200">
          About <span className="block gradient-text">P2P</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed px-4 fade-in-hero-item delay-400">
          At P2P Career Guidance, we don’t just guide careers—we shape futures. Powered by AI and driven by excellence, we prepare the right candidates for the right roles in the world’s top MNCs. From personalized coaching and skill development to global placement support, we transform potential into performance and dreams into destinations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-hero-item delay-600">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl text-base md:text-lg px-8 md:px-10 py-4 h-auto font-semibold w-full sm:w-auto"
            asChild
          >
            <Link to="/register">
              Start Guiding Your Path
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-black text-black hover:bg-primary/90 text-base md:text-lg px-8 md:px-10 py-4 h-auto w-full sm:w-auto"
            asChild
          >
            <Link to="/courses">
              Explore Services
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
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

// Detailed Story Section
const StorySection = ({ storyRef }) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/10">
      <div
        ref={storyRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <GradientHeading size="xl" className="mb-4 md:mb-6">
            Our Origin<span className="gradient-text">Story</span>
          </GradientHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Born in the chaos of post-pandemic education shifts, P2P was founded by a team of educators, tech innovators, and career coaches who witnessed firsthand the struggles of Indian students. With over a decade of combined experience in counseling and recruitment, we set out to create a platform that doesn't just advise—but truly transforms lives.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">The <span className="gradient-text">Challenge</span> We Tackled</h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              In India, millions of students face overwhelming choices after 12th grade: Which college? What course? How to prepare for entrances? For college students, the leap to internships feels impossible without connections. And freshers? The job market is a maze. Traditional guidance is fragmented, expensive, and impersonal. P2P changes that with AI-driven personalization, expert networks, and end-to-end support.
            </p>
            <ul className="space-y-2 md:space-y-3 mt-4">
              {[
                "Over 70% of students feel lost in career decisions",
                "Internship access limited to top-tier colleges",
                "Job placement rates hover at 50% for freshers",
              ].map((point, idx) => (
                <li key={idx} className="flex items-start text-sm md:text-base">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-success mt-0.5 md:mt-1 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our <span className="gradient-text">Commitment</span></h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Today, P2P serves students across 28 states, partnering with 200+ institutions and 500+ companies. Our proprietary AI analyzes your profile—academics, skills, interests—to deliver bespoke roadmaps. From virtual counseling sessions to live webinars, we're with you from application to onboarding.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
              <Button variant="outline" size="sm" className="text-sm md:text-base w-full border-black">
                Read Our Blog
              </Button>
              <Button size="sm" className="text-sm md:text-base w-full">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Timeline Section
const TimelineSection = ({ timelineRef }) => {
  const milestones = [
    {
      year: "2020",
      title: "Inception Amid Crisis",
      description: "Founded during COVID-19 lockdowns to provide virtual career counseling when physical access was impossible.",
    },
    {
      year: "2021",
      title: "AI Launch",
      description: "Rolled out our core AI engine, helping 2,000+ 12th graders secure college seats via smart matching.",
    },
    {
      year: "2022",
      title: "Internship Revolution",
      description: "Launched the Internship Portal, placing 1,500 college students in roles at startups and MNCs.",
    },
    {
      year: "2023",
      title: "Job Placement Surge",
      description: "Expanded to freshers, achieving 85% placement rate through AI job matching and mock interviews.",
    },
    {
      year: "2024",
      title: "National Expansion",
      description: "Partnered with IITs and IIMs, scaling to 50,000 users with multilingual support.",
    },
    {
      year: "2025",
      title: "Future Horizons",
      description: "Integrating VR simulations for skill training, preparing students for AI-driven job markets.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div
        ref={timelineRef}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <GradientHeading size="lg" className="mb-4 md:mb-6">
            Milestone <span className="gradient-text">That Matter</span>
          </GradientHeading>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A timeline of innovation and impact, marking our growth from a startup idea to a career ecosystem.
          </p>
        </div>
        <div className="space-y-0">
          {milestones.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Values Section
const ValuesSection = ({ valuesRef }) => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We harness AI and emerging tech to deliver guidance that's always one step ahead of tomorrow's jobs.",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Ethical Guidance",
      description: "Transparency and fairness in every recommendation, ensuring decisions align with your values and ethics.",
      bgColor: "bg-gradient-to-r from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Your success is our heartbeat—personalized, empathetic support that celebrates your unique journey.",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
      iconColor: "text-green-600",
    },
    {
      icon: BarChart3,
      title: "Data-Driven",
      description: "Backed by real-time industry data and success metrics to guarantee outcomes you can trust.",
      bgColor: "bg-gradient-to-r from-orange-50 to-red-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/10">
      <div
        ref={valuesRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Core <span className="gradient-text">Values</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            These pillars guide our every action, from product development to user interactions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <ValueCard value={value} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Impact Section
const ImpactSection = ({ impactRef }) => {
  const impacts = [
    {
      icon: Zap,
      title: "Personalized Pathways",
      description: "AI crafts custom career maps, reducing decision time by 60% for users.",
    },
    {
      icon: Target,
      title: "Internship Boost",
      description: "95% of college users secure paid internships within 3 months.",
    },
    {
      icon: Users2,
      title: "Job Readiness",
      description: "Freshers report 40% higher interview success with our prep tools.",
    },
    {
      icon: Clock,
      title: "Lifelong Access",
      description: "Subscribe once, get updates for life as your career evolves.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/5"></div>
      <div
        ref={impactRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Real <span className="text-black/90">Impact</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Beyond numbers, we're about stories of growth and achievement.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {impacts.map((impact, index) => (
            <ImpactCard impact={impact} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section (Simplified)
const TestimonialsSection = ({ testimonialsRef }) => {
  const testimonials = [
    {
      name: "Aarav Mehta",
      role: "12th Grader, Now at BITS Pilani",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "P2P's college matcher was a lifesaver—got into my dream college without the stress!",
      rating: 5,
    },
    {
      name: "Sneha Rao",
      role: "B.Com Student, Internship at Deloitte",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The internship portal connected me with opportunities I never imagined possible.",
      rating: 5,
    },
    {
      name: "Kiran Gupta",
      role: "Fresh Graduate, Hired at Infosys",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "From resume tweaks to final offer—P2P guided me all the way. Game-changer!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background/50">
      <div
        ref={testimonialsRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Voices <span className="gradient-text">of Change</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear directly from those who've walked the path with us.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow border-0 bg-white/60">
              <CardContent className="p-6">
                <div className="flex items-center mb-3 md:mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-3 md:mr-4" />
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">"{testimonial.content}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partners Section
const PartnersSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <GradientHeading size="lg" className="mb-4">
            <span className="gradient-text">Trusted</span> By Leaders
          </GradientHeading>
          <p className="text-lg text-muted-foreground">
            Collaborating with top minds to shape the future of careers.
          </p>
        </div>
        <div className="flex justify-center">
          <LogoCarousel columnCount={4} logos={companyLogos} />
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary/95 to-secondary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          Your <span className="text-black/90">Career</span> Story Starts Here
        </h2>
        <p className="text-lg md:text-xl mb-8 md:mb-12 text-primary-foreground/90">
          Join the P2P community and unlock a world of possibilities.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 shadow-2xl text-base md:text-lg px-10 md:px-12 py-4 h-auto font-semibold"
          asChild
        >
          <Link to="/register">
            Get Personalized Guidance
            <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section className="py-12 md:py-16 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Let's <span className="gradient-text">Connect</span>
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
          Ready to discuss how we can support your journey? Reach out today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
            <MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-muted-foreground">Chennai, India</span>
          </div>
          <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
            <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-muted-foreground">+91 98765 43210</span>
          </div>
          <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
            <Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-muted-foreground">p2pcareerguidance@gmail.com</span>
          </div>
        </div>
        <Button variant="outline" size="lg" asChild className="text-base md:text-lg border-black">
          <Link to="/contact">
            Full Contact Form
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

const About = () => {
  const heroRef = useScrollAnimation();
  const storyRef = useScrollAnimation();
  const timelineRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const impactRef = useScrollAnimation();
  const testimonialsRef = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <AboutHeroSection heroRef={heroRef} />
      <StorySection storyRef={storyRef} />
      <TimelineSection timelineRef={timelineRef} />
      <ValuesSection valuesRef={valuesRef} />
      <ImpactSection impactRef={impactRef} />
      <TestimonialsSection testimonialsRef={testimonialsRef} />
      <PartnersSection />
      <CTASection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
};

export default About;