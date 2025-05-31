
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  Calendar,
  Check,
  Clock,
  MapPin,
  Video,
  Briefcase,
} from "lucide-react";
import { JobOpening } from "@/types";

export default function JobDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state as { job: JobOpening } || {};

  // If job doesn't exist, redirect to openings page
  if (!job) {
    navigate("/openings");
    return null;
  }

  const handleStartInterview = () => {
    navigate(`/openings/${job.id}/interview`, { state: { job } });
  };

  // Format date as "Month Day, Year"
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 mr-4 flex-shrink-0">
                    <img
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
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
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  {job.jobRole.title}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {job.deadline
                    ? `Deadline: ${formatDate(job.deadline)}`
                    : "Open until filled"}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted: {formatDate(job.createdAt)}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Job Description</h3>
                <p className="text-gray-700">{job.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Requirements</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-lg">Interview Process</h3>
                <p className="text-gray-700 mb-4">
                  This job requires completing a video interview assessment. You'll need to answer {job.questions.length} questions 
                  related to your experience and skills. To qualify, you'll need to score at least {job.qualificationScore}% on the assessment.
                </p>
                <div className="bg-brand-50 border border-brand-200 rounded-md p-4">
                  <h4 className="text-brand-900 font-medium mb-2 flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Interview Details
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-brand-500 mr-2 mt-1" />
                      <span className="text-gray-700">
                        {job.questions.length} interview questions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-brand-500 mr-2 mt-1" />
                      <span className="text-gray-700">
                        Video recorded responses
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-brand-500 mr-2 mt-1" />
                      <span className="text-gray-700">
                        Minimum score to qualify: {job.qualificationScore}%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleStartInterview}
                className="w-full bg-brand-600 hover:bg-brand-700"
              >
                Take Interview Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
