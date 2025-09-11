import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collegeApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [enrichment, setEnrichment] = useState(null);
  
  // Parse a free-form courses/fees string into structured rows
  const parseCoursesAndFees = (text) => {
    if (!text) return [];
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split(":");
        const name = (parts[0] || "").trim();
        const amount = (parts.slice(1).join(":") || "").trim();
        return { name, amount };
      });
  };

  useEffect(() => {
    const fetchCollege = async () => {
      setLoading(true);
      try {
        const response = await collegeApi.getCollegeById(id);
        if (response.success) {
          setCollege(response.data);
        } else {
          setCollege(null);
        }
        // Enrichment in parallel best-effort
        try {
          const enr = await collegeApi.enrichCollegeById(id);
          if (enr.success) setEnrichment(enr.data);
        } catch (_) {}
      } catch (error) {
        console.error('Error fetching college:', error);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCollege();
    }
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{college.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {[college.address, college.city, college.state].filter(Boolean).length > 0 && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{[college.address, college.city, college.state].filter(Boolean).join(", ")}</span>
                  </div>
                )}
                {college.type && <Badge variant="secondary">{college.type}</Badge>}
              </div>
              {college.rankText && (
                <p className="text-sm text-muted-foreground">{college.rankText}</p>
              )}
            </div>
            
            <div className="md:col-span-1">
              {college.image && (
                <img 
                  src={college.image} 
                  alt={college.name}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses & Fees</TabsTrigger>
                <TabsTrigger value="admissions">Admissions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
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
                            {college.estd && (
                              <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                <span className="text-muted-foreground font-medium">Established:</span>
                                <span className="font-semibold text-foreground">{college.estd}</span>
                              </div>
                            )}
                            {college.approvedBy && (
                              <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                <span className="text-muted-foreground font-medium">Approved By:</span>
                                <span className="font-semibold text-foreground">{college.approvedBy}</span>
                              </div>
                            )}
                            {college.affiliatedUniversity && (
                              <div className="flex justify-between p-2 bg-muted/30 rounded-lg">
                                <span className="text-muted-foreground font-medium">Affiliated University:</span>
                                <span className="font-semibold text-foreground">{college.affiliatedUniversity}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {college.rankText && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Ranking</h4>
                          <div className="text-sm">{college.rankText}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Enrichment */}
                {enrichment && (
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Globe className="h-5 w-5 text-primary" />
                        More About {college.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-6 items-start">
                        {enrichment.wikiThumbnail && (
                          <img src={enrichment.wikiThumbnail} alt={`${college.name} thumbnail`} className="w-24 h-24 object-cover rounded-md" />
                        )}
                        <div className="space-y-3">
                          {enrichment.wikiSummary && (
                            <p className="text-sm text-muted-foreground">{enrichment.wikiSummary}</p>
                          )}
                          {enrichment.website && (
                            <a className="text-sm underline" href={enrichment.website} target="_blank" rel="noreferrer">Official Website</a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                {college.coursesAndFees && (
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Courses & Fee Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {parseCoursesAndFees(college.coursesAndFees).map((row, idx) => (
                          <div
                            key={`${row.name}-${idx}`}
                            className="flex items-center justify-between p-3 rounded-lg border bg-background"
                          >
                            <span className="text-sm font-medium text-foreground pr-4 truncate">
                              {row.name || "Course"}
                            </span>
                            <span className="text-sm font-semibold text-primary whitespace-nowrap">
                              {row.amount || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="admissions" className="space-y-6">
                {Array.isArray(college.admissionProcess) && college.admissionProcess.length > 0 && (
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
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {college.fees && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fees Range</span>
                    <span className="font-semibold">{college.fees}</span>
                  </div>
                )}
                <Separator />
                {college.rating && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{college.rating}/5</span>
                    </div>
                  </div>
                )}
                <Separator />
                {college.rank?.nirf && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">NIRF Rank</span>
                    <span className="font-semibold">#{college.rank.nirf}</span>
                  </div>
                )}
                <Separator />
                {college.estd && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Established</span>
                    <span className="font-semibold">{college.estd}</span>
                  </div>
                )}
                <Separator />
                {[college.city, college.state].filter(Boolean).length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold">{[college.city, college.state].filter(Boolean).join(", ")}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Placement Stats */}
            {/* Placement: Not available in CSV, so omit */}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {college.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{college.phone}</span>
                  </div>
                )}
                {college.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="break-all">{college.email}</span>
                  </div>
                )}
                {college.brochure && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={college.brochure} target="_blank" rel="noreferrer" className="underline">
                      Brochure
                    </a>
                  </div>
                )}
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