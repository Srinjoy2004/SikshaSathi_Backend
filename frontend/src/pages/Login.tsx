
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-200 p-4">
      <div className="absolute top-0 left-0 right-0">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-yellow-400 hover:text-yellow-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-dark-200 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-yellow-600/5 blur-3xl"></div>
      </div>
      
      <Card className="relative glass-morphism w-full max-w-md p-8 yellow-glow">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            Welcome back to <span className="text-gradient">SikshaSathi</span>
          </h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="pl-10 bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-500">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                className="pl-10 bg-dark-300/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
              />
            </div>
          </div>
          
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-dark-100">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-500 font-medium">
              Create account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
