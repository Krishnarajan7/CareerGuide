import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockColleges} from "@/data/mockColleges";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  GraduationCap,
  Building,
  Users,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Award,
  Calendar,
  IndianRupee,
  Users2,
  Clock
} from "lucide-react";

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundCollege = mockColleges.find(c => c.id === id);
      setCollege(foundCollege || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">College Not Found</h2>
          <p className="text-muted-foreground mb-6">The college you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            className="mb-6 hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{college.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{college.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{college.location}</span>
                </div>
                <Badge variant="secondary">{college.type}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{college.description}</p>
            </div>
            
            <div className="md:col-span-1">
              <img 
                src={college.image} 
                alt={college.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Course Details */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Courses & Fee Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {college.courseDetails.map((course, index) => (
                    <div key={index} className="border border-border rounded-xl p-4 md:p-6 bg-gradient-to-r from-muted/30 to-transparent hover:from-primary/5 hover:to-secondary/5 transition-all duration-300">
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div>
                          <h4 className="font-bold text-foreground text-base mb-2">{course.name}</h4>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">{course.fees}</div>
                            <div className="text-xs text-muted-foreground">Total Fees</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary/70" />
                              <span className="text-muted-foreground font-medium">Duration:</span>
                            </div>
                            <span className="font-semibold text-foreground">{course.duration}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Users2 className="h-4 w-4 text-primary/70" />
                              <span className="text-muted-foreground font-medium">Seats:</span>
                            </div>
                            <span className="font-semibold text-foreground">{course.seats}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-primary/70" />
                              <span className="text-muted-foreground font-medium">Eligibility:</span>
                            </div>
                            <span className="font-semibold text-foreground text-right flex-1 ml-2">{course.eligibility}</span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:block">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground text-lg mb-3">{course.name}</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary/70" />
                                <span className="text-muted-foreground font-medium">Duration:</span>
                                <span className="font-semibold text-foreground">{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users2 className="h-4 w-4 text-primary/70" />
                                <span className="text-muted-foreground font-medium">Seats:</span>
                                <span className="font-semibold text-foreground">{course.seats}</span>
                              </div>
                              <div className="flex items-center gap-2 col-span-2">
                                <GraduationCap className="h-4 w-4 text-primary/70" />
                                <span className="text-muted-foreground font-medium">Eligibility:</span>
                                <span className="font-semibold text-foreground">{course.eligibility}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-primary">{course.fees}</div>
                            <div className="text-sm text-muted-foreground">Total Fees</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* College Information */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Award className="h-5 w-5 text-primary" />
                  College Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-base md:text-lg">Basic Details</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground font-medium">Established:</span>
                          <span className="font-semibold text-foreground">{college.established}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground font-medium">Counselling Code:</span>
                          <span className="font-semibold text-foreground">{college.counsellingCode}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground font-medium">NIRF Rank:</span>
                          <span className="font-semibold text-primary">#{college.rank.nirf}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground font-medium">India Rank:</span>
                          <span className="font-semibold text-primary">#{college.rank.india}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-base md:text-lg">Accreditation</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.accreditation.map((acc, index) => (
                          <span key={index} className="bg-success/15 text-success px-3 py-1.5 rounded-full text-xs font-semibold border border-success/20">
                            {acc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Cutoff Scores (JEE Advanced Rank)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">General:</span>
                        <span className="font-medium">{college.cutoff.general}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">OBC:</span>
                        <span className="font-medium">{college.cutoff.obc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SC:</span>
                        <span className="font-medium">{college.cutoff.sc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ST:</span>
                        <span className="font-medium">{college.cutoff.st}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {college.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admission Process */}
            <Card>
              <CardHeader>
                <CardTitle>Admission Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {college.admissionProcess.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-lg">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fees Range</span>
                  <span className="font-semibold">{college.fees}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{college.rating}/5</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">NIRF Rank</span>
                  <span className="font-semibold">#{college.rank.nirf}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Established</span>
                  <span className="font-semibold">{college.established}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Code</span>
                  <span className="font-semibold">{college.counsellingCode}</span>
                </div>
              </CardContent>
            </Card>

            {/* Placement Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Placement Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Package</span>
                  <span className="font-semibold text-green-600">{college.placement.average}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Highest Package</span>
                  <span className="font-semibold text-green-600">{college.placement.highest}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Placement Rate</span>
                  <span className="font-semibold">{college.placement.percentage}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{college.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="break-all">{college.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="break-all">{college.contact.website}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Download Brochure
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Connect with Alumni
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;