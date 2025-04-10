import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, LineChart, CheckCircle, BarChart, PieChart, TrendingUp, Upload, FileText, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';

const PerformanceReports: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setIsUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        setTimeout(() => {
          setIsAnalyzing(false);
          setReportGenerated(true);
        }, 2500);
      }, 1500);
    }
  };

  const resetDemo = () => {
    setFileName("");
    setReportGenerated(false);
  };

  // Data for charts
  const subjectData = [
    { subject: "Math", score: 85, color: "#EAB308" },
    { subject: "Science", score: 72, color: "#EAB308" },
    { subject: "English", score: 90, color: "#EAB308" },
    { subject: "History", score: 65, color: "#EAB308" },
    { subject: "Arts", score: 78, color: "#EAB308" }
  ];

  const pieData = [
    { category: "Above Average", percentage: 65, color: "#EAB308" },
    { category: "Average", percentage: 25, color: "#CA8A04" },
    { category: "Needs Support", percentage: 10, color: "#854D0E" }
  ];

  const growthData = [
    { month: "Sep", score: 65 },
    { month: "Oct", score: 70 },
    { month: "Nov", score: 68 },
    { month: "Dec", score: 75 },
    { month: "Jan", score: 80 },
    { month: "Feb", score: 85 },
  ];

  // Function to generate SVG pie chart sectors
  const generatePieChart = () => {
    let cumulativeAngle = 0;
    const radius = 50;
    const centerX = 60;
    const centerY = 60;
    
    return pieData.map((slice, index) => {
      const startAngle = cumulativeAngle;
      const angleSize = (slice.percentage / 100) * 360;
      cumulativeAngle += angleSize;
      const endAngle = cumulativeAngle;
      
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = angleSize > 180 ? 1 : 0;
      
      const pathData = `
        M ${centerX} ${centerY}
        L ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
      
      return <path key={index} d={pathData} fill={slice.color} stroke="#111" strokeWidth="1" />;
    });
  };

  // Function to generate growth chart line
  const generateGrowthLine = () => {
    const width = 280;
    const height = 140;
    const padding = 20;
    const availableWidth = width - 2 * padding;
    const availableHeight = height - 2 * padding;
    
    const maxScore = Math.max(...growthData.map(d => d.score));
    const minScore = Math.min(...growthData.map(d => d.score)) - 10; // Add some padding at bottom
    
    const xStep = availableWidth / (growthData.length - 1);
    
    let pathD = '';
    
    growthData.forEach((point, i) => {
      const x = padding + i * xStep;
      const y = height - padding - ((point.score - minScore) / (maxScore - minScore)) * availableHeight;
      
      if (i === 0) {
        pathD += `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
      }
    });
    
    return (
      <g>
        {/* X and Y axes */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#6B7280" strokeWidth="1" />
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#6B7280" strokeWidth="1" />
        
        {/* Line */}
        <path d={pathD} fill="none" stroke="#EAB308" strokeWidth="3" />
        
        {/* Data points */}
        {growthData.map((point, i) => {
          const x = padding + i * xStep;
          const y = height - padding - ((point.score - minScore) / (maxScore - minScore)) * availableHeight;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#EAB308" />
              <text x={x} y={height-5} textAnchor="middle" fill="#9CA3AF" fontSize="10">{point.month}</text>
            </g>
          );
        })}
        
        {/* Y-axis labels */}
        <text x={5} y={padding} fill="#9CA3AF" fontSize="10">100</text>
        <text x={5} y={height/2} fill="#9CA3AF" fontSize="10">75</text>
        <text x={5} y={height-padding} fill="#9CA3AF" fontSize="10">50</text>
      </g>
    );
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
                <LineChart className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">Student Performance</span> Reports
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Track academic progress over time with comprehensive analytics that highlight strengths and weaknesses, helping both teachers and students make data-driven decisions.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Longitudinal tracking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Skill gap analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Comparative metrics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Shareable reports</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>AI-powered insights</span>
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
                  <BarChart className="h-16 w-16 text-yellow-400" />
                  <div className="w-full max-w-md">
                    <div className="space-y-4">
                      <div className="border border-yellow-500/30 rounded-lg p-6">
                        <div className="flex justify-between mb-4">
                          <h3 className="text-yellow-400">Performance Trend</h3>
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="h-32 flex items-end space-x-2">
                          {[30, 45, 35, 60, 70, 80, 75].map((height, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm" 
                                style={{height: `${height}%`}}
                              ></div>
                              <span className="text-xs mt-1 text-gray-400">{`A${index+1}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Student progress visualization</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* AI Report Upload Section - NEW */}
        <div className="container mx-auto px-4 mb-16">
          <Card className="glass-morphism p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Generate AI-Powered Performance Reports</h2>
            <p className="text-gray-300 text-center mb-8">
              Upload your existing student reports and our AI will analyze the data to generate comprehensive performance visualizations and insights.
            </p>
            
            {!reportGenerated ? (
              <div className="flex flex-col items-center">
                <div className="border-2 border-dashed border-yellow-500/30 rounded-lg p-10 w-full max-w-lg mb-6 flex flex-col items-center justify-center">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
                      <p className="text-gray-300">Uploading {fileName}...</p>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-12 w-12 text-yellow-400 animate-spin mb-4" />
                      <p className="text-gray-300">AI analyzing student data...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-yellow-400 mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop your report file or</p>
                      <label className="cursor-pointer">
                        <span className="bg-yellow-500 text-dark-100 px-4 py-2 rounded-md hover:bg-yellow-600 transition">Browse Files</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept=".csv, .xlsx, .xls, .pdf"
                        />
                      </label>
                      <p className="text-gray-400 text-sm mt-4">Supported formats: CSV, Excel, PDF</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-yellow-400 mr-2" />
                    <span className="text-gray-300">{fileName}</span>
                  </div>
                  <Button 
                    onClick={resetDemo} 
                    variant="outline" 
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    Upload Different File
                  </Button>
                </div>
                
                <h3 className="text-xl font-semibold text-yellow-400">AI-Generated Performance Analysis</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Bar Chart */}
                  <Card className="glass-morphism p-6">
                    <h4 className="text-lg font-semibold mb-3 text-yellow-400">Subject Performance</h4>
                    <div className="relative h-64">
                      <svg viewBox="0 0 300 200" width="100%" height="100%">
                        {/* X and Y axes */}
                        <line x1="40" y1="170" x2="280" y2="170" stroke="#6B7280" strokeWidth="1" />
                        <line x1="40" y1="30" x2="40" y2="170" stroke="#6B7280" strokeWidth="1" />
                        
                        {/* Subject bars */}
                        {subjectData.map((subject, index) => {
                          const barWidth = 30;
                          const gap = 20;
                          const x = 50 + index * (barWidth + gap);
                          const barHeight = (subject.score / 100) * 130;
                          const y = 170 - barHeight;
                          
                          return (
                            <g key={index}>
                              <linearGradient id={`barGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FACC15" />
                                <stop offset="100%" stopColor="#EAB308" />
                              </linearGradient>
                              <rect 
                                x={x} 
                                y={y} 
                                width={barWidth} 
                                height={barHeight} 
                                fill={`url(#barGradient${index})`}
                                rx="2"
                              />
                              <text 
                                x={x + barWidth/2} 
                                y="185" 
                                textAnchor="middle" 
                                fill="#9CA3AF" 
                                fontSize="10"
                              >
                                {subject.subject}
                              </text>
                              <text 
                                x={x + barWidth/2} 
                                y={y - 5} 
                                textAnchor="middle" 
                                fill="#EAB308" 
                                fontSize="12" 
                                fontWeight="bold"
                              >
                                {subject.score}%
                              </text>
                            </g>
                          );
                        })}
                        
                        {/* Y-axis labels */}
                        <text x="15" y="30" fill="#9CA3AF" fontSize="10" textAnchor="middle">100</text>
                        <text x="15" y="70" fill="#9CA3AF" fontSize="10" textAnchor="middle">75</text>
                        <text x="15" y="110" fill="#9CA3AF" fontSize="10" textAnchor="middle">50</text>
                        <text x="15" y="150" fill="#9CA3AF" fontSize="10" textAnchor="middle">25</text>
                        <text x="15" y="170" fill="#9CA3AF" fontSize="10" textAnchor="middle">0</text>
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs mt-4">Comparative subject performance showing strongest areas in English and Mathematics</p>
                  </Card>
                  
                  {/* Pie Chart */}
                  <Card className="glass-morphism p-6">
                    <h4 className="text-lg font-semibold mb-3 text-yellow-400">Performance Distribution</h4>
                    <div className="flex justify-center items-center h-64">
                      <div className="relative">
                        <svg viewBox="0 0 120 120" width="160" height="160">
                          {generatePieChart()}
                          <circle cx="60" cy="60" r="25" fill="#111827" />
                          <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fill="#EAB308" fontSize="14" fontWeight="bold">78%</text>
                          <text x="60" y="72" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF" fontSize="8">Overall</text>
                        </svg>
                        
                        <div className="absolute top-full left-0 right-0 mt-4">
                          <div className="grid grid-cols-1 gap-2 text-center">
                            {pieData.map((item, index) => (
                              <div key={index} className="flex items-center justify-center">
                                <div className="w-3 h-3 mr-2" style={{ backgroundColor: item.color }}></div>
                                <span className="text-xs text-gray-300">{item.category} ({item.percentage}%)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Growth Chart */}
                  <Card className="glass-morphism p-6">
                    <h4 className="text-lg font-semibold mb-3 text-yellow-400">Learning Growth</h4>
                    <div className="flex justify-center items-center h-64">
                      <svg viewBox="0 0 300 160" width="100%" height="100%">
                        {generateGrowthLine()}
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs mt-4">Progressive improvement trend showing consistent growth over the term</p>
                  </Card>
                </div>
                
                {/* AI Insights Section */}
                <Card className="glass-morphism p-6">
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">AI-Generated Insights</h4>
                  <div className="space-y-4">
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-gray-300">Student shows exceptional aptitude in English and Math with scores in the top 15% of the class.</p>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-gray-300">History performance indicates opportunity for targeted improvement. Recommend additional visual learning resources.</p>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-gray-300">Consistent growth pattern suggests effective learning strategies. Continue current approach while introducing more advanced concepts.</p>
                    </div>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-gray-300">Test performance shows stronger results with project-based assessments compared to traditional testing.</p>
                    </div>
                  </div>
                </Card>
                
                <div className="flex justify-center mt-8">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-100 mr-4">
                    Download Full Report
                  </Button>
                  <Button variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                    Share with Parents
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Details Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">How It Works</h2>
              <p className="text-gray-300 mb-4">
                Our AI-powered system analyzes your uploaded student reports, extracting valuable data points and converting them into comprehensive performance profiles that track progress across assignments, subjects, and time periods.
              </p>
              <p className="text-gray-300">
                Advanced machine learning algorithms identify patterns in student performance, highlighting strengths to build upon and pinpointing specific areas where additional support or instruction may be needed.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Save hours of manual analysis with AI-generated insights</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Convert raw data into actionable teaching strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Generate professional reports for parent-teacher conferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Help students visualize their progress and set achievable goals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Identify learning trends that may be missed in manual review</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform student data into actionable insights?</h2>
            <p className="text-gray-300 mb-6">Get started with our free trial and experience the power of AI-driven performance analysis.</p>
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

export default PerformanceReports;
