
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Download, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Interview } from "@/types";

// Mock data for interviews (in a real app, this would come from an API)
const mockInterviews: Interview[] = [
  {
    id: "1",
    title: "Frontend Developer Interview",
    type: "practice",
    jobRole: {
      id: "1-1",
      title: "Frontend Developer",
      category: "Software Development",
      level: "mid",
    },
    questions: [
      {
        id: "q1",
        text: "Describe your experience with React hooks.",
        category: "Technical",
        difficulty: "medium",
      },
      {
        id: "q2",
        text: "How would you optimize a React application?",
        category: "Technical",
        difficulty: "hard",
      },
    ],
    createdAt: "2025-05-01T14:30:00Z",
    completedAt: "2025-05-01T15:00:00Z",
    score: 85,
  },
  {
    id: "2",
    title: "Product Manager Interview",
    type: "practice",
    jobRole: {
      id: "3-1",
      title: "Product Manager",
      category: "Product Management",
      level: "senior",
    },
    questions: [
      {
        id: "q3",
        text: "How do you prioritize features?",
        category: "Product",
        difficulty: "medium",
      },
      {
        id: "q4",
        text: "Tell me about a time when you had to make a difficult product decision.",
        category: "Behavioral",
        difficulty: "medium",
      },
    ],
    createdAt: "2025-04-28T10:15:00Z",
    completedAt: "2025-04-28T10:45:00Z",
    score: 78,
  },
  {
    id: "3",
    title: "Data Analyst Interview",
    type: "company",
    company: {
      id: "acme",
      name: "Acme Corp",
      logoUrl: "/placeholder.svg",
      description: "A leading tech company",
    },
    jobRole: {
      id: "2-1",
      title: "Data Analyst",
      category: "Data Science & Analytics",
      level: "entry",
    },
    questions: [
      {
        id: "q5",
        text: "How would you handle missing data in a dataset?",
        category: "Technical",
        difficulty: "medium",
      },
      {
        id: "q6",
        text: "Describe a challenging data analysis project you've worked on.",
        category: "Experience",
        difficulty: "medium",
      },
    ],
    createdAt: "2025-04-20T09:00:00Z",
    completedAt: "2025-04-20T09:30:00Z",
    score: 92,
  },
];

export default function DashboardPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchInterviews = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setInterviews(mockInterviews);
        setLoading(false);
      }, 500);
    };

    fetchInterviews();
  }, []);

  const handleDownloadReport = (interviewId: string) => {
    // In a real app, this would download the actual report for the specific interview
    window.open("https://drive.google.com/file/d/1UdDct7rCLa3nQ0qFjGN-3ToZljMfBJBs/view?usp=sharing", "_blank");
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">Track your interview performance and progress</p>
          </div>
          <Button asChild>
            <a href="/practice">
              Start New Interview
            </a>
          </Button>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xl">Total Interviews</CardTitle>
              <CardDescription>Interviews completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{interviews.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xl">Average Score</CardTitle>
              <CardDescription>Overall performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {interviews.length > 0
                  ? `${Math.round(
                      interviews.reduce((sum, interview) => sum + (interview.score || 0), 0) /
                        interviews.length
                    )}%`
                  : "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xl">Latest Interview</CardTitle>
              <CardDescription>Most recent session</CardDescription>
            </CardHeader>
            <CardContent>
              {interviews.length > 0 ? (
                <div>
                  <div className="font-semibold">{interviews[0].title}</div>
                  <div className="text-sm text-gray-500">
                    {interviews[0].completedAt ? format(new Date(interviews[0].completedAt), "MMM d, yyyy") : "In progress"}
                  </div>
                </div>
              ) : (
                <div>No interviews yet</div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interview History</CardTitle>
            <CardDescription>Your past interview sessions and results</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading interview history...</div>
            ) : interviews.length > 0 ? (
              <Table>
                <TableCaption>A list of your recent interviews</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Interview Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.title}</TableCell>
                      <TableCell className="capitalize">
                        {interview.type === "company" 
                          ? `${interview.company?.name || "Company"}` 
                          : interview.type}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {format(new Date(interview.completedAt || interview.createdAt), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(new Date(interview.completedAt || interview.createdAt), "h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell>{interview.jobRole?.title}</TableCell>
                      <TableCell className="text-right">
                        <span 
                          className={`font-medium px-2 py-1 rounded-full text-xs ${
                            (interview.score || 0) >= 90
                              ? "bg-green-100 text-green-800"
                              : (interview.score || 0) >= 70
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {interview.score ? `${interview.score}%` : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownloadReport(interview.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't completed any interviews yet.</p>
                <Button asChild>
                  <a href="/practice">Start your first practice interview</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" >2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
