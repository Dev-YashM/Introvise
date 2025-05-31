
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Trash, Plus } from "lucide-react";

export default function PostJobPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    companyLogo: "",
    location: "",
    jobRole: "",
    category: "",
    description: "",
    requirements: ["", ""],
    qualificationScore: 70,
    isRemote: false,
    questions: ["", ""],
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements,
    });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = [...formData.requirements];
    newRequirements.splice(index, 1);
    setFormData({
      ...formData,
      requirements: newRequirements,
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, ""],
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    setFormData({
      ...formData,
      questions: newQuestions,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ["title", "companyName", "location", "jobRole", "category", "description"];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in all required fields: ${field} is missing`);
        return;
      }
    }
    
    // Validate requirements and questions
    if (formData.requirements.some((req) => !req.trim())) {
      alert("Please fill in all requirements or remove empty ones");
      return;
    }
    
    if (formData.questions.some((q) => !q.trim())) {
      alert("Please fill in all questions or remove empty ones");
      return;
    }
    
    // Submit form (in a real app, this would send data to backend)
    console.log("Job posting submitted:", formData);
    
    // Navigate to success page
    navigate("/openings/post/success", { state: { jobData: formData } });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Post a Job Opening</h1>
          <p className="text-center text-gray-600 mb-8">
            Create a job listing with an interview assessment
          </p>

          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Basic information about the job position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      placeholder="e.g., Acme Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Company Logo URL</Label>
                    <Input
                      id="companyLogo"
                      value={formData.companyLogo}
                      onChange={(e) =>
                        handleInputChange("companyLogo", e.target.value)
                      }
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Job Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software Engineering</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="product">Product Management</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobRole">Job Role *</Label>
                    <Input
                      id="jobRole"
                      value={formData.jobRole}
                      onChange={(e) =>
                        handleInputChange("jobRole", e.target.value)
                      }
                      placeholder="e.g., Frontend Developer"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="isRemote"
                      checked={formData.isRemote}
                      onCheckedChange={(value) =>
                        handleInputChange("isRemote", value)
                      }
                    />
                    <Label htmlFor="isRemote">Remote Position</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Provide a detailed description of the job responsibilities and expectations..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
                <CardDescription>
                  List the skills and qualifications needed for the job
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        placeholder={`Requirement #${index + 1}`}
                      />
                    </div>
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addRequirement}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Requirement
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Interview Assessment</CardTitle>
                <CardDescription>
                  Define the interview questions and qualification criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qualificationScore">
                    Qualification Score (%)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="qualificationScore"
                      type="number"
                      min={0}
                      max={100}
                      value={formData.qualificationScore.toString()}
                      onChange={(e) =>
                        handleInputChange(
                          "qualificationScore",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <span className="text-sm text-gray-500">
                      Minimum score required to qualify
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Interview Questions</Label>
                  {formData.questions.map((question, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Textarea
                          value={question}
                          onChange={(e) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder={`Question #${index + 1}`}
                          rows={2}
                        />
                      </div>
                      {formData.questions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addQuestion}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/openings")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
                Post Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
