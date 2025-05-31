
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Download } from "lucide-react";

export default function InterviewCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleDownloadReport = () => {
    window.open("https://drive.google.com/file/d/1UdDct7rCLa3nQ0qFjGN-3ToZljMfBJBs/view?usp=sharing", "_blank");
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex h-20 w-20 rounded-full bg-green-100 p-4 mb-8">
            <CheckCircle className="h-full w-full text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Interview Completed!</h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Thank you, {formData.firstName || "User"}! You've successfully completed your practice interview.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                Your interview responses have been recorded
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                You can review your performance in your dashboard
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </span>
                Detailed feedback will be available shortly
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={handleDownloadReport} 
            variant="default" 
            className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="mr-2" /> Download Interview Report
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/dashboard")} className="bg-brand-600 hover:bg-brand-700">
              View My Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/practice")}>
              Start Another Practice Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
