
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AssignmentUpload from "./pages/AssignmentUpload";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
// Import feature pages
import StudentUploads from "./pages/features/StudentUploads";
import PlagiarismDetection from "./pages/features/PlagiarismDetection";
import AutoGrading from "./pages/features/AutoGrading";
import TeacherCustomization from "./pages/features/TeacherCustomization";
import AIFeedback from "./pages/features/AIFeedback";
import PerformanceReports from "./pages/features/PerformanceReports";
import Web3Storage from "./pages/features/Web3Storage";
import LanguageSupport from "./pages/features/LanguageSupport";
import SubscriptionPlans from "./pages/features/SubscriptionPlans";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/upload" element={<AssignmentUpload />} />
              <Route path="/features" element={<Features />} />
              {/* Feature detail pages */}
              <Route path="/features/student-uploads" element={<StudentUploads />} />
              <Route path="/features/plagiarism-detection" element={<PlagiarismDetection />} />
              <Route path="/features/auto-grading" element={<AutoGrading />} />
              <Route path="/features/teacher-customization" element={<TeacherCustomization />} />
              <Route path="/features/ai-feedback" element={<AIFeedback />} />
              <Route path="/features/performance-reports" element={<PerformanceReports />} />
              <Route path="/features/web3-storage" element={<Web3Storage />} />
              <Route path="/features/language-support" element={<LanguageSupport />} />
              <Route path="/features/subscription-plans" element={<SubscriptionPlans />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
