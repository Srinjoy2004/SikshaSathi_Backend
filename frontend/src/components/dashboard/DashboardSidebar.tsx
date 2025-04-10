
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  FileCheck, 
  BarChart2, 
  Settings, 
  Users, 
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, to, active = false }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
      active 
        ? "bg-yellow-500/20 text-yellow-400" 
        : "text-gray-400 hover:bg-yellow-500/10 hover:text-yellow-400"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-64 bg-dark-200 border-r border-gray-800 transition-transform duration-300 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-gradient">SikshaSathi</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-auto py-6 px-3">
          <nav className="space-y-1">
            <SidebarLink 
              icon={<Home className="h-5 w-5" />} 
              label="Dashboard" 
              to="/dashboard" 
              active 
            />
            <SidebarLink 
              icon={<Upload className="h-5 w-5" />} 
              label="Assignment Upload" 
              to="/dashboard/upload" 
            />
            <SidebarLink 
              icon={<FileCheck className="h-5 w-5" />} 
              label="Plagiarism Check" 
              to="/dashboard/plagiarism" 
            />
            <SidebarLink 
              icon={<BarChart2 className="h-5 w-5" />} 
              label="Student Grades" 
              to="/dashboard/grades" 
            />
            <SidebarLink 
              icon={<Users className="h-5 w-5" />} 
              label="Students" 
              to="/dashboard/students" 
            />
          </nav>
          
          <div className="mt-10 pt-6 border-t border-gray-800">
            <h4 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Settings
            </h4>
            <nav className="space-y-1">
              <SidebarLink 
                icon={<Settings className="h-5 w-5" />} 
                label="Account Settings" 
                to="/dashboard/settings" 
              />
            </nav>
          </div>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-dark-100"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
