
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileType: 'candidate' | 'employer';
  createdAt: string;
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  level: 'entry' | 'mid' | 'senior' | 'management';
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface Question {
  id: string;
  text: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface JobOpening {
  id: string;
  title: string;
  company: Company;
  jobRole: JobRole;
  location: string;
  description: string;
  requirements: string[];
  questions: Question[];
  qualificationScore: number;
  isRemote: boolean;
  createdAt: string;
  deadline?: string;
}

export interface Interview {
  id: string;
  title: string;
  type: 'practice' | 'company' | 'opening';
  jobRole?: JobRole;
  company?: Company;
  jobOpening?: JobOpening;
  questions: Question[];
  createdAt: string;
  completedAt?: string;
  score?: number;
}

export interface InterviewResponse {
  id: string;
  interviewId: string;
  questionId: string;
  videoUrl: string;
  transcript?: string;
  feedback?: string;
  score?: number;
  createdAt: string;
}

export interface InterviewSession {
  id: string;
  interview: Interview;
  currentQuestionIndex: number;
  responses: InterviewResponse[];
  startedAt: string;
  completedAt?: string;
  score?: number;
}
