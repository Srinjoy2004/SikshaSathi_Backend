
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileCheck, 
  Upload,
  ArrowRight,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const statsCards = [
    {
      title: 'Total Students',
      value: '246',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500/20 text-blue-400',
      change: '+12% from last month'
    },
    {
      title: 'Assignments Checked',
      value: '1,852',
      icon: <FileCheck className="h-6 w-6" />,
      color: 'bg-green-500/20 text-green-400',
      change: '+18% from last month'
    },
    {
      title: 'Plagiarism Detected',
      value: '38',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-red-500/20 text-red-400',
      change: '-5% from last month'
    },
    {
      title: 'Average Score',
      value: '78%',
      icon: <BarChart2 className="h-6 w-6" />,
      color: 'bg-yellow-500/20 text-yellow-400',
      change: '+3% from last month'
    },
  ];

  const recentAssignments = [
    {
      title: 'Final Year Project Submission',
      course: 'Computer Science 401',
      submissions: 52,
      dueDate: '2025-04-10',
      status: 'Active'
    },
    {
      title: 'Research Methodology Paper',
      course: 'Research Methods 301',
      submissions: 38,
      dueDate: '2025-04-05',
      status: 'Active'
    },
    {
      title: 'Database Design Project',
      course: 'Database Systems 202',
      submissions: 64,
      dueDate: '2025-04-02',
      status: 'Due Soon'
    },
    {
      title: 'Machine Learning Case Study',
      course: 'AI Fundamentals 303',
      submissions: 41,
      dueDate: '2025-03-29',
      status: 'Closed'
    },
  ];

  return (
    <div className="min-h-screen bg-dark-100 flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 lg:ml-64">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. Rajesh</h1>
            <p className="text-gray-400">Here's what's happening with your classes today</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="glass-morphism p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Assignments */}
            <div className="lg:col-span-2">
              <Card className="glass-morphism p-6 h-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Recent Assignments</h2>
                  <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-500 hover:bg-yellow-500/10">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentAssignments.map((assignment, index) => (
                    <div key={index} className="bg-dark-300/40 border border-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          assignment.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : assignment.status === 'Due Soon'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {assignment.status}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{assignment.course}</p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-500">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{assignment.submissions} submissions</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due: {assignment.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div>
              <Card className="glass-morphism p-6 h-full">
                <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-gray-300 hover:text-yellow-400">
                    <Upload className="h-5 w-5 mr-2 text-yellow-400" />
                    Upload New Assignment
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-gray-300 hover:text-yellow-400">
                    <FileCheck className="h-5 w-5 mr-2 text-yellow-400" />
                    Check Plagiarism
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-gray-300 hover:text-yellow-400">
                    <BarChart2 className="h-5 w-5 mr-2 text-yellow-400" />
                    Generate Grade Report
                  </Button>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: "Graded 18 submissions for CS401", time: "2 hours ago" },
                      { icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />, text: "Detected plagiarism in 3 submissions", time: "5 hours ago" },
                      { icon: <FileText className="h-4 w-4 text-blue-400" />, text: "Created new assignment for CS202", time: "Yesterday" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="mr-3 mt-1">{activity.icon}</div>
                        <div>
                          <p className="text-xs text-gray-300">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
