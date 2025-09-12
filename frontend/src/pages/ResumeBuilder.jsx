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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Download,
  Plus,
  X,
  Check,
  Edit,
  Save,
} from "lucide-react";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const headerRef = useScrollAnimation();
  const progressRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [
      {
        id: 1,
        jobTitle: "",
        company: "",
        duration: "",
        location: "",
        description: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        institution: "",
        year: "",
        grade: "",
        location: "",
      },
    ],
    skills: {
      technical: [],
      soft: [],
    },
    projects: [
      {
        id: 1,
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ],
  });

  const { toast } = useToast();

  const steps = [
    {
      id: 0,
      title: "Personal Info",
      icon: User,
      description: "Basic contact information",
    },
    {
      id: 1,
      title: "Summary",
      icon: FileText,
      description: "Professional summary",
    },
    {
      id: 2,
      title: "Experience",
      icon: Briefcase,
      description: "Work experience",
    },
    {
      id: 3,
      title: "Education",
      icon: GraduationCap,
      description: "Educational background",
    },
    {
      id: 4,
      title: "Skills",
      icon: Award,
      description: "Technical & soft skills",
    },
    {
      id: 5,
      title: "Projects",
      icon: FileText,
      description: "Personal/academic projects",
    },
    {
      id: 6,
      title: "Certifications",
      icon: Award,
      description: "Certificates & achievements",
    },
  ];

  const calculateProgress = () => {
    let completed = 0;
    let total = steps.length;

    // Check personal info completion
    const personalInfoFields = Object.values(resumeData.personalInfo);
    if (personalInfoFields.filter((field) => field.trim() !== "").length >= 4)
      completed++;

    // Check summary
    if (resumeData.summary.trim() !== "") completed++;

    // Check experience
    if (resumeData.experience.some((exp) => exp.jobTitle && exp.company))
      completed++;

    // Check education
    if (resumeData.education.some((edu) => edu.degree && edu.institution))
      completed++;

    // Check skills
    if (
      resumeData.skills.technical.length > 0 ||
      resumeData.skills.soft.length > 0
    )
      completed++;

    // Check projects
    if (
      resumeData.projects.some((project) => project.name && project.description)
    )
      completed++;

    // Check certifications
    if (resumeData.certifications.some((cert) => cert.name && cert.issuer))
      completed++;

    return (completed / total) * 100;
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const updateArrayItem = (section, id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addSkill = (category, skill) => {
    if (skill.trim() && !resumeData.skills[category].includes(skill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], skill.trim()],
        },
      }));
    }
  };

  const removeSkill = (category, skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s !== skill),
      },
    }));
  };

  const downloadResume = () => {
    toast({
      title: "Resume Downloaded!",
      description: "Your resume has been generated and downloaded as a PDF.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        fullName: e.target.value,
                      },
                    }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        email: e.target.value,
                      },
                    }))
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        phone: e.target.value,
                      },
                    }))
                  }
                  placeholder="+91 12345 67890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        location: e.target.value,
                      },
                    }))
                  }
                  placeholder="Chennai, India"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn</Label>
                <Input
                  id="linkedIn"
                  value={resumeData.personalInfo.linkedIn}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        linkedIn: e.target.value,
                      },
                    }))
                  }
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={resumeData.personalInfo.github}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        github: e.target.value,
                      },
                    }))
                  }
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Summary
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
                placeholder="Write a brief professional summary highlighting your key strengths, experience, and career objectives..."
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">
                Write 2-3 sentences about your professional background and goals
              </p>
            </div>
          </div>
        );

      case 2: // Experience
        return (
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id} className="relative border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Experience {index + 1}
                    </CardTitle>
                    {resumeData.experience.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("experience", exp.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={exp.jobTitle}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "jobTitle",
                            e.target.value
                          )
                        }
                        placeholder="Software Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Tech Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={exp.duration}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Jan 2023 - Present"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) =>
                          updateArrayItem(
                            "experience",
                            exp.id,
                            "location",
                            e.target.value
                          )
                        }
                        placeholder="Bangalore, India"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "experience",
                          exp.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                addArrayItem("experience", {
                  id: Date.now(),
                  jobTitle: "",
                  company: "",
                  duration: "",
                  location: "",
                  description: "",
                })
              }
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        );

      case 3: // Education
        return (
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id} className="relative border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Education {index + 1}
                    </CardTitle>
                    {resumeData.education.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("education", edu.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "degree",
                            e.target.value
                          )
                        }
                        placeholder="B.Tech Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) =>
                          updateArrayItem(
                            "education",
                            edu.id,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="ABC University"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) =>
                            updateArrayItem(
                              "education",
                              edu.id,
                              "year",
                              e.target.value
                            )
                          }
                          placeholder="2020-2024"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Grade/CGPA</Label>
                        <Input
                          value={edu.grade}
                          onChange={(e) =>
                            updateArrayItem(
                              "education",
                              edu.id,
                              "grade",
                              e.target.value
                            )
                          }
                          placeholder="8.5 CGPA"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                addArrayItem("education", {
                  id: Date.now(),
                  degree: "",
                  institution: "",
                  year: "",
                  grade: "",
                  location: "",
                })
              }
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        );

      case 4: // Skills
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">
                  Technical Skills
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add programming languages, frameworks, tools, etc.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resumeData.skills.technical.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill("technical", skill)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a technical skill"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill("technical", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling;
                      addSkill("technical", input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-semibold">Soft Skills</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Add communication, leadership, teamwork skills, etc.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resumeData.skills.soft.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill("soft", skill)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a soft skill"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill("soft", e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling;
                      addSkill("soft", input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Projects
        return (
          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <Card key={project.id} className="relative border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Project {index + 1}
                    </CardTitle>
                    {resumeData.projects.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("projects", project.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) =>
                        updateArrayItem(
                          "projects",
                          project.id,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="E-commerce Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "projects",
                          project.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Describe what the project does and your role..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Technologies Used</Label>
                      <Input
                        value={project.technologies}
                        onChange={(e) =>
                          updateArrayItem(
                            "projects",
                            project.id,
                            "technologies",
                            e.target.value
                          )
                        }
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Link (Optional)</Label>
                      <Input
                        value={project.link}
                        onChange={(e) =>
                          updateArrayItem(
                            "projects",
                            project.id,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                addArrayItem("projects", {
                  id: Date.now(),
                  name: "",
                  description: "",
                  technologies: "",
                  link: "",
                })
              }
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        );

      case 6: // Certifications
        return (
          <div className="space-y-6">
            {resumeData.certifications.map((cert, index) => (
              <Card key={cert.id} className="relative border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Certification {index + 1}
                    </CardTitle>
                    {resumeData.certifications.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removeArrayItem("certifications", cert.id)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Certification Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) =>
                          updateArrayItem(
                            "certifications",
                            cert.id,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="AWS Certified Developer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Issuing Organization</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) =>
                          updateArrayItem(
                            "certifications",
                            cert.id,
                            "issuer",
                            e.target.value
                          )
                        }
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date Obtained</Label>
                      <Input
                        value={cert.date}
                        onChange={(e) =>
                          updateArrayItem(
                            "certifications",
                            cert.id,
                            "date",
                            e.target.value
                          )
                        }
                        placeholder="March 2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Credential Link (Optional)</Label>
                      <Input
                        value={cert.link}
                        onChange={(e) =>
                          updateArrayItem(
                            "certifications",
                            cert.id,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="https://credential-link.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                addArrayItem("certifications", {
                  id: Date.now(),
                  name: "",
                  issuer: "",
                  date: "",
                  link: "",
                })
              }
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container page-bg-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 scroll-animate">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fadeInUp">
            Resume{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Builder
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume step by step. Fill in your information
            and download as PDF.
          </p>
        </div>

        {/* Progress */}
        <div ref={progressRef} className="scroll-animate">
          <Card className="mb-8 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Resume Completion</h3>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateProgress())}%
                </span>
              </div>
              <Progress value={calculateProgress()} className="h-2 mb-4" />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-success" />
                <span>Complete all sections for the best results</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 scroll-animate"
        >
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card hover:bg-muted/50 border-border"
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="flex items-center space-x-3">
                    <step.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p
                        className={`text-xs ${
                          currentStep === step.id
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button
                onClick={downloadResume}
                className="w-full bg-primary hover:bg-primary-light"
                size="lg"
                disabled={calculateProgress() < 50}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              {calculateProgress() < 50 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Complete at least 50% to download
                </p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {(() => {
                    const IconComponent = steps[currentStep].icon;
                    return <IconComponent className="h-5 w-5 mr-2" />;
                  })()}
                  {steps[currentStep].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setCurrentStep(
                        Math.min(steps.length - 1, currentStep + 1)
                      )
                    }
                    disabled={currentStep === steps.length - 1}
                    className="bg-primary hover:bg-primary-light"
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
