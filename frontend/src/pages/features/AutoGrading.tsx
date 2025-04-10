import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart4, CheckCircle, Award, ListChecks, History, Upload, Download, FileText, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AutoGrading = () => {
  // State for master and student files
  const [masterFile, setMasterFile] = useState(null);
  const [studentFiles, setStudentFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Handle master file upload
  const handleMasterFileUpload = (e) => {
    if (e.target.files[0]) {
      setMasterFile(e.target.files[0]);
    }
  };
var student_copy="";
  const handleStudentFilesUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      extractTextFromImageWithGemini(files[0]).then((text) => {
        console.log(text);
        student_copy=text;
        alert("image uploaded")
      });
    }
  };
  
  
  async function extractTextFromImageWithGemini(file) {
    const GEMINI_API_KEY = "AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8"; // 🔐 Replace with your real key

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      const mimeType = file.type;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  { text: "Extract all readable text from this image." },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: base64,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const extractedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (extractedText) {
        // alert("Extracted Text:\n\n" + extractedText);
        console.log(extractedText);
        return extractedText;
      } else {
        alert("No readable text found or something went wrong.");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text from the image.");
    }
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result.split(",")[1]; // remove data:image/...;base64,
        resolve(result);
      };
      reader.onerror = reject;
    });
  }


  // Process assignments and generate scores
  const processAssignments = () => {
    if (!masterFile || studentFiles.length === 0) {
      alert("Please upload both master copy and student assignments");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress
    const totalSteps = studentFiles.length;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setProcessingProgress(Math.round((currentStep / totalSteps) * 100));
      
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        
        // Generate mock results
        const mockResults = studentFiles.map((file, index) => {
          const score = Math.floor(Math.random() * 4) + 7; // Random score between 7-10
          return {
            id: index + 1,
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
            fileName: file.name,
            score: score,
            percentage: score * 10,
            grade: score >= 9 ? 'A' : score >= 8 ? 'B' : 'C',
            feedback: generateFeedback(score)
          };
        });
        
        // Sort by score (highest first)
        mockResults.sort((a, b) => b.score - a.score);
        
        // Add rank property
        mockResults.forEach((result, index) => {
          result.rank = index + 1;
        });
        
        setResults(mockResults);
        setIsProcessing(false);
        setShowResults(true);
      }
    }, 500);
  };

  // Generate feedback based on score
  const generateFeedback = (score) => {
    if (score >= 9) {
      return "Excellent work! The submission closely matches the expected answers with thorough explanations and correct implementation.";
    } else if (score >= 8) {
      return "Good work overall. Most concepts are correctly addressed, with some minor improvements possible in certain areas.";
    } else {
      return "Satisfactory work. The core concepts are present, but there are areas that need more detailed explanation or correction.";
    }
  };

  // Download individual report
  const downloadReport = (result) => {
    const reportContent = `
Assignment Grading Report
------------------------
Student: ${result.name}
File: ${result.fileName}
Score: ${result.score}/10
Percentage: ${result.percentage}%
Grade: ${result.grade}
Rank: ${result.rank}

Feedback:
${result.feedback}

Generated on: ${new Date().toLocaleString()}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.name}-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all reports as a single file
  const downloadAllReports = () => {
    if (results.length === 0) return;
    
    const allReportsContent = results.map(result => `
Assignment Grading Report: ${result.name}
------------------------
Student: ${result.name}
File: ${result.fileName}
Score: ${result.score}/10
Percentage: ${result.percentage}%
Grade: ${result.grade}
Rank: ${result.rank}

Feedback:
${result.feedback}
    `).join('\n\n------------------------------------------------\n\n');
    
    const blob = new Blob([allReportsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-reports-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate grade distribution
  const calculateGradeDistribution = () => {
    if (results.length === 0) return { A: 0, B: 0, C: 0 };
    
    const distribution = {
      A: results.filter(r => r.grade === 'A').length,
      B: results.filter(r => r.grade === 'B').length,
      C: results.filter(r => r.grade === 'C').length
    };
    
    return distribution;
  };

  const gradeDistribution = calculateGradeDistribution();

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
                <BarChart4 className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">Automatic</span> Grading & Ranking
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Save hours of manual grading with our intelligent evaluation system that assigns scores based on customizable criteria and rubrics.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Custom rubrics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Auto scoring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Class ranking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Grade distribution</span>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">Try It Now</Link>
              </Button>
            </div>
            
            <div className="w-full md:w-1/2">
              <Card className="glass-morphism hover:yellow-glow p-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
                <div className="flex flex-col items-center space-y-8">
                  <Award className="h-16 w-16 text-yellow-400" />
                  <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                    <div className="flex flex-col items-center">
                      <div className="h-24 bg-gradient-to-t from-yellow-500/30 to-yellow-500/10 rounded-lg w-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-400">A</span>
                      </div>
                      <span className="text-xs mt-2 text-gray-400">90-100%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 mt-8 bg-gradient-to-t from-yellow-500/20 to-yellow-500/5 rounded-lg w-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-300">B</span>
                      </div>
                      <span className="text-xs mt-2 text-gray-400">80-89%</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 mt-14 bg-gradient-to-t from-yellow-500/15 to-yellow-500/5 rounded-lg w-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-200">C</span>
                      </div>
                      <span className="text-xs mt-2 text-gray-400">70-79%</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Automatic grade distribution</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Assignment Processing Section */}
        <div className="container mx-auto px-4 mb-16">
          <Card className="glass-morphism p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Assignment Grading System</h2>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="upload">Upload Files</TabsTrigger>
                <TabsTrigger value="process">Process & Grade</TabsTrigger>
                <TabsTrigger value="results">Results & Ranking</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Master Copy Upload */}
                  {/* <div className="border border-dashed border-yellow-500/50 rounded-lg p-8 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Upload Master Copy</h3>
                    <p className="text-gray-400 text-center mb-6">Upload the master answer key or rubric for comparison</p>
                    
                    <label className="cursor-pointer">
                      <div className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 py-3 px-6 rounded-lg flex items-center transition">
                        <Upload className="h-5 w-5 mr-2" />
                        Select Master File
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleMasterFileUpload}
                      />
                    </label>
                    
                    {masterFile && (
                      <div className="mt-4 bg-yellow-500/10 p-3 rounded-md w-full">
                        <p className="text-sm text-yellow-300 truncate">{masterFile.name}</p>
                      </div>
                    )}
                  </div>
                   */}
                   {/* make 2 textareas */}
                  <div className="border border-dashed border-yellow-500/50 rounded-lg p-8 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Insert Master Copy</h3>
                    <p className="text-gray-400 text-center mb-6"> Master Answer copy</p>
                    
                    <textarea 
                      className="w-full h-32 p-4 border border-yellow-500/20 rounded-lg bg-transparent text-gray-300 placeholder:text-gray-500"
                      placeholder="Paste your master copy content here..."
                      id="master_copy_txt"
                      onChange={(e) => setMasterFile(e.target.value)}
                    ></textarea>
                    <p className="text-gray-400 text-center mb-6">Your Custom Judging criteria</p>
                    
                    <textarea 
                      className="w-full h-32 p-4 border border-yellow-500/20 rounded-lg bg-transparent text-gray-300 placeholder:text-gray-500"
                      placeholder="Paste your master copy content here..."
                      id="judgement_txt"

                      onChange={(e) => setMasterFile(e.target.value)}
                    ></textarea>
                    </div>
                  {/* Student Assignments Upload */}
                  <div className="border border-dashed border-yellow-500/50 rounded-lg p-8 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                      <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Upload Student Assignments</h3>
                    <p className="text-gray-400 text-center mb-6">Upload one or multiple student assignments for grading</p>
                    
                    <label className="cursor-pointer">
                      <div className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 py-3 px-6 rounded-lg flex items-center transition">
                        <Upload className="h-5 w-5 mr-2" />
                        Select Student Files
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        onChange={handleStudentFilesUpload}
                      />
                    </label>
                    
                    {studentFiles.length > 0 && (
                      <div className="mt-4 bg-yellow-500/10 p-3 rounded-md w-full">
                        <p className="text-sm text-yellow-300 mb-1">{studentFiles.length} files selected</p>
                        <div className="max-h-24 overflow-y-auto text-xs text-gray-400">
                          {studentFiles.map((file, index) => (
                            <div key={index} className="truncate">{file.name}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={processresult}>submit</button>
                </div>
              </TabsContent>
              
              <TabsContent value="process">
                <div className="flex flex-col items-center">
                  {isProcessing ? (
                    <div className="w-full max-w-md">
                      <h3 className="text-xl font-medium mb-4 text-center">Processing Assignments...</h3>
                      <Progress value={processingProgress} className="mb-4" />
                      <p className="text-center text-gray-400">
                        Analyzing {studentFiles.length} files. Please wait...
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-medium mb-4">Start Assignment Processing</h3>
                        <p className="text-gray-400 mb-6">
                          {!masterFile && !studentFiles.length && "Upload master copy and student assignments to begin"}
                          {masterFile && !studentFiles.length && "Upload student assignments to continue"}
                          {!masterFile && studentFiles.length > 0 && "Upload master copy to continue"}
                          {masterFile && studentFiles.length > 0 && `Ready to process ${studentFiles.length} assignments`}
                        </p>
                        
                        <Button 
                          onClick={processAssignments} 
                          disabled={!masterFile || studentFiles.length === 0}
                          className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                        >
                          Begin Analysis & Grading
                        </Button>
                      </div>
                      
                      {showResults && (
                        <Alert className="bg-yellow-500/20 border-yellow-500 text-yellow-300">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Grading complete! View the results in the Results tab.
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {results.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-medium">Grading Results</h3>
                      <Button 
                        onClick={downloadAllReports} 
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download All Reports
                      </Button>
                    </div>
                    
                    {/* Grade Distribution */}
                    <div className="mb-8">
                      <h4 className="text-lg font-medium mb-4">Grade Distribution</h4>
                      <div className="grid grid-cols-3 gap-4 max-w-md">
                        <div className="flex flex-col items-center">
                          <div className="h-24 bg-gradient-to-t from-yellow-500/30 to-yellow-500/10 rounded-lg w-full flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-yellow-400">A</span>
                            <span className="text-xl font-bold text-yellow-300">{gradeDistribution.A}</span>
                          </div>
                          <span className="text-xs mt-2 text-gray-400">90-100%</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-24 bg-gradient-to-t from-yellow-500/20 to-yellow-500/5 rounded-lg w-full flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-yellow-300">B</span>
                            <span className="text-xl font-bold text-yellow-200">{gradeDistribution.B}</span>
                          </div>
                          <span className="text-xs mt-2 text-gray-400">80-89%</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-24 bg-gradient-to-t from-yellow-500/15 to-yellow-500/5 rounded-lg w-full flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-yellow-200">C</span>
                            <span className="text-xl font-bold text-yellow-100">{gradeDistribution.C}</span>
                          </div>
                          <span className="text-xs mt-2 text-gray-400">70-79%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Results Table */}
                    <div className="border border-yellow-500/20 rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-yellow-500/10 hover:bg-yellow-500/20">
                            <TableHead className="text-yellow-400">Rank</TableHead>
                            <TableHead className="text-yellow-400">Student</TableHead>
                            <TableHead className="text-yellow-400">Score</TableHead>
                            <TableHead className="text-yellow-400">Grade</TableHead>
                            <TableHead className="text-yellow-400">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {results.map((result) => (
                            <TableRow key={result.id} className="hover:bg-yellow-500/5 border-yellow-500/10">
                              <TableCell className="font-medium">#{result.rank}</TableCell>
                              <TableCell>{result.name}</TableCell>
                              <TableCell>{result.score}/10 ({result.percentage}%)</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  result.grade === 'A' ? 'bg-green-500/20 text-green-400' : 
                                  result.grade === 'B' ? 'bg-blue-500/20 text-blue-400' : 
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {result.grade}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  onClick={() => downloadReport(result)} 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Report
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ListChecks className="h-16 w-16 text-yellow-500/50 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Results Yet</h3>
                    <p className="text-gray-400">Upload assignments and process them to see results here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">How It Works</h2>
              <p className="text-gray-300 mb-4">
                Our system uses AI to analyze student submissions against customizable rubrics created by teachers. It evaluates various aspects like content quality, organization, adherence to guidelines, and more.
              </p>
              <p className="text-gray-300">
                After grading, the system automatically ranks students within their class, generating detailed distribution charts to help teachers identify overall performance patterns.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Save hours of grading time with automatic assessment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ensure consistent evaluation with standardized rubrics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify class-wide strengths and weaknesses through visual analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Track individual and group progress over the academic term</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to revolutionize your grading process?</h2>
            <p className="text-gray-300 mb-6">Get started with our free trial and experience the difference.</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">Start Your Free Trial</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AutoGrading;
