import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Send,
  CheckCircle,
} from "lucide-react";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtKd0UFYQRjDUbO415NjcU8w5WXznI-ysuX6BPxTqAtY-lm4xbcpD7zGQuaM_fXZP2/exec";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    subject: "",
    message: "",
  });

  const { toast } = useToast();
  const headerRef = useScrollAnimation();
  const contactInfoRef = useScrollAnimation();
  const formRef = useScrollAnimation();
  const faqRef = useScrollAnimation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // required for Google Apps Script
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          subject: formData.subject,
          message: formData.message,
        }).toString(),
      });

      // Show toast (we can't check response in no-cors mode)
      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "p2pcareerguidance@gmail.com",
      action: "mailto:p2pcareerguidance@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+91 12345 67890",
      action: "tel:+911234567890",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      value: "Chennai, Tamil Nadu",
      action: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When we're available",
      value: "Mon-Fri: 9AM-6PM IST",
      action: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I get started with P2P?",
      answer:
        "Simply register on our platform by selecting your user type (college joining student, college student, or fresher). You'll get personalized recommendations based on your profile.",
    },
    {
      question: "Are the courses free?",
      answer:
        "We offer both free and paid courses. Many of our introductory courses are free, while advanced courses require enrollment fees. Check individual course details for pricing.",
    },
    {
      question: "How does the resume builder work?",
      answer:
        "Our resume builder guides you through a step-by-step process to create a professional resume. Fill in your information across different sections and download as a PDF when complete.",
    },
    {
      question: "Do you provide placement assistance?",
      answer:
        "Yes! We partner with leading companies to provide internship and job opportunities. College students and freshers can access our job portal for relevant openings.",
    },
    {
      question: "Can I get personal career guidance?",
      answer:
        "Absolutely! We offer personalized career counseling sessions. Contact us to schedule a one-on-one session with our career experts.",
    },
  ];

  return (
    <div className="page-container page-bg-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 scroll-animate">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fadeInUp">
            Get in{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Have questions about your career journey? We're here to help. Reach
            out to us and let's discuss how we can support your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div
            ref={contactInfoRef}
            className="lg:col-span-1 space-y-6 scroll-animate"
          >
            <Card className="content-section animate-slideInLeft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Multiple ways to reach our team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-bounce-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {info.description}
                      </p>
                      <a
                        href={info.action}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card
              className="content-section animate-slideInLeft"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start hover-lift"
                  asChild
                >
                  <a href="/interships">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Browse Internships
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover-lift"
                  asChild
                >
                  <a href="/courses">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Browse Courses
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover-lift"
                  asChild
                >
                  <a href="/careers">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Career Guidance
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-2 scroll-animate">
            <Card className="content-section animate-slideInRight">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="space-y-2 animate-fadeInUp"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div
                      className="space-y-2 animate-fadeInUp"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="space-y-2 animate-fadeInUp"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+91 12345 67890"
                      />
                    </div>
                    <div
                      className="space-y-2 animate-fadeInUp"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <Label htmlFor="topic">Inquiry Topic *</Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("topic", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="courses">
                            Course Information
                          </SelectItem>
                          <SelectItem value="career-guidance">
                            Career Guidance
                          </SelectItem>
                          <SelectItem value="technical-support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="feedback">
                            Feedback & Suggestions
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div
                    className="space-y-2 animate-fadeInUp"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Please provide details about your inquiry..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full hover-lift animate-fadeInUp"
                    size="lg"
                    style={{ animationDelay: "0.7s" }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>

                  <p
                    className="text-sm text-muted-foreground text-center animate-fadeInUp"
                    style={{ animationDelay: "0.8s" }}
                  >
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="mb-12 scroll-animate">
          <Card className="content-section animate-scaleIn">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="space-y-2 animate-bounce-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
            Our career experts are here to provide personalized guidance.
            Schedule a one-on-one consultation to discuss your specific needs.
          </p>
          <Button size="lg" variant="secondary" className="hover-lift">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
