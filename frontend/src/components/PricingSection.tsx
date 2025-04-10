
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText?: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false,
  buttonText = "Get Started" 
}) => {
  return (
    <Card className={`h-full flex flex-col ${
      highlighted 
        ? 'relative gradient-border before:animate-pulse-slow yellow-glow' 
        : 'glass-morphism'
    }`}>
      <div className="p-6 flex flex-col h-full">
        {highlighted && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-dark-100 text-xs font-bold rounded-full px-3 py-1">
            Most Popular
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-gray-400 text-sm">/month</span>}
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        
        <div className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-5 w-5 text-yellow-500 mr-2 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          variant={highlighted ? "default" : "outline"} 
          className={highlighted 
            ? "bg-yellow-500 hover:bg-yellow-600 text-dark-100 w-full mt-auto" 
            : "border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 w-full mt-auto"
          }
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "₹9,999",
      description: "Perfect for small schools and individual educators",
      features: [
        "Up to 200 students",
        "Basic plagiarism detection",
        "Manual & automatic grading",
        "Simple performance reports",
        "Email support",
        "3-month free trial"
      ]
    },
    {
      name: "Professional",
      price: "₹24,999",
      description: "Ideal for medium-sized educational institutions",
      features: [
        "Up to 1000 students",
        "Advanced plagiarism detection",
        "AI-powered grading system",
        "Detailed performance analytics",
        "Priority support",
        "Multi-language support",
        "3-month free trial"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large universities and educational networks",
      features: [
        "Unlimited students",
        "Enterprise-grade plagiarism system",
        "Advanced AI grading & feedback",
        "Complete analytics suite",
        "Web3 grade storage",
        "Dedicated account manager",
        "Custom integration support",
        "3-month free trial"
      ],
      buttonText: "Contact Us"
    }
  ];

  return (
    <div id="pricing" className="relative py-20 bg-dark-200">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-yellow-600/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-gray-300">
            Choose the plan that best fits your institution's needs with our all-inclusive pricing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
              <PricingPlan {...plan} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-gray-400 text-sm">
            All plans include a 3-month free trial period. No credit card required to start. 
            Pricing is annual with an option to pay monthly at slightly higher rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
