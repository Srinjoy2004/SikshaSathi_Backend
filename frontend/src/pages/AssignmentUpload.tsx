
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload,
  File,
  X,
  Plus,
  Calendar,
} from 'lucide-react';

const AssignmentUpload: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-dark-100 flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 lg:ml-64">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Assignment Upload</h1>
            <p className="text-gray-400">Upload assignment materials and student submissions for analysis</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assignment Form */}
            <div className="lg:col-span-2">
              <Card className="glass-morphism p-6">
                <h2 className="text-lg font-semibold mb-6">Assignment Details</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-300">Assignment Title</label>
                    <Input 
                      id="title" 
                      placeholder="Enter assignment title" 
                      className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="course" className="text-sm font-medium text-gray-300">Course</label>
                    <Input 
                      id="course" 
                      placeholder="Enter course name" 
                      className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="dueDate" className="text-sm font-medium text-gray-300">Due Date</label>
                      <div className="relative">
                        <Input 
                          id="dueDate" 
                          type="date" 
                          className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="totalPoints" className="text-sm font-medium text-gray-300">Total Points</label>
                      <Input 
                        id="totalPoints" 
                        type="number" 
                        placeholder="100" 
                        className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter assignment description" 
                      rows={4}
                      className="bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Master Copy (Reference Solution)</label>
                    <div 
                      className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500/50 transition-colors"
                      onDragOver={preventDefault}
                      onDragEnter={preventDefault}
                      onDrop={handleFileDrop}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <Upload className="h-10 w-10 text-gray-500 mb-3" />
                      <p className="text-center text-gray-400 mb-1">Drag and drop files here or click to browse</p>
                      <p className="text-center text-gray-500 text-sm">Support for PDF, DOC, DOCX, TXT</p>
                      <input 
                        type="file" 
                        id="fileInput" 
                        className="hidden" 
                        multiple 
                        onChange={handleFileSelect} 
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Upload Status */}
            <div>
              <Card className="glass-morphism p-6 h-full flex flex-col">
                <h2 className="text-lg font-semibold mb-6">Upload Status</h2>
                
                <div className="flex-grow">
                  {files.length > 0 ? (
                    <div className="space-y-3">
                      {files.map((file, index) => (
                        <div 
                          key={index}
                          className="bg-dark-300/50 border border-gray-700 rounded-lg p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium truncate max-w-[150px]">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-red-500/20"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline"
                        className="w-full mt-3 border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-500/5"
                        onClick={() => document.getElementById('fileInput')?.click()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add More Files
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No files uploaded yet</p>
                    </div>
                  )}
                </div>
                
                <Button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                  Upload and Start Analysis
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignmentUpload;
