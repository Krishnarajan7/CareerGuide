export const mockJobs = [
  {
    id: "1",
    title: "Software Developer - Frontend",
    company: "TCS",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    category: "Engineering",
    experience: "Fresher",
    salary: {
      min: 350000,
      max: 500000,
      currency: "INR"
    },
    description: "Join our dynamic team as a Frontend Developer and work on cutting-edge web applications using React, TypeScript, and modern frameworks.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Strong foundation in HTML, CSS, JavaScript",
      "Knowledge of React.js and modern JavaScript frameworks",
      "Understanding of responsive design principles",
      "Good problem-solving skills"
    ],
    benefits: [
      "Health insurance",
      "Performance bonuses",
      "Learning and development opportunities",
      "Flexible working hours",
      "Career growth path"
    ],
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Git"],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    isActive: true,
    applicationsCount: 156
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    company: "Infosys",
    location: "Hyderabad, Telangana",
    type: "Internship",
    category: "Data Science",
    experience: "Fresher",
    salary: {
      min: 15000,
      max: 25000,
      currency: "INR"
    },
    description: "Learn and grow with our data analytics team. Work on real-world projects involving data visualization, statistical analysis, and machine learning.",
    requirements: [
      "Currently pursuing or recently completed degree in Statistics, Mathematics, or Computer Science",
      "Basic knowledge of SQL and Excel",
      "Familiarity with Python or R",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills"
    ],
    benefits: [
      "Mentorship program",
      "Certificate of completion",
      "Networking opportunities",
      "Potential for full-time offer",
      "Hands-on project experience"
    ],
    skills: ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
    postedDate: "2024-01-20",
    applicationDeadline: "2024-02-20",
    isActive: true,
    applicationsCount: 89
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Wipro",
    location: "Pune, Maharashtra",
    type: "Full-time",
    category: "Design",
    experience: "0-1 years",
    salary: {
      min: 400000,
      max: 600000,
      currency: "INR"
    },
    description: "Create intuitive and engaging user experiences for our digital products. Work closely with development teams to bring designs to life.",
    requirements: [
      "Bachelor's degree in Design, HCI, or related field",
      "Proficiency in design tools like Figma, Adobe XD, Sketch",
      "Understanding of user-centered design principles",
      "Portfolio showcasing UI/UX projects",
      "Knowledge of front-end technologies is a plus"
    ],
    benefits: [
      "Creative work environment",
      "Latest design tools and software",
      "Design conferences and workshops",
      "Health and wellness benefits",
      "Flexible work arrangements"
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    postedDate: "2024-01-18",
    applicationDeadline: "2024-02-18",
    isActive: true,
    applicationsCount: 67
  },
  {
    id: "4",
    title: "Digital Marketing Executive",
    company: "Cognizant",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    category: "Marketing",
    experience: "Fresher",
    salary: {
      min: 300000,
      max: 450000,
      currency: "INR"
    },
    description: "Drive digital marketing initiatives across multiple channels. Create and execute campaigns that engage audiences and drive business growth.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "Understanding of digital marketing channels",
      "Knowledge of social media platforms",
      "Basic understanding of analytics tools",
      "Creative thinking and content creation skills"
    ],
    benefits: [
      "Marketing tool subscriptions",
      "Conference attendance opportunities",
      "Performance-based incentives",
      "Career development programs",
      "Work-life balance"
    ],
    skills: ["Digital Marketing", "Social Media", "Content Creation", "Google Analytics", "SEO"],
    postedDate: "2024-01-22",
    applicationDeadline: "2024-02-22",
    isActive: true,
    applicationsCount: 134
  },
  {
    id: "5",
    title: "Business Analyst Trainee",
    company: "Accenture",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    category: "Management",
    experience: "Fresher",
    salary: {
      min: 450000,
      max: 650000,
      currency: "INR"
    },
    description: "Start your career in business analysis with comprehensive training and real project experience. Work with global clients on transformative initiatives.",
    requirements: [
      "Bachelor's degree in Business, Engineering, or related field",
      "Strong analytical and problem-solving skills",
      "Excellent communication and presentation skills",
      "Knowledge of business process modeling",
      "Willingness to learn new technologies"
    ],
    benefits: [
      "Comprehensive training program",
      "Global exposure opportunities",
      "Mentorship and coaching",
      "Health and life insurance",
      "Employee stock options"
    ],
    skills: ["Business Analysis", "Process Modeling", "Requirements Gathering", "Stakeholder Management"],
    postedDate: "2024-01-25",
    applicationDeadline: "2024-02-25",
    isActive: true,
    applicationsCount: 298
  },
  {
    id: "6",
    title: "Sales Development Representative",
    company: "HCL Technologies",
    location: "Noida, Uttar Pradesh",
    type: "Full-time",
    category: "Sales",
    experience: "Fresher",
    salary: {
      min: 250000,
      max: 400000,
      currency: "INR"
    },
    description: "Build relationships with potential clients and drive sales growth. Develop your sales skills while working with cutting-edge technology solutions.",
    requirements: [
      "Bachelor's degree in any field",
      "Excellent communication and interpersonal skills",
      "Goal-oriented mindset",
      "Basic understanding of technology solutions",
      "Willingness to travel occasionally"
    ],
    benefits: [
      "Commission-based incentives",
      "Sales training and certification",
      "Travel opportunities",
      "Performance recognition programs",
      "Career advancement opportunities"
    ],
    skills: ["Sales", "Communication", "Relationship Building", "CRM Software", "Negotiation"],
    postedDate: "2024-01-28",
    applicationDeadline: "2024-02-28",
    isActive: true,
    applicationsCount: 78
  }
];

export const searchJobs = (query = "", category, experience, type)=> {
  let filteredJobs = mockJobs.filter(job => job.isActive);

  if (query) {
    const normalizedQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery) ||
      job.skills.some(skill => skill.toLowerCase().includes(normalizedQuery)) ||
      job.description.toLowerCase().includes(normalizedQuery)
    );
  }

  if (category && category !== "All") {
    filteredJobs = filteredJobs.filter(job => job.category === category);
  }

  if (experience && experience !== "All") {
    filteredJobs = filteredJobs.filter(job => job.experience === experience);
  }

  if (type && type !== "All") {
    filteredJobs = filteredJobs.filter(job => job.type === type);
  }

  return filteredJobs;
};

export const getJobById = (id) => {
  return mockJobs.find(job => job.id === id);
};

export const getJobStats = () => {
  const total = mockJobs.filter(job => job.isActive).length;
  const byCategory = mockJobs.reduce((acc, job) => {
    if (job.isActive) {
      acc[job.category] = (acc[job.category] || 0) + 1;
    }
    return acc;
  }, {} );
  
  const totalApplications = mockJobs.reduce((sum, job) => sum + job.applicationsCount, 0);
  
  return {
    total,
    byCategory,
    totalApplications,
    companies: [...new Set(mockJobs.map(job => job.company))].length
  };
};