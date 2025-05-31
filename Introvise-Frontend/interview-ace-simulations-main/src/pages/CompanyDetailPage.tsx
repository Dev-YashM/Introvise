
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Import job roles data from the practice page
const jobRoles = {
  software: [
    { id: "sw-1", title: "Software Engineer" },
    { id: "sw-2", title: "Frontend Developer" },
    { id: "sw-3", title: "Backend Developer" },
    { id: "sw-4", title: "Full Stack Developer" },
    { id: "sw-5", title: "Mobile Developer" },
  ],
  data: [
    { id: "data-1", title: "Data Scientist" },
    { id: "data-2", title: "Data Analyst" },
    { id: "data-3", title: "Machine Learning Engineer" },
  ],
  design: [
    { id: "des-1", title: "Product Designer" },
    { id: "des-2", title: "UX Designer" },
    { id: "des-3", title: "UI Designer" },
  ],
  product: [
    { id: "pm-1", title: "Product Manager" },
    { id: "pm-2", title: "Technical Product Manager" },
  ],
};

const seniorities = [
  { id: "entry", title: "Entry Level" },
  { id: "mid", title: "Mid Level" },
  { id: "senior", title: "Senior Level" },
  { id: "lead", title: "Lead / Manager" },
];

export default function CompanyDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { company } = location.state || {};
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSeniority, setSelectedSeniority] = useState("");
  
  // If company doesn't exist, redirect to companies page
  if (!company) {
    navigate("/company");
    return null;
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedRole("");
  };

  const handleStartInterview = () => {
    if (!selectedRole || !selectedSeniority) {
      alert("Please select a role and seniority level");
      return;
    }
    
    // Get the role title
    const role = Object.values(jobRoles)
      .flat()
      .find((r) => r.id === selectedRole);
    
    // Get the seniority title
    const seniority = seniorities.find((s) => s.id === selectedSeniority);
    
    navigate("/company/session", {
      state: {
        company,
        role: role?.title || "",
        seniority: seniority?.title || "",
      },
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white shadow-md p-3 mr-4">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold">{company.name}</h1>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
                <p className="text-gray-700">{company.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  Interview Preparation
                </h2>
                <p className="text-gray-700 mb-4">
                  Our AI-powered system will generate interview questions specific to {company.name}'s 
                  interview process, based on the role and seniority level you select.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label>Select Job Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Engineering</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Select Role</Label>
                  <Select
                    value={selectedRole}
                    onValueChange={setSelectedRole}
                    disabled={!selectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory &&
                        jobRoles[selectedCategory as keyof typeof jobRoles]?.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Select Seniority Level</Label>
                  <Select
                    value={selectedSeniority}
                    onValueChange={setSelectedSeniority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select seniority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {seniorities.map((seniority) => (
                        <SelectItem key={seniority.id} value={seniority.id}>
                          {seniority.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button
                    onClick={handleStartInterview}
                    className="w-full bg-brand-600 hover:bg-brand-700"
                    disabled={!selectedRole || !selectedSeniority}
                  >
                    Start Company Interview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
