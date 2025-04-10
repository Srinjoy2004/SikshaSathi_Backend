
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Binary, CheckCircle, Lock, Shield, Fingerprint } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Web3Storage: React.FC = () => {
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
                <Binary className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">Web3 Grade</span> Storage
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Enterprise plan users benefit from blockchain-based record keeping for the ultimate in security, verification, and tamper-proof academic records.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Immutable records</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Credential verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Digital certificates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Enhanced security</span>
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
                  <Lock className="h-16 w-16 text-yellow-400" />
                  <div className="w-full max-w-md">
                    <div className="border border-yellow-500/30 rounded-lg p-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 flex items-center justify-center w-full">
                          <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Shield className="h-8 w-8 text-yellow-400" />
                          </div>
                          <div className="h-1 w-16 bg-yellow-500/30"></div>
                          <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Fingerprint className="h-8 w-8 text-yellow-400" />
                          </div>
                          <div className="h-1 w-16 bg-yellow-500/30"></div>
                          <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                            <Binary className="h-8 w-8 text-yellow-400" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-center text-yellow-400 text-sm font-semibold">Grade Record #A7F9D2</p>
                          <p className="text-center text-gray-400 text-xs mt-1">Verified • Tamper-proof • Secure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Blockchain-secured academic records</p>
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
                Our Web3 storage system creates a cryptographic hash of each grade record and stores it on a secure blockchain network, ensuring that once recorded, grades cannot be altered without detection.
              </p>
              <p className="text-gray-300">
                This technology allows for third-party verification of academic credentials without compromising data privacy, providing a trustworthy system for educational institutions, students, and employers.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Guarantee the integrity and authenticity of academic records</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Simplify credential verification for employers and institutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Protect against unauthorized changes to academic history</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Create blockchain-certified digital academic certificates</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to secure your academic records?</h2>
            <p className="text-gray-300 mb-6">Get started with our Enterprise plan and experience the future of grade security.</p>
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

export default Web3Storage;
