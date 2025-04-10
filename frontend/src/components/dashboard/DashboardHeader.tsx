
import React from 'react';
import { 
  Bell, 
  Search, 
  Menu,
  User,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-dark-200 border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="lg:hidden text-gray-400 hover:text-white mr-4"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative hidden md:block">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-dark-300/80 border border-gray-700 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 text-gray-300 w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 text-gray-200 hover:text-white">
              <div className="h-8 w-8 rounded-full bg-dark-300 border border-gray-700 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm">Dr. Rajesh Sharma</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-dark-100 border-gray-800 text-gray-200">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-dark-300 focus:bg-dark-300 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-dark-300 focus:bg-dark-300 cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-dark-300 focus:bg-dark-300 cursor-pointer">Subscription</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem className="hover:bg-dark-300 focus:bg-dark-300 cursor-pointer text-red-400 hover:text-red-300">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
