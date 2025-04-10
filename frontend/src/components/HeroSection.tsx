
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-dark-200 overflow-hidden">
        <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-yellow-600/5 blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>AI-Powered Assessment Platform for Educators</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Revolutionize</span> Your 
              <br className="hidden md:block" /> Academic Assessment
            </h1>
            
            <p className="text-lg text-gray-300">
              SikshaSathi helps educators detect plagiarism, evaluate student assignments, 
              and provide actionable feedback using advanced artificial intelligence.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                See How It Works
              </Button>
            </div>
            
            <div className="pt-6 flex items-center text-sm text-gray-400">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-200 bg-dark-300 flex items-center justify-center">
                    <span className="text-xs text-yellow-500">{i}</span>
                  </div>
                ))}
              </div>
              <span>Over 2,000+ educators trust SikshaSathi</span>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="flex-1 relative">
            <div className="relative w-full h-[400px] md:h-[450px] bg-dark-300 rounded-xl glass-morphism p-3 shadow-lg yellow-glow overflow-hidden animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-300/80 via-dark-300/50 to-transparent">
                {/* Dashboard Mockup */}
                <div className="absolute top-4 left-4 right-4 h-8 flex items-center px-4 rounded bg-dark-100">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="absolute top-16 left-4 right-4 bottom-4 rounded bg-dark-200/80 p-3 overflow-hidden">
                  {/* Mockup sidebar */}
                  <div className="absolute top-0 left-0 bottom-0 w-1/4 bg-dark-300/80 border-r border-gray-800"></div>
                  
                  {/* Mockup content */}
                  <div className="absolute top-0 left-1/4 right-0 bottom-0 p-2">
                    <div className="h-6 w-3/4 bg-yellow-500/20 rounded mb-2"></div>
                    <div className="grid grid-cols-2 gap-2 h-20 mb-3">
                      <div className="rounded bg-dark-100/80 border border-gray-800 p-2 flex flex-col justify-between">
                        <div className="h-2 w-1/2 bg-yellow-500/30 rounded"></div>
                        <div className="h-4 w-1/3 bg-yellow-500 rounded"></div>
                      </div>
                      <div className="rounded bg-dark-100/80 border border-gray-800 p-2 flex flex-col justify-between">
                        <div className="h-2 w-1/2 bg-yellow-500/30 rounded"></div>
                        <div className="h-4 w-2/3 bg-red-500/70 rounded"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-dark-100/80 rounded border border-gray-800 mb-2">
                      <div className="h-full p-2 flex flex-col">
                        <div className="h-3 w-3/4 bg-gray-600/50 rounded mb-2"></div>
                        <div className="flex-1 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="rounded bg-yellow-500/10 border border-yellow-500/20"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="h-24 bg-dark-100/80 rounded border border-gray-800">
                      <div className="flex h-full items-center justify-center">
                        <div className="h-6 w-3/4 bg-yellow-500/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-yellow-500 rotate-12 animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-yellow-500/20 animate-spin-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
