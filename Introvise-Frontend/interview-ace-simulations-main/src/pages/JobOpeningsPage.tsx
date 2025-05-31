
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { JobOpening } from "@/types";
import { Briefcase, Search, Calendar, MapPin, Building } from "lucide-react";

// Mock job openings (in a real app, these would come from API)
const mockJobOpenings: JobOpening[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: {
      id: "1",
      name: "Google",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png",
    },
    jobRole: {
      id: "fe-1",
      title: "Frontend Developer",
      category: "software",
      level: "senior",
    },
    location: "Mountain View, CA",
    description: "We're looking for a Senior Frontend Developer to join our team and help build the next generation of Google products.",
    requirements: [
      "5+ years of experience with JavaScript and modern frameworks (React, Vue, Angular)",
      "Strong knowledge of HTML, CSS, and responsive design",
      "Experience with state management libraries (Redux, Vuex, etc.)",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
    questions: [
      {
        id: "q1",
        text: "Describe a challenging frontend project you've worked on and how you solved technical issues.",
      },
      {
        id: "q2",
        text: "How do you optimize frontend performance?",
      },
      {
        id: "q3",
        text: "Explain your approach to accessibility in web applications.",
      },
    ],
    qualificationScore: 80,
    isRemote: false,
    createdAt: "2023-04-15T10:30:00Z",
    deadline: "2023-05-15T23:59:59Z",
  },
  {
    id: "2",
    title: "Data Scientist",
    company: {
      id: "2",
      name: "Microsoft",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/640px-Microsoft_logo.svg.png",
    },
    jobRole: {
      id: "ds-1",
      title: "Data Scientist",
      category: "data",
      level: "mid",
    },
    location: "Redmond, WA",
    description: "Join our data science team to analyze large datasets and build machine learning models to solve complex problems.",
    requirements: [
      "3+ years of experience in data science or machine learning",
      "Strong programming skills in Python or R",
      "Experience with ML frameworks (TensorFlow, PyTorch)",
      "MSc or PhD in Computer Science, Statistics, or related field",
    ],
    questions: [
      {
        id: "q1",
        text: "Describe a data science project where you had to work with incomplete or messy data.",
      },
      {
        id: "q2",
        text: "How do you approach feature selection in a machine learning model?",
      },
      {
        id: "q3",
        text: "Explain a complex machine learning concept in simple terms.",
      },
    ],
    qualificationScore: 75,
    isRemote: true,
    createdAt: "2023-04-10T14:20:00Z",
    deadline: "2023-05-10T23:59:59Z",
  },
  {
    id: "3",
    title: "Product Manager",
    company: {
      id: "3",
      name: "Amazon",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/640px-Amazon_logo.svg.png",
    },
    jobRole: {
      id: "pm-1",
      title: "Product Manager",
      category: "product",
      level: "mid",
    },
    location: "Seattle, WA",
    description: "Lead product development for Amazon Web Services, driving product strategy and roadmap execution.",
    requirements: [
      "4+ years of product management experience",
      "Experience with cloud services or enterprise software",
      "Strong analytical and communication skills",
      "Bachelor's degree in Computer Science, Business, or related field",
    ],
    questions: [
      {
        id: "q1",
        text: "How do you prioritize features in a product roadmap?",
      },
      {
        id: "q2",
        text: "Describe a situation where you had to make a difficult product decision based on conflicting data.",
      },
      {
        id: "q3",
        text: "How do you measure the success of a product feature?",
      },
    ],
    qualificationScore: 70,
    isRemote: false,
    createdAt: "2023-04-05T09:15:00Z",
    deadline: "2023-05-05T23:59:59Z",
  },
  {
    id: "4",
    title: "UX Designer",
    company: {
      id: "4",
      name: "Apple",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/640px-Apple_logo_black.svg.png",
    },
    jobRole: {
      id: "ux-1",
      title: "UX Designer",
      category: "design",
      level: "senior",
    },
    location: "Cupertino, CA",
    description: "Create intuitive and elegant user experiences for Apple products that millions of people use every day.",
    requirements: [
      "5+ years of UX design experience",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Experience with user research and usability testing",
      "Bachelor's degree in Design, HCI, or related field",
    ],
    questions: [
      {
        id: "q1",
        text: "Walk us through your design process from brief to implementation.",
      },
      {
        id: "q2",
        text: "How do you incorporate user feedback into your design process?",
      },
      {
        id: "q3",
        text: "Describe a design challenge you faced and how you resolved it.",
      },
    ],
    qualificationScore: 85,
    isRemote: false,
    createdAt: "2023-04-12T11:45:00Z",
    deadline: "2023-05-12T23:59:59Z",
  },
  {
    id: "5",
    title: "Backend Engineer",
    company: {
      id: "5",
      name: "Meta",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/640px-Meta_Platforms_Inc._logo.svg.png",
    },
    jobRole: {
      id: "be-1",
      title: "Backend Developer",
      category: "software",
      level: "mid",
    },
    location: "Menlo Park, CA",
    description: "Build scalable backend services for Meta's ecosystem of apps used by billions of people worldwide.",
    requirements: [
      "3+ years of experience with backend development",
      "Proficiency in languages like Python, Java, or Go",
      "Experience with databases and distributed systems",
      "Bachelor's degree in Computer Science or equivalent experience",
    ],
    questions: [
      {
        id: "q1",
        text: "How do you design a system to handle millions of concurrent users?",
      },
      {
        id: "q2",
        text: "Describe your approach to writing maintainable and scalable code.",
      },
      {
        id: "q3",
        text: "How do you handle database scaling challenges?",
      },
    ],
    qualificationScore: 75,
    isRemote: true,
    createdAt: "2023-04-08T13:30:00Z",
    deadline: "2023-05-08T23:59:59Z",
  },
];

export default function JobOpeningsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobOpening[]>(mockJobOpenings);
  const [activeTab, setActiveTab] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterJobs(term, activeTab);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterJobs(searchTerm, value);
  };

  const filterJobs = (term: string, tab: string) => {
    let filtered = [...mockJobOpenings];
    
    // Filter by search term
    if (term.trim() !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term.toLowerCase()) ||
          job.company.name.toLowerCase().includes(term.toLowerCase()) ||
          job.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by tab
    if (tab === "remote") {
      filtered = filtered.filter((job) => job.isRemote);
    }
    
    setFilteredJobs(filtered);
  };

  const handleSelectJob = (job: JobOpening) => {
    navigate(`/openings/${job.id}`, { state: { job } });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Job Openings</h1>
          <p className="text-center text-gray-600 mb-8">
            Apply to job openings and complete interview assessments
          </p>

          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/openings/post")}
              className="whitespace-nowrap"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="remote">Remote Jobs</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSelectJob(job)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 flex-shrink-0">
                        <img
                          src={job.company.logoUrl}
                          alt={job.company.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {job.company.name}
                        </CardDescription>
                      </div>
                    </div>
                    {job.isRemote && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Remote
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600 line-clamp-2 mb-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {job.deadline
                        ? `Deadline: ${new Date(job.deadline).toLocaleDateString()}`
                        : "Open until filled"}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="ml-auto text-brand-600 hover:text-brand-700 hover:bg-brand-50">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No job openings found</h3>
                <p className="text-gray-600">
                  Try a different search term or check back later for new openings
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredJobs(mockJobOpenings);
                  }}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
