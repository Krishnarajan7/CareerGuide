export const mockColleges = [
  {
    id: "1",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Engineering",
    courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
    courseDetails: [
      { name: "Computer Science & Engineering", duration: "4 years", fees: "₹10.18 Lakhs", eligibility: "JEE Advanced", seats: 120 },
      { name: "Mechanical Engineering", duration: "4 years", fees: "₹10.18 Lakhs", eligibility: "JEE Advanced", seats: 110 },
      { name: "Electrical Engineering", duration: "4 years", fees: "₹10.18 Lakhs", eligibility: "JEE Advanced", seats: 95 },
      { name: "Civil Engineering", duration: "4 years", fees: "₹10.18 Lakhs", eligibility: "JEE Advanced", seats: 85 }
    ],
    rating: 4.8,
    fees: "₹2.5 - 10 Lakhs",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    description: "IIT Delhi is one of India's premier engineering institutions, known for excellence in technical education and research.",
    facilities: ["Library", "Hostels", "Sports Complex", "Research Labs", "Cafeteria", "Medical Center"],
    placement: {
      average: "₹18 LPA",
      highest: "₹1.2 Crore",
      percentage: "95%"
    },
    admissionProcess: ["JEE Advanced", "Counseling", "Document Verification"],
    contact: {
      phone: "+91-11-2659-1020",
      email: "registrar@admin.iitd.ac.in",
      website: "www.iitd.ac.in"
    },
    rank: {
      nirf: "2",
      india: "1"
    },
    counsellingCode: "IITD",
    established: "1961",
    accreditation: ["NAAC A++", "NBA Accredited"],
    cutoff: {
      general: "250-300",
      obc: "220-270",
      sc: "150-200",
      st: "120-180"
    }
  },
  {
    id: "2",
    name: "Delhi University",
    location: "New Delhi",
    type: "University",
    courses: ["Arts", "Commerce", "Science", "Management"],
    courseDetails: [
      { name: "Bachelor of Arts", duration: "3 years", fees: "₹45,000", eligibility: "CUET", seats: 500 },
      { name: "Bachelor of Commerce", duration: "3 years", fees: "₹60,000", eligibility: "CUET", seats: 400 },
      { name: "Bachelor of Science", duration: "3 years", fees: "₹55,000", eligibility: "CUET", seats: 450 },
      { name: "MBA", duration: "2 years", fees: "₹2 Lakhs", eligibility: "CAT/MAT", seats: 120 }
    ],
    rating: 4.5,
    fees: "₹30,000 - 2 Lakhs",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    description: "University of Delhi is a premier university of India and is known for its high standards in teaching and research.",
    facilities: ["Central Library", "Sports Facilities", "Hostels", "Computer Centers", "Medical Services"],
    placement: {
      average: "₹8 LPA",
      highest: "₹45 LPA",
      percentage: "85%"
    },
    admissionProcess: ["CUET", "Merit Based", "Interview"],
    contact: {
      phone: "+91-11-2766-7049",
      email: "registrar@du.ac.in",
      website: "www.du.ac.in"
    },
    rank: {
      nirf: "11",
      india: "8"
    },
    counsellingCode: "DU",
    established: "1922",
    accreditation: ["NAAC A+", "UGC Recognized"],
    cutoff: {
      general: "95-99%",
      obc: "92-96%",
      sc: "85-90%",
      st: "80-85%"
    }
  },
  {
    id: "3",
    name: "Jawaharlal Nehru University",
    location: "New Delhi",
    type: "Central University",
    courses: ["Social Sciences", "Languages", "International Studies", "Science"],
    courseDetails: [
      { name: "Master of Arts", duration: "2 years", fees: "₹1.5 Lakhs", eligibility: "JNUEE", seats: 200 },
      { name: "Master of Philosophy", duration: "2 years", fees: "₹1.5 Lakhs", eligibility: "JNUEE", seats: 150 },
      { name: "Bachelor of Arts", duration: "3 years", fees: "₹75,000", eligibility: "JNUEE", seats: 300 },
      { name: "PhD Programs", duration: "3-5 years", fees: "₹2 Lakhs", eligibility: "JNUEE", seats: 500 }
    ],
    rating: 4.6,
    fees: "₹25,000 - 1.5 Lakhs",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    description: "JNU is known for its academic excellence and vibrant campus life, especially in social sciences and humanities.",
    facilities: ["Central Library", "International Students Hostel", "Cultural Centers", "Research Centers"],
    placement: {
      average: "₹12 LPA",
      highest: "₹35 LPA",
      percentage: "78%"
    },
    admissionProcess: ["JNUEE", "Interview", "Merit Based"],
    contact: {
      phone: "+91-11-2670-4201",
      email: "registrar@jnu.ac.in",
      website: "www.jnu.ac.in"
    },
    rank: {
      nirf: "10",
      india: "7"
    },
    counsellingCode: "JNU",
    established: "1969",
    accreditation: ["NAAC A++", "UGC Recognized"],
    cutoff: {
      general: "90-95%",
      obc: "85-90%",
      sc: "75-80%",
      st: "70-75%"
    }
  },
  {
    id: "4",
    name: "Indian Institute of Management Bangalore",
    location: "Bangalore",
    type: "Management",
    courses: ["MBA", "Executive MBA", "PGDM", "PhD Management"],
    courseDetails: [
      { name: "Post Graduate Programme", duration: "2 years", fees: "₹24.5 Lakhs", eligibility: "CAT", seats: 408 },
      { name: "Executive Post Graduate Programme", duration: "1 year", fees: "₹31.5 Lakhs", eligibility: "Work Experience", seats: 180 },
      { name: "PhD Programme", duration: "4-5 years", fees: "₹8 Lakhs", eligibility: "CAT/GMAT", seats: 40 }
    ],
    rating: 4.9,
    fees: "₹24 - 35 Lakhs",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    description: "IIM Bangalore is one of India's top business schools, known for producing exceptional management professionals.",
    facilities: ["Executive Learning Center", "Library", "Hostels", "Sports Complex", "Innovation Labs"],
    placement: {
      average: "₹33 LPA",
      highest: "₹67 LPA", 
      percentage: "100%"
    },
    admissionProcess: ["CAT", "WAT", "Personal Interview"],
    contact: {
      phone: "+91-80-2699-3000",
      email: "registrar@iimb.ac.in",
      website: "www.iimb.ac.in"
    },
    rank: {
      nirf: "1",
      india: "1"
    },
    counsellingCode: "IIMB",
    established: "1973",
    accreditation: ["AACSB", "EQUIS", "AMBA"],
    cutoff: {
      general: "99+ Percentile",
      obc: "96+ Percentile",
      sc: "78+ Percentile",
      st: "60+ Percentile"
    }
  },
  {
    id: "5",
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    type: "Medical",
    courses: ["MBBS", "MD", "MS", "Nursing", "Dental"],
    courseDetails: [
      { name: "MBBS", duration: "5.5 years", fees: "₹5,856", eligibility: "NEET", seats: 125 },
      { name: "MD/MS", duration: "3 years", fees: "₹25,000", eligibility: "NEET PG", seats: 500 },
      { name: "BSc Nursing", duration: "4 years", fees: "₹6,000", eligibility: "NEET", seats: 60 },
      { name: "BDS", duration: "5 years", fees: "₹50,000", eligibility: "NEET", seats: 40 }
    ],
    rating: 4.9,
    fees: "₹1,500 - 5 Lakhs",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    description: "AIIMS Delhi is India's premier medical institution, offering world-class medical education and healthcare.",
    facilities: ["Super Specialty Hospital", "Research Labs", "Hostels", "Library", "Trauma Center"],
    placement: {
      average: "Government Service",
      highest: "₹25 LPA (Private)",
      percentage: "100%"
    },
    admissionProcess: ["NEET", "AIIMS MBBS", "Interview"],
    contact: {
      phone: "+91-11-2659-3333",
      email: "registrar@aiims.edu",
      website: "www.aiims.edu"
    },
    rank: {
      nirf: "1",
      india: "1"
    },
    counsellingCode: "AIIMS",
    established: "1956",
    accreditation: ["NAAC A++", "MCI Recognized"],
    cutoff: {
      general: "50-100 AIR",
      obc: "150-300 AIR",
      sc: "8000-15000 AIR",
      st: "15000-25000 AIR"
    }
  },
  {
    id: "6",
    name: "National Institute of Design",
    location: "Ahmedabad",
    type: "Design",
    courses: ["Product Design", "Communication Design", "Textile Design", "Animation"],
    courseDetails: [
      { name: "Bachelor of Design", duration: "4 years", fees: "₹3.65 Lakhs", eligibility: "NID DAT", seats: 175 },
      { name: "Master of Design", duration: "2.5 years", fees: "₹4.95 Lakhs", eligibility: "NID DAT", seats: 140 },
      { name: "PhD in Design", duration: "3-5 years", fees: "₹2 Lakhs", eligibility: "NID Entrance", seats: 20 }
    ],
    rating: 4.7,
    fees: "₹3.5 - 8 Lakhs",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    description: "NID is India's premier design institution, fostering creativity and innovation in design education.",
    facilities: ["Design Studios", "Workshops", "Library", "Hostels", "Exhibition Spaces"],
    placement: {
      average: "₹12 LPA",
      highest: "₹35 LPA",
      percentage: "92%"
    },
    admissionProcess: ["NID Entrance", "Studio Test", "Personal Interview"],
    contact: {
      phone: "+91-79-2662-9692",
      email: "info@nid.edu",
      website: "www.nid.edu"
    },
    rank: {
      nirf: "1",
      india: "1"
    },
    counsellingCode: "NID",
    established: "1961",
    accreditation: ["NAAC A", "UGC Recognized"],
    cutoff: {
      general: "Top 200 Rank",
      obc: "Top 300 Rank",
      sc: "Top 500 Rank",
      st: "Top 600 Rank"
    }
  },
  {
    id: "7",
    name: "Indian Statistical Institute",
    location: "Kolkata",
    type: "Statistics & Mathematics",
    courses: ["Statistics", "Mathematics", "Computer Science", "Economics"],
    courseDetails: [
      { name: "Bachelor of Statistics", duration: "3 years", fees: "₹2,000", eligibility: "ISI Entrance", seats: 45 },
      { name: "Bachelor of Mathematics", duration: "3 years", fees: "₹2,000", eligibility: "ISI Entrance", seats: 30 },
      { name: "Master of Statistics", duration: "2 years", fees: "₹3,000", eligibility: "ISI Entrance", seats: 60 },
      { name: "PhD Programs", duration: "3-5 years", fees: "₹5,000", eligibility: "ISI Entrance", seats: 100 }
    ],
    rating: 4.6,
    fees: "₹1 - 4 Lakhs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    description: "ISI is renowned for excellence in statistical and mathematical sciences education and research.",
    facilities: ["Computer Labs", "Library", "Research Centers", "Hostels", "Seminar Halls"],
    placement: {
      average: "₹15 LPA",
      highest: "₹42 LPA",
      percentage: "88%"
    },
    admissionProcess: ["ISI Admission Test", "Interview", "Merit Based"],
    contact: {
      phone: "+91-33-2575-2000",
      email: "office@isical.ac.in",
      website: "www.isical.ac.in"
    },
    rank: {
      nirf: "2",
      india: "2"
    },
    counsellingCode: "ISI",
    established: "1931",
    accreditation: ["NAAC A++", "UGC Recognized"],
    cutoff: {
      general: "Top 50 Rank",
      obc: "Top 70 Rank",
      sc: "Top 150 Rank",
      st: "Top 200 Rank"
    }
  },
  {
    id: "8",
    name: "Loyola College Chennai",
    location: "Chennai",
    type: "Arts & Science",
    courses: ["Commerce", "Science", "Arts", "Management"],
    courseDetails: [
      { name: "Bachelor of Commerce", duration: "3 years", fees: "₹85,000", eligibility: "Merit Based", seats: 400 },
      { name: "Bachelor of Science", duration: "3 years", fees: "₹90,000", eligibility: "Merit Based", seats: 350 },
      { name: "Bachelor of Arts", duration: "3 years", fees: "₹70,000", eligibility: "Merit Based", seats: 250 },
      { name: "MBA", duration: "2 years", fees: "₹3 Lakhs", eligibility: "CAT/MAT", seats: 120 }
    ],
    rating: 4.4,
    fees: "₹50,000 - 3 Lakhs",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    description: "Loyola College is one of Chennai's premier educational institutions known for academic excellence.",
    facilities: ["Library", "Labs", "Sports Complex", "Auditorium", "Cafeteria"],
    placement: {
      average: "₹6 LPA",
      highest: "₹28 LPA",
      percentage: "82%"
    },
    admissionProcess: ["Merit Based", "Entrance Test", "Interview"],
    contact: {
      phone: "+91-44-2817-8200",
      email: "principal@loyolacollege.edu",
      website: "www.loyolacollege.edu"
    },
    rank: {
      nirf: "15",
      india: "12"
    },
    counsellingCode: "LOYOLA",
    established: "1925",
    accreditation: ["NAAC A++", "UGC Autonomous"],
    cutoff: {
      general: "85-95%",
      obc: "80-90%",
      sc: "70-80%",
      st: "65-75%"
    }
  }
];

export const searchColleges = (query, goal, city) => {
  if (!query && !goal && !city) return [];
  
  return mockColleges.filter(college => {
    const matchesQuery = !query || 
      college.name.toLowerCase().includes(query.toLowerCase()) ||
      college.courses.some(course => course.toLowerCase().includes(query.toLowerCase())) ||
      college.type.toLowerCase().includes(query.toLowerCase());
    
    const matchesGoal = !goal || 
      college.type.toLowerCase().includes(goal.toLowerCase()) ||
      college.courses.some(course => course.toLowerCase().includes(goal.toLowerCase()));
    
    const matchesCity = !city || 
      college.location.toLowerCase().includes(city.toLowerCase());
    
    return matchesQuery && matchesGoal && matchesCity;
  }).slice(0, 6);
};