
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { UserPlus, Upload, Sparkles, Link2, FileText, ExternalLink } from "lucide-react";


const Register = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // College joining specific
    cutoff: "",
    city: "",
    // College student specific
    college: "",
    department: "",
    cgpa: "",
    // Fresher specific
    skills: "",
    experience: "",
    resume: null ,
    resumeLink: "",
    uploadType: "file" 
  });

  const { toast } = useToast();
  const formRef = useScrollAnimation();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering. Our team will contact you soon with personalized guidance.",
    });
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      cutoff: "",
      city: "",
      college: "",
      department: "",
      cgpa: "",
      skills: "",
      experience: "",
      resume: null,
      resumeLink: "",
      uploadType: "file"
    });
    setUserType("");
  };

  const renderDynamicFields = () => {
    switch (userType) {
      case "college-joining":
        return (
          <div className="space-y-8 animate-fadeInUp">
            <h3 className="text-xl font-semibold text-foreground border-b border-border/50 pb-3">
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="cutoff" className="text-base font-medium">12th Grade Cutoff (%) *</Label>
                <Input
                  id="cutoff"
                  type="number"
                  placeholder="85"
                  value={formData.cutoff}
                  onChange={(e) => handleInputChange("cutoff", e.target.value)}
                  required
                  className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="city" className="text-base font-medium">Preferred City *</Label>
                <Select onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors">
                    <SelectValue placeholder="Select your preferred city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case "college-student":
        return (
          <div className="space-y-8 animate-fadeInUp">
            <h3 className="text-xl font-semibold text-foreground border-b border-border/50 pb-3">
              Academic Information
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="college" className="text-base font-medium">College Name *</Label>
                <Input
                  id="college"
                  placeholder="Enter your college/university name"
                  value={formData.college}
                  onChange={(e) => handleInputChange("college", e.target.value)}
                  required
                  className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="department" className="text-base font-medium">Department *</Label>
                  <Select onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">💻 Computer Science Engineering</SelectItem>
                      <SelectItem value="it">🖥️ Information Technology</SelectItem>
                      <SelectItem value="ece">📡 Electronics & Communication</SelectItem>
                      <SelectItem value="eee">⚡ Electrical & Electronics</SelectItem>
                      <SelectItem value="mech">⚙️ Mechanical Engineering</SelectItem>
                      <SelectItem value="civil">🏗️ Civil Engineering</SelectItem>
                      <SelectItem value="other">📋 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="cgpa" className="text-base font-medium">Current CGPA *</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="8.5"
                    value={formData.cgpa}
                    onChange={(e) => handleInputChange("cgpa", e.target.value)}
                    required
                    className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "fresher":
        return (
          <div className="space-y-8 animate-fadeInUp">
            <h3 className="text-xl font-semibold text-foreground border-b border-border/50 pb-3">
              Professional Information
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="skills" className="text-base font-medium">Technical Skills *</Label>
                <Textarea
                  id="skills"
                  placeholder="e.g., Java, Python, React, SQL, Machine Learning, Data Analysis, etc."
                  value={formData.skills}
                  onChange={(e) => handleInputChange("skills", e.target.value)}
                  required
                  className="min-h-[120px] text-base border-2 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="experience" className="text-base font-medium">Experience & Projects</Label>
                <Textarea
                  id="experience"
                  placeholder="Internships, projects, freelance work, hackathons, certifications, etc."
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="min-h-[120px] text-base border-2 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-base font-medium">Resume/Portfolio (Optional)</Label>
              
                {/* Upload Type Toggle */}
                <div className="flex rounded-xl bg-muted/50 p-1.5 border border-border/30">
                  <Button
                    type="button"
                    variant={formData.uploadType === "file" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleInputChange("uploadType", "file")}
                    className="flex-1 h-11 text-base font-medium"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant={formData.uploadType === "link" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleInputChange("uploadType", "link")}
                    className="flex-1 h-11 text-base font-medium"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                </div>

                {formData.uploadType === "file" ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("resume")?.click()}
                        className="w-full h-16 hover-lift border-dashed border-2 border-border/40 hover:border-primary/40 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-base font-medium">
                            {formData.resume ? formData.resume.name : "Choose file or drag & drop"}
                          </span>
                        </div>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Supported: PDF, DOC, DOCX, XLS, XLSX (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="resumeLink"
                        type="url"
                        placeholder="https://docs.google.com/spreadsheets/... or portfolio link"
                        value={formData.resumeLink}
                        onChange={(e) => handleInputChange("resumeLink", e.target.value)}
                        className="pl-12 pr-12 h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                      />
                      <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Google Sheets, Excel Online, Drive links, or portfolio URLs
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float floating-bubble"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float floating-bubble" style={{ animationDelay: '2s' }}></div>
      
      <div className="page-container">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card 
            ref={formRef}
            className="relative shadow-xl scroll-animate bg-background/95 backdrop-blur-sm border-2 border-primary/20"
          >
            <CardHeader className="text-center pb-8 pt-8">
              <div className="flex items-center justify-center mb-4">
                <UserPlus className="w-10 h-10 text-primary mr-3" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                Student Registration
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Register with us to get personalized career guidance and track your journey. 
                Your details will be securely stored for our team to provide better assistance.
              </CardDescription>
            </CardHeader>
          
            <CardContent className="relative px-8 lg:px-12 pb-12">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* User Type Selection */}
                <div className="space-y-4">
                  <Label htmlFor="userType" className="text-lg font-semibold flex items-center">
                    <Sparkles className="h-5 w-5 mr-3 text-primary animate-pulse" />
                    Tell us about yourself:
                  </Label>
                  <Select onValueChange={(value) => setUserType(value)}>
                    <SelectTrigger className="h-16 text-lg border-2 border-border/50 hover:border-primary/30 transition-colors">
                      <SelectValue placeholder="Select your current status to get started" />
                    </SelectTrigger>
                    <SelectContent className="text-base">
                      <SelectItem value="college-joining" className="h-12">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧑‍🎓</span>
                          <div>
                            <div className="font-medium">College Joining Student</div>
                            <div className="text-sm text-muted-foreground">Planning to join college soon</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="college-student" className="h-12">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🎓</span>
                          <div>
                            <div className="font-medium">College Student</div>
                            <div className="text-sm text-muted-foreground">Currently pursuing degree</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="fresher" className="h-12">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">👨‍💻</span>
                          <div>
                            <div className="font-medium">Fresher</div>
                            <div className="text-sm text-muted-foreground">Ready to start career</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Common Fields */}
                {userType && (
                  <div className="space-y-10 animate-fadeInUp">
                    <div className="space-y-8">
                      <h3 className="text-xl font-semibold text-foreground border-b border-border/50 pb-3">
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 12345 67890"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="h-14 text-base border-2 border-border/50 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Dynamic Fields */}
                    {renderDynamicFields()}

                    <div className="pt-8 space-y-6">
                      <Button 
                        type="submit" 
                        className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light shadow-2xl hover-lift transition-all duration-300" 
                        size="lg"
                      >
                        <UserPlus className="h-6 w-6 mr-3" />
                        Register Now
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;