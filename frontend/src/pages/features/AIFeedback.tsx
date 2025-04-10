import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquareText, CheckCircle, MessageSquare, ThumbsUp, Edit, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Mock data for demo purposes
const SAMPLE_STUDENT_WORK = [
  {
    id: 1,
    name: "Emily Johnson",
    title: "The Impact of Climate Change on Marine Ecosystems",
    content: "Climate change is rapidly affecting marine ecosystems worldwide. Rising sea temperatures, ocean acidification, and changing currents are disrupting marine life cycles. Coral reefs are particularly vulnerable, with widespread bleaching events becoming more frequent. Many species are struggling to adapt to these rapid changes, leading to shifts in distribution and population declines. Conservation efforts must address these challenges through comprehensive policies and protective measures.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Analysis of Economic Factors in the Great Depression",
    content: "The Great Depression was caused by multiple economic factors, including the stock market crash of 1929, banking failures, and reduced consumer spending. However, government policies and international trade issues also played significant roles. The Federal Reserve's monetary policies were too restrictive, while the gold standard limited economic flexibility. These factors created a perfect storm that plunged the economy into a severe downturn.",
  },
  {
    id: 3,
    name: "Sophia Liu",
    title: "The Symbolism in Shakespeare's Hamlet",
    content: "Shakespeare uses various symbols throughout Hamlet to convey complex themes. The ghost represents unresolved issues and moral dilemmas. Yorick's skull symbolizes mortality and the inevitability of death. The poisoned cup reflects the corruption spreading through Denmark. These symbols enhance the play's exploration of revenge, morality, and the human condition.",
  }
];

// Sample feedback templates
const FEEDBACK_TEMPLATES = {
  strengths: [
    "Well-structured {submissionType} that clearly states your thesis.",
    "Excellent use of evidence to support your main arguments.",
    "Strong analytical approach to the topic.",
    "Effective use of relevant terminology and concepts.",
    "Clear and concise writing style that enhances readability."
  ],
  improvements: [
    "Consider adding more examples to support your {argumentPosition} argument.",
    "The conclusion could be strengthened by more explicitly connecting to your thesis.",
    "Some claims need additional evidence or citations to strengthen your argument.",
    "Consider exploring counterarguments to make your analysis more balanced.",
    "More specific details would enhance your analysis in the section about {topicReference}."
  ]
};

const AIFeedback = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentWork, setStudentWork] = useState(SAMPLE_STUDENT_WORK);
  const [selectedWork, setSelectedWork] = useState(null);
  const [customWorkInput, setCustomWorkInput] = useState({
    studentName: '',
    title: '',
    content: ''
  });
  const [feedback, setFeedback] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');
  const [userRole, setUserRole] = useState('teacher'); // teacher or student

  // Check login status on mount
  useEffect(() => {
    // In a real app, this would check authentication status
    const checkLoginStatus = () => {
      // For demo purposes, just using local storage
      const storedLoginState = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(storedLoginState === 'true');
      
      // Get user role
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        setUserRole(storedRole);
      }
    };
    
    checkLoginStatus();
  }, []);

  // Generate AI feedback for selected student work
  const generateFeedback = async (work) => {
    setIsGenerating(true);
    setFeedback([]);
    
    try {
      // In a real app, this would call an API endpoint
      // Here we simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get submission type (essay, analysis, etc.)
      const submissionType = work.title.toLowerCase().includes('analysis') ? 'analysis' : 'essay';
      
      // Get topic reference from the content
      const contentWords = work.content.split(' ');
      const topicReference = contentWords.length > 5 ? 
        contentWords.slice(Math.floor(contentWords.length / 2), Math.floor(contentWords.length / 2) + 2).join(' ') : 
        'the main topic';
      
      // Generate 2-3 strengths
      const strengths = [];
      const strengthCount = Math.floor(Math.random() * 2) + 2; // 2-3 strengths
      const usedStrengthIndexes = new Set();
      
      for (let i = 0; i < strengthCount; i++) {
        let strengthIndex;
        do {
          strengthIndex = Math.floor(Math.random() * FEEDBACK_TEMPLATES.strengths.length);
        } while (usedStrengthIndexes.has(strengthIndex));
        
        usedStrengthIndexes.add(strengthIndex);
        let strength = FEEDBACK_TEMPLATES.strengths[strengthIndex]
          .replace('{submissionType}', submissionType);
        
        strengths.push({
          type: 'strength',
          content: strength
        });
      }
      
      // Generate 2-3 suggestions for improvement
      const improvements = [];
      const improvementCount = Math.floor(Math.random() * 2) + 2; // 2-3 improvements
      const usedImprovementIndexes = new Set();
      
      for (let i = 0; i < improvementCount; i++) {
        let improvementIndex;
        do {
          improvementIndex = Math.floor(Math.random() * FEEDBACK_TEMPLATES.improvements.length);
        } while (usedImprovementIndexes.has(improvementIndex));
        
        usedImprovementIndexes.add(improvementIndex);
        let argumentPosition = ['first', 'second', 'third'][Math.floor(Math.random() * 3)];
        
        let improvement = FEEDBACK_TEMPLATES.improvements[improvementIndex]
          .replace('{argumentPosition}', argumentPosition)
          .replace('{topicReference}', topicReference);
        
        improvements.push({
          type: 'suggestion',
          content: improvement
        });
      }
      
      // Combine and shuffle feedback
      const combinedFeedback = [...strengths, ...improvements];
      for (let i = combinedFeedback.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedFeedback[i], combinedFeedback[j]] = [combinedFeedback[j], combinedFeedback[i]];
      }
      
      setFeedback(combinedFeedback);
      toast({
        title: "Feedback Generated",
        description: "AI feedback has been successfully generated for " + work.name + "'s submission.",
        duration: 3000,
      });
      
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast({
        title: "Error",
        description: "Failed to generate feedback. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWorkSelection = (work) => {
    setSelectedWork(work);
    generateFeedback(work);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customWorkInput.studentName || !customWorkInput.title || !customWorkInput.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to generate feedback.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const newWork = {
      id: Date.now(),
      name: customWorkInput.studentName,
      title: customWorkInput.title,
      content: customWorkInput.content
    };
    
    setStudentWork(prev => [...prev, newWork]);
    setSelectedWork(newWork);
    generateFeedback(newWork);
  };

  const handleLogin = () => {
    // In a real app, this would authenticate the user
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userRole);
    setIsLoggedIn(true);
    toast({
      title: "Logged In",
      description: `You are now logged in as a ${userRole}.`,
      duration: 3000,
    });
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setSelectedWork(null);
    setFeedback([]);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      duration: 3000,
    });
  };

  const editFeedback = (index, newContent) => {
    const updatedFeedback = [...feedback];
    updatedFeedback[index].content = newContent;
    setFeedback(updatedFeedback);
  };

  return (
    <div className="min-h-screen bg-dark-100">
      <Navbar />
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <Link to="/features" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Features
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="h-24 w-24 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
                <MessageSquareText className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">AI-Generated</span> Feedback
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Provide timely, constructive feedback to students with AI-powered comments that identify areas for improvement and highlight strengths in their work.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Instant feedback</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Contextual comments</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Improvement areas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Editable suggestions</span>
                </div>
              </div>
              
              {!isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      className={`${userRole === 'teacher' ? 'bg-yellow-500/20 text-yellow-400' : ''}`}
                      onClick={() => setUserRole('teacher')}
                    >
                      I'm a Teacher
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`${userRole === 'student' ? 'bg-yellow-500/20 text-yellow-400' : ''}`}
                      onClick={() => setUserRole('student')}
                    >
                      I'm a Student
                    </Button>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                    onClick={handleLogin}
                  >
                    Try It Now
                  </Button>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              )}
            </div>
            
            <div className="w-full md:w-1/2">
              <Card className="glass-morphism hover:yellow-glow p-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
                <div className="flex flex-col items-center space-y-8">
                  <MessageSquare className="h-16 w-16 text-yellow-400" />
                  <div className="w-full max-w-md">
                    <div className="space-y-4">
                      <div className="border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="bg-yellow-500/20 rounded-full p-1 mr-3">
                            <ThumbsUp className="h-4 w-4 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-yellow-400 text-sm font-semibold mb-1">Strength</p>
                            <p className="text-gray-300 text-sm">Well-structured introduction that clearly states your thesis.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="bg-yellow-500/20 rounded-full p-1 mr-3">
                            <Edit className="h-4 w-4 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-yellow-400 text-sm font-semibold mb-1">Suggestion</p>
                            <p className="text-gray-300 text-sm">Consider adding more examples to support your second argument.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Detailed AI-generated feedback</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">How It Works</h2>
              <p className="text-gray-300 mb-4">
                Our AI analyzes each student submission and generates constructive, educational feedback tailored to the specific content. It identifies strengths to reinforce positive aspects and provides suggestions for areas that need improvement.
              </p>
              <p className="text-gray-300">
                Teachers can review and edit the AI-generated feedback before it's shared with students, ensuring that all comments align with their teaching approach and lesson objectives.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Save time with instant feedback generation for each submission</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Provide more detailed feedback than time would normally allow</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Maintain consistency in feedback quality across all students</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Help students understand exactly how to improve their work</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Interactive Demo Section */}
        {isLoggedIn && (
          <div className="container mx-auto px-4 mb-16">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                {userRole === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}
              </h2>
              
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  className={`px-4 py-2 ${activeTab === 'demo' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('demo')}
                >
                  {userRole === 'teacher' ? 'Student Submissions' : 'My Submissions'}
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === 'custom' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('custom')}
                >
                  {userRole === 'teacher' ? 'Add New Submission' : 'Create New Submission'}
                </button>
              </div>
              
              {activeTab === 'demo' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                      {userRole === 'teacher' ? 'Select Student Work' : 'My Work'}
                    </h3>
                    <div className="space-y-4">
                      {studentWork.map((work) => (
                        <div 
                          key={work.id}
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedWork?.id === work.id 
                              ? 'bg-yellow-500/20 border border-yellow-500/50' 
                              : 'bg-gray-800/50 hover:bg-gray-800'
                          }`}
                          onClick={() => handleWorkSelection(work)}
                        >
                          <h4 className="font-medium text-yellow-400">{work.name}</h4>
                          <p className="text-sm text-gray-300">{work.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    {selectedWork ? (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-2 text-yellow-400">{selectedWork.title}</h3>
                          <p className="text-sm text-gray-400 mb-4">by {selectedWork.name}</p>
                          <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                            <p className="text-gray-300 whitespace-pre-line">{selectedWork.content}</p>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-yellow-400">AI Feedback</h3>
                            {userRole === 'teacher' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-yellow-400 border-yellow-500/50"
                                onClick={() => generateFeedback(selectedWork)}
                                disabled={isGenerating}
                              >
                                {isGenerating ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  'Regenerate Feedback'
                                )}
                              </Button>
                            )}
                          </div>
                          
                          {isGenerating ? (
                            <div className="flex flex-col items-center justify-center p-12">
                              <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-4" />
                              <p className="text-gray-300">Generating AI feedback...</p>
                            </div>
                          ) : feedback.length > 0 ? (
                            <div className="space-y-4">
                              {feedback.map((item, index) => (
                                <div 
                                  key={index} 
                                  className="border border-yellow-500/30 rounded-lg p-4"
                                >
                                  <div className="flex items-start">
                                    <div className="bg-yellow-500/20 rounded-full p-1 mr-3">
                                      {item.type === 'strength' ? (
                                        <ThumbsUp className="h-4 w-4 text-yellow-400" />
                                      ) : (
                                        <Edit className="h-4 w-4 text-yellow-400" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-yellow-400 text-sm font-semibold mb-1">
                                        {item.type === 'strength' ? 'Strength' : 'Suggestion'}
                                      </p>
                                      
                                      {userRole === 'teacher' ? (
                                        <Textarea
                                          value={item.content}
                                          onChange={(e) => editFeedback(index, e.target.value)}
                                          className="text-gray-300 text-sm bg-gray-800/50 border-gray-700"
                                          rows={2}
                                        />
                                      ) : (
                                        <p className="text-gray-300 text-sm">{item.content}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              {userRole === 'teacher' && (
                                <div className="flex justify-end mt-4">
                                  <Button 
                                    className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                                  >
                                    Send Feedback to Student
                                  </Button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                              <p className="text-gray-400">No feedback generated yet.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-800/50 p-8 rounded-lg text-center">
                        <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">
                          {userRole === 'teacher' 
                            ? 'Select a student submission to generate feedback' 
                            : 'Select one of your submissions to view feedback'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                    {userRole === 'teacher' ? 'Add Student Submission' : 'Create New Submission'}
                  </h3>
                  
                  <form onSubmit={handleCustomSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input
                        id="studentName"
                        value={customWorkInput.studentName}
                        onChange={(e) => setCustomWorkInput({...customWorkInput, studentName: e.target.value})}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="title">Assignment Title</Label>
                      <Input
                        id="title"
                        value={customWorkInput.title}
                        onChange={(e) => setCustomWorkInput({...customWorkInput, title: e.target.value})}
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={customWorkInput.content}
                        onChange={(e) => setCustomWorkInput({...customWorkInput, content: e.target.value})}
                        className="bg-gray-800/50 border-gray-700"
                        rows={8}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                    >
                      {userRole === 'teacher' 
                        ? 'Add Submission & Generate Feedback' 
                        : 'Submit Work for Feedback'}
                    </Button>
                  </form>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to provide better feedback faster?</h2>
            <p className="text-gray-300 mb-6">Get started with our free trial and experience the difference.</p>
            <div className="flex justify-center">
              {!isLoggedIn ? (
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                  onClick={handleLogin}
                >
                  Start Your Free Trial
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIFeedback;
