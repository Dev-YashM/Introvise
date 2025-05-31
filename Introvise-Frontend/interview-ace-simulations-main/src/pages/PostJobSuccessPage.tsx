
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PostJobSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobData } = location.state || {};

  // If no job data, redirect to job posting page
  if (!jobData) {
    navigate("/openings/post");
    return null;
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex h-20 w-20 rounded-full bg-green-100 p-4 mb-8">
            <CheckCircle className="h-full w-full text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Job Posted Successfully!</h1>

          <p className="text-xl text-gray-700 mb-8">
            Your job opening for <span className="font-semibold">{jobData.title}</span>{" "}
            at <span className="font-semibold">{jobData.companyName}</span> has been posted.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                Candidates can view your job listing and take the interview assessment
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                You'll be notified when candidates complete the assessment
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                You can review candidate responses and assessment scores
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                Contact qualified candidates directly through our platform
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/openings")} 
              className="bg-brand-600 hover:bg-brand-700"
            >
              View All Job Openings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/openings/post")}
            >
              Post Another Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
