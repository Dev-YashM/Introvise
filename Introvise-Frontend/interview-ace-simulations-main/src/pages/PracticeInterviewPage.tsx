
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const jobCategories = [
  { id: "1", name: "Software Development" },
  { id: "2", name: "Data Science & Analytics" },
  { id: "3", name: "Product Management" },
  { id: "4", name: "Design" },
  { id: "5", name: "Marketing" },
  { id: "6", name: "Sales" },
  { id: "7", name: "Customer Success" },
  { id: "8", name: "Operations" },
  { id: "9", name: "Finance" },
  { id: "10", name: "Human Resources" },
];

const jobRoles = {
  "1": [
    { id: "1-1", title: "Frontend Developer" },
    { id: "1-2", title: "Backend Developer" },
    { id: "1-3", title: "Full Stack Developer" },
    { id: "1-4", title: "Mobile Developer" },
    { id: "1-5", title: "DevOps Engineer" },
  ],
  "2": [
    { id: "2-1", title: "Data Analyst" },
    { id: "2-2", title: "Data Scientist" },
    { id: "2-3", title: "Data Engineer" },
    { id: "2-4", title: "Machine Learning Engineer" },
    { id: "2-5", title: "Business Intelligence Analyst" },
  ],
  "3": [
    { id: "3-1", title: "Product Manager" },
    { id: "3-2", title: "Product Owner" },
    { id: "3-3", title: "Technical Product Manager" },
  ],
  "4": [
    { id: "4-1", title: "UX Designer" },
    { id: "4-2", title: "UI Designer" },
    { id: "4-3", title: "Product Designer" },
    { id: "4-4", title: "Graphic Designer" },
  ],
  "5": [
    { id: "5-1", title: "Digital Marketing Specialist" },
    { id: "5-2", title: "Content Marketer" },
    { id: "5-3", title: "SEO Specialist" },
    { id: "5-4", title: "Social Media Manager" },
    { id: "5-5", title: "Marketing Manager" },
  ],
};

const experienceLevels = [
  { id: "entry", name: "Entry Level (0-2 years)" },
  { id: "mid", name: "Mid Level (3-5 years)" },
  { id: "senior", name: "Senior Level (6+ years)" },
  { id: "management", name: "Management" },
];

export default function PracticeInterviewPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobCategory: "",
    jobRole: "",
    experienceLevel: "",
  });
  const [roles, setRoles] = useState<{ id: string; title: string }[]>([]);

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      jobCategory: value,
      jobRole: "",
    });
    setRoles(jobRoles[value as keyof typeof jobRoles] || []);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.firstName || !formData.lastName || !formData.email) {
        alert("Please fill in all required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate second step
      if (!formData.jobCategory || !formData.jobRole || !formData.experienceLevel) {
        alert("Please select job category, role, and experience level");
        return;
      }
      // Navigate to the interview session
      navigate("/practice/session", { state: { formData } });
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Practice Interview</h1>
          <p className="text-center text-gray-600 mb-8">
            Prepare for your upcoming interviews with our AI-powered simulations
          </p>

          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Tell us a bit about yourself to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
                <CardDescription>
                  Select the job details to tailor the interview questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobCategory">Job Category</Label>
                  <Select
                    value={formData.jobCategory}
                    onValueChange={(value) => handleCategoryChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobRole">Job Role</Label>
                  <Select
                    value={formData.jobRole}
                    onValueChange={(value) => handleChange("jobRole", value)}
                    disabled={!formData.jobCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) =>
                      handleChange("experienceLevel", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Start Interview <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
