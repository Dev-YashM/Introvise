
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import PracticeInterviewPage from "./pages/PracticeInterviewPage";
import InterviewSessionPage from "./pages/InterviewSessionPage";
import InterviewCompletePage from "./pages/InterviewCompletePage";
import CompanyInterviewPage from "./pages/CompanyInterviewPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import JobOpeningsPage from "./pages/JobOpeningsPage";
import JobDetailPage from "./pages/JobDetailPage";
import PostJobPage from "./pages/PostJobPage";
import PostJobSuccessPage from "./pages/PostJobSuccessPage";
import LoginPage from "./pages/LoginPage";
import EmployerPage from "./pages/EmployerPage";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="practice" element={<PracticeInterviewPage />} />
            <Route path="practice/session" element={<InterviewSessionPage />} />
            <Route path="practice/complete" element={<InterviewCompletePage />} />
            <Route path="company" element={<CompanyInterviewPage />} />
            <Route path="company/:id" element={<CompanyDetailPage />} />
            <Route path="company/session" element={<InterviewSessionPage />} />
            <Route path="openings" element={<JobOpeningsPage />} />
            <Route path="openings/:id" element={<JobDetailPage />} />
            <Route path="openings/:id/interview" element={<InterviewSessionPage />} />
            <Route path="openings/post" element={<PostJobPage />} />
            <Route path="openings/post/success" element={<PostJobSuccessPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="for-employers" element={<EmployerPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
