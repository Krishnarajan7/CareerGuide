import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight,
  Heart,
  BookOpen,
  Users,
  TrendingUp,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Resume Builder", href: "/resume-builder" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
  ];

  const resources = [
    { name: "Career Guide", href: "#", external: true },
    { name: "Interview Prep", href: "#", external: true },
    { name: "Blog & Articles", href: "#", external: true },
    { name: "Success Stories", href: "#", external: true },
    { name: "Help Center", href: "#", external: true },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Students Guided" },
    { icon: BookOpen, value: "50+", label: "Courses Available" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  return (
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-lift">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/20 backdrop-blur-lg p-3 rounded-xl border border-primary/30">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <span className="text-2xl font-bold">CareerGuide</span>
            </div>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Empowering students and freshers with personalized AI-powered career guidance 
              to navigate their career path with confidence and achieve their dreams.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-lg p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover-lift group border border-white/10"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              Quick Links
              <ArrowUpRight className="h-4 w-4 ml-2 text-primary" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              Resources
              <BookOpen className="h-4 w-4 ml-2 text-secondary" />
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href} 
                    target={resource.external ? "_blank" : "_self"}
                    rel={resource.external ? "noopener noreferrer" : ""}
                    className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-secondary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                    {resource.name}
                    {resource.external && <ExternalLink className="h-3 w-3 ml-1 opacity-60" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-12 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center space-x-4 group hover-lift">
              <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-white/60">Email us</div>
                <a href="mailto:support@careerguide.com" className="text-white hover:text-primary transition-colors duration-300">
                  support@careerguide.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group hover-lift">
              <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-white/60">Call us</div>
                <a href="tel:+911234567890" className="text-white hover:text-secondary transition-colors duration-300">
                  +91 12345 67890
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 group hover-lift">
              <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-sm text-white/60">Visit us</div>
                <span className="text-white">Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-white/80">
              <span>© {currentYear} CareerGuide.</span>
              <span>All rights reserved.</span>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;