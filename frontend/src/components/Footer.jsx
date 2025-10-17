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
  BookOpen,
  Users,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Careers", href: "/careers" },
    { name: "Internships", href: "/internships" },
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <img
                src="/logos/P2P-white.jpeg"
                alt="P2P Career Guidance Logo"
                className="h-16 sm:h-20 w-auto object-contain"
              />
              <span className="text-2xl font-bold">P2P Career Guidance</span>
            </div>

            <p className="text-white/80 text-base leading-relaxed max-w-md mx-auto sm:mx-0 text-justify">
              Empowering students and freshers with personalized AI-powered career guidance 
              to navigate their career path with confidence and achieve their dreams.
            </p>

            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links + Resources Side by Side on Mobile */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-6">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center">
                Quick Links
                <ArrowUpRight className="h-4 w-4 ml-2 text-primary" />
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center">
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
                      className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group text-sm sm:text-base"
                    >
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                      {resource.name}
                      {resource.external && (
                        <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-10 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {/* Call us */}
            <div className="flex items-center justify-center space-x-4 col-span-1">
              <Phone className="h-6 w-6 text-secondary flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Call us</p>
                <a
                  href="tel:+911234567890"
                  className="text-white hover:text-secondary transition-colors duration-300 text-sm sm:text-base block"
                >
                  +91 12345 67890
                </a>
              </div>
            </div>

            {/* Visit us */}
            <div className="flex items-center justify-center space-x-4 col-span-1 sm:col-span-1">
              <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Visit us</p>
                <span className="text-white text-sm sm:text-base block">Chennai, India</span>
              </div>
            </div>

            {/* Email - centered under on mobile */}
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center space-x-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-white/60 mb-1">Email us</p>
                <a
                  href="mailto:p2pcareerguidance@gmail.com"
                  className="text-white hover:text-primary transition-colors duration-300 text-sm sm:text-base block"
                >
                  p2pcareerguidance@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/80 text-sm">
            © {currentYear} P2P Career Guidance. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">
            <a href="#" className="text-white/80 hover:text-white text-sm hover:underline transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/80 hover:text-white text-sm hover:underline transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-white/80 hover:text-white text-sm hover:underline transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;