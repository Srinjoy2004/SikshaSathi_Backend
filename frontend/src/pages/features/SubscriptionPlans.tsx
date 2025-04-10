
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, CheckCircle, Star, Clock, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SubscriptionPlans: React.FC = () => {
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
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="h-24 w-24 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6 mx-auto">
              <CreditCard className="h-12 w-12" />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Flexible</span> Subscription Plans
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Choose the right package for your institutional needs with our tiered subscription model, all starting with a generous three-month free trial.
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="glass-morphism hover:yellow-glow transition-all duration-300 p-6 flex flex-col">
              <div className="mb-6 text-center">
                <div className="inline-block rounded-full bg-yellow-500/10 p-3 mb-4">
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Starter</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">₹499</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Perfect for individual educators</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 100 student submissions per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic plagiarism detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Auto-grading for simple assignments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild size="lg" variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
              </div>
            </Card>
            
            {/* Professional Plan */}
            <Card className="glass-morphism hover:yellow-glow transition-all duration-300 p-6 flex flex-col relative border-yellow-500">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-dark-100 px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              
              <div className="mb-6 text-center">
                <div className="inline-block rounded-full bg-yellow-500/20 p-3 mb-4">
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Professional</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">₹1,499</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Perfect for departments and small schools</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 1,000 student submissions per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced plagiarism detection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Auto-grading for all assignment types</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI-generated feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority email and chat support</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                  <Link to="/register">Start Free Trial</Link>
                </Button>
              </div>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="glass-morphism hover:yellow-glow transition-all duration-300 p-6 flex flex-col">
              <div className="mb-6 text-center">
                <div className="inline-block rounded-full bg-yellow-500/10 p-3 mb-4">
                  <CreditCard className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">Custom</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">For large institutions and universities</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited student submissions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Premium plagiarism detection with external database</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Web3 grade storage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced analytics and reporting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API access for integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">24/7 dedicated support</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Button asChild size="lg" variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                  <Link to="/register">Contact Sales</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Trial Info */}
        <div className="container mx-auto px-4 mb-16">
          <Card className="glass-morphism p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="h-10 w-10 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Three Month Free Trial</h2>
                <p className="text-gray-300">
                  All new users get a generous three-month free trial with full access to all features. No credit card required to start. Experience the complete SikshaSathi platform and see how it transforms your educational assessment process.
                </p>
              </div>
              <div>
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100 whitespace-nowrap">
                  <Link to="/register">Start Now</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQs */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="glass-morphism p-6">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-300 text-sm">Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will be applied at the end of your current billing cycle.</p>
            </Card>
            
            <Card className="glass-morphism p-6">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">What happens after the free trial?</h3>
              <p className="text-gray-300 text-sm">After the three-month trial, you'll be prompted to select a plan to continue using SikshaSathi. We'll send you reminder emails before the trial ends.</p>
            </Card>
            
            <Card className="glass-morphism p-6">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Is there a discount for educational institutions?</h3>
              <p className="text-gray-300 text-sm">Yes, we offer special pricing for schools, colleges, and universities. Please contact our sales team for more information about our educational discounts.</p>
            </Card>
            
            <Card className="glass-morphism p-6">
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">Can I pay annually instead of monthly?</h3>
              <p className="text-gray-300 text-sm">Yes, we offer annual billing with a 20% discount compared to monthly payments. You can select your preferred billing cycle when choosing a plan.</p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to transform your assessment process?</h2>
            <p className="text-gray-300 mb-6">Join thousands of educators saving time and improving accuracy with SikshaSathi.</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">Start Your Free Trial Today</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SubscriptionPlans;
