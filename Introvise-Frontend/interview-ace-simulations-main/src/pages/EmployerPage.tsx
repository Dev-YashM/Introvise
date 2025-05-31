
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Briefcase, Users, CheckCircle, ArrowRight } from "lucide-react";

export default function EmployerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">For Employers</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with qualified candidates and streamline your hiring process with our 
            advanced interview assessment platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card>
            <CardHeader>
              <div className="bg-brand-100 inline-flex p-3 rounded-md mb-3">
                <Briefcase className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle>Post Job Openings</CardTitle>
              <CardDescription>
                Create custom job listings with specific requirements and interview questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Define role, position, and qualification criteria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Create custom interview questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Set scoring parameters for candidate evaluation</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-brand-500 hover:bg-brand-600" asChild>
                <Link to="/openings/post">
                  Post a Job
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-brand-100 inline-flex p-3 rounded-md mb-3">
                <Users className="h-6 w-6 text-brand-600" />
              </div>
              <CardTitle>Manage Candidates</CardTitle>
              <CardDescription>
                Review candidate responses and make data-driven hiring decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Review candidate video responses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Access AI-powered assessment analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Easily manage the hiring pipeline</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-brand-500 hover:bg-brand-600" asChild>
                <Link to="/employer/dashboard">
                  Employer Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-brand-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to find your ideal candidates?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Get started today and transform your hiring process with our advanced interview assessment platform.
          </p>
          <Button size="lg" className="bg-brand-500 hover:bg-brand-600">
            Create Employer Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
