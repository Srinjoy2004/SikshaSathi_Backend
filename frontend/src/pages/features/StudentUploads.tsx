import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileCheck, CheckCircle, Upload, File, FileText, X, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
};

const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const StudentUploads: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(Array.from(event.target.files));
      // Reset the input value so the same file can be uploaded again if needed
      event.target.value = '';
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 5MB limit.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check for duplicates
      if (files.some(f => f.file.name === file.name && f.file.size === file.size)) {
        toast({
          title: "Duplicate file",
          description: `${file.name} has already been added.`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      const filesWithPreview = validFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: 'uploading' as const
      }));
      
      setFiles(prev => [...prev, ...filesWithPreview]);
      
      // Simulate file upload for each file
      filesWithPreview.forEach(fileWithPreview => {
        simulateUpload(fileWithPreview.id);
      });
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: 100, status: 'complete' as const } : f)
        );
        toast({
          title: "Upload complete",
          description: "Your file has been successfully uploaded.",
        });
      } else {
        setFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f)
        );
      }
    }, 500);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (event.dataTransfer.files.length > 0) {
      addFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return <FileText className="h-10 w-10 text-yellow-400/70" />;
    } else if (['doc', 'docx'].includes(extension || '')) {
      return <FileText className="h-10 w-10 text-yellow-400/70" />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <File className="h-10 w-10 text-yellow-400/70" />;
    } else {
      return <File className="h-10 w-10 text-yellow-400/70" />;
    }
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
                <FileCheck className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">Student Assignment</span> Uploads
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Our flexible upload system supports a wide range of document formats, allowing students to submit their work easily while teachers maintain control over submission parameters.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Multiple file formats</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Bulk uploads</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Auto organization</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Custom parameters</span>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">Try It Now</Link>
              </Button>
            </div>
            
            <div className="w-full md:w-1/2">
              <Card 
                className={`glass-morphism ${isDragOver ? 'yellow-glow' : 'hover:yellow-glow'} p-8 relative overflow-hidden`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                
                <div className="flex flex-col items-center space-y-8">
                  {files.length > 0 ? (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Uploaded Files</h3>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={openFileDialog}
                          className="text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/10"
                        >
                          Add More Files
                        </Button>
                      </div>
                      
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {files.map((file) => (
                          <div key={file.id} className="flex items-center bg-dark-200 rounded-lg p-3">
                            <div className="h-10 w-10 flex items-center justify-center mr-3">
                              {getFileIcon(file.file.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium truncate">{file.file.name}</p>
                                <button 
                                  onClick={() => removeFile(file.id)} 
                                  className="text-gray-400 hover:text-yellow-400"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <div className="w-full">
                                <Progress value={file.progress} className="h-1" />
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-400">
                                  {(file.file.size / 1024).toFixed(1)} KB
                                </span>
                                <span className="text-xs">
                                  {file.status === 'complete' ? (
                                    <span className="text-green-400">Complete</span>
                                  ) : file.status === 'error' ? (
                                    <span className="text-red-400">Error</span>
                                  ) : (
                                    <span className="text-yellow-400">{file.progress.toFixed(0)}%</span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload 
                        className="h-16 w-16 text-yellow-400 cursor-pointer" 
                        onClick={openFileDialog}
                      />
                      <div className="text-center">
                        <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                        <p className="text-gray-400 text-sm mb-4">or</p>
                        <Button 
                          onClick={openFileDialog}
                          className="bg-yellow-500 hover:bg-yellow-600 text-dark-100"
                        >
                          Browse Files
                        </Button>
                        <p className="text-gray-400 text-sm mt-4">
                          Supports PDF, DOCX, TXT, JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    </>
                  )}
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
                Students can easily upload their assignments through our intuitive interface. The system supports all common file formats including PDF, DOCX, TXT, JPG, and more.
              </p>
              <p className="text-gray-300">
                Teachers can set specific parameters for submissions, such as file size limits, accepted formats, and deadlines. The system automatically organizes submissions by class, subject, and due date for easy access.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Save time with bulk uploads for multiple assignments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduce confusion with automatic organization by class and subject</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Maintain control with customizable submission parameters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Track submission times and meet deadlines effortlessly</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to streamline your assignment uploads?</h2>
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

export default StudentUploads;