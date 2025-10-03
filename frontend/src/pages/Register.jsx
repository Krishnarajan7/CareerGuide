import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Upload, GraduationCap, School, Briefcase, Link2, FileText } from "lucide-react";


const tamilNaduDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli",
  "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur",
  "Ranipet", "Sivaganga", "Karur", "Udhagamandalam", "Hosur", "Nagercoil",
  "Kanchipuram", "Kumarapalayam", "Karaikkudi", "Neyveli", "Cuddalore",
  "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gudiyatham",
  "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam"
];

const Register = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // College joining specific
    school: "",
    cutoff: "",
    district: "",
    // College student specific
    college: "",
    department: "",
    cgpa: "",
    interestedJob: "",
    trainingType: "",
    experience: "",
    projects: "",
    currentCompany: "",
    // Fresher specific
    skills: "",
    fresherExperience: "",
    resume: null ,
    resumeLink: "",
    uploadType: "file" 
  });

  const { toast } = useToast();

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
      school: "",
      cutoff: "",
      district: "",
      college: "",
      department: "",
      cgpa: "",
      interestedJob: "",
      trainingType: "",
      experience: "",
      projects: "",
      currentCompany: "",
      skills: "",
      fresherExperience: "",
      resume: null,
      resumeLink: "",
      uploadType: "file"
    });
    setUserType("");
  };

  const renderFormContent = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 12345 67890"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            className="h-11"
          />
        </div>

        {/* Type-specific fields */}
        {userType === "college-joining" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="school">School Name *</Label>
              <Input
                id="school"
                placeholder="Your school name"
                value={formData.school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cutoff">12th Grade Cutoff (%) *</Label>
                <Input
                  id="cutoff"
                  type="number"
                  placeholder="85"
                  value={formData.cutoff}
                  onChange={(e) => handleInputChange("cutoff", e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District (Tamil Nadu) *</Label>
                <Select onValueChange={(value) => handleInputChange("district", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {tamilNaduDistricts.map((district) => (
                      <SelectItem key={district} value={district.toLowerCase()}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {userType === "college-student" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="college">College Name *</Label>
              <Input
                id="college"
                placeholder="Your college/university"
                value={formData.college}
                onChange={(e) => handleInputChange("college", e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select onValueChange={(value) => handleInputChange("department", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ece">Electronics & Communication</SelectItem>
                    <SelectItem value="eee">Electrical & Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cgpa">Current CGPA *</Label>
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
                  className="h-11"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interestedJob">Interested Job Role *</Label>
                <Select onValueChange={(value) => handleInputChange("interestedJob", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="mobile">Mobile Developer</SelectItem>
                    <SelectItem value="devops">DevOps Engineer</SelectItem>
                    <SelectItem value="datascience">Data Science</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainingType">Training Looking For *</Label>
                <Select onValueChange={(value) => handleInputChange("trainingType", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select training type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="softskills">Soft Skills</SelectItem>
                    <SelectItem value="interview">Interview Preparation</SelectItem>
                    <SelectItem value="placement">Placement Training</SelectItem>
                    <SelectItem value="certification">Certification Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea
                id="experience"
                placeholder="Internships, part-time jobs..."
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projects">Projects</Label>
                <Textarea
                  id="projects"
                  placeholder="Your academic/personal projects"
                  value={formData.projects}
                  onChange={(e) => handleInputChange("projects", e.target.value)}
                  className="min-h-[60px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentCompany">Previous/Current Company</Label>
                <Input
                  id="currentCompany"
                  placeholder="Company name (if any)"
                  value={formData.currentCompany}
                  onChange={(e) => handleInputChange("currentCompany", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>
          </>
        )}

        {userType === "fresher"  && (
          <>
            <div className="space-y-2">
              <Label htmlFor="skills">Technical Skills *</Label>
              <Textarea
                id="skills"
                placeholder="Java, Python, React, SQL..."
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                required
                className="min-h-[70px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fresherExperience">Experience & Projects</Label>
              <Textarea
                id="fresherExperience"
                placeholder="Internships, projects, certifications..."
                value={formData.fresherExperience}
                onChange={(e) => handleInputChange("fresherExperience", e.target.value)}
                className="min-h-[70px] resize-none"
              />
            </div>
            <div className="space-y-3">
              <Label>Resume/Portfolio (Optional)</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.uploadType === "file" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("uploadType", "file")}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button
                  type="button"
                  variant={formData.uploadType === "link" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("uploadType", "link")}
                  className="flex-1"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Link
                </Button>
              </div>

              {formData.uploadType === "file" ? (
                <div>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("resume")?.click()}
                    className="w-full h-12 border-dashed"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {formData.resume ? formData.resume.name : "Choose file"}
                  </Button>
                </div>
              ) : (
                <Input
                  id="resumeLink"
                  type="url"
                  placeholder="https://your-portfolio.com"
                  value={formData.resumeLink}
                  onChange={(e) => handleInputChange("resumeLink", e.target.value)}
                  className="h-11"
                />
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full h-12 mt-6" size="lg">
          <UserPlus className="h-5 w-5 mr-2" />
          Register Now
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
            Register Here Based on Your Profession
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose your category below and fill in your details to get personalized career guidance and exclusive opportunities
          </p>
        </div>

        <Card className="shadow-xl border-2">
          <CardContent className="p-6">
            <Tabs value={userType} onValueChange={(value) => setUserType(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
                <TabsTrigger 
                  value="college-joining" 
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-background"
                >
                  <School className="h-5 w-5" />
                  <div className="text-xs md:text-sm font-medium">College Joining</div>
                </TabsTrigger>
                <TabsTrigger 
                  value="college-student"
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-background"
                >
                  <GraduationCap className="h-5 w-5" />
                  <div className="text-xs md:text-sm font-medium">College Student</div>
                </TabsTrigger>
                <TabsTrigger 
                  value="fresher"
                  className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-background"
                >
                  <Briefcase className="h-5 w-5" />
                  <div className="text-xs md:text-sm font-medium">Fresher</div>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="college-joining" className="mt-0 animate-fade-in">
                  {renderFormContent("college-joining")}
                </TabsContent>
                <TabsContent value="college-student" className="mt-0 animate-fade-in">
                  {renderFormContent("college-student")}
                </TabsContent>
                <TabsContent value="fresher" className="mt-0 animate-fade-in">
                  {renderFormContent("fresher")}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;