
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileCheck, 
  AlertTriangle, 
  BarChart4, 
  Sliders, 
  MessageSquareText, 
  LineChart, 
  Binary,
  Languages,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => (
  <Card className="glass-morphism hover:yellow-glow transition-all duration-300 h-full flex flex-col">
    <div className="flex flex-col p-6 h-full">
      <div className="h-12 w-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 flex-1">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center text-yellow-400 hover:text-yellow-500 mt-4 transition-colors"
      >
        Learn More <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  </Card>
);

const FeaturesSection: React.FC = () => {
  // alert('This is a demo version. Some features may not be available.');
  var loggedindetails=JSON.parse(localStorage.getItem('loggedin') || '{}');
  console.log(loggedindetails);
  var   features = [
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: 'Student Assignment Uploads',
      description: 'Students can upload assignments in various formats (PDF, DOCX, etc.) with multiple submissions in one go.',
      link: '/features/student-uploads'
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'AI-Powered Plagiarism Detection',
      description: 'Advanced algorithms compare submissions with both internal database and external sources for comprehensive plagiarism checking.',
      link: '/features/plagiarism-detection'
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: 'Automatic Grading & Ranking',
      description: 'Smart evaluation system assigns scores based on predefined guidelines and generates detailed ranking reports.',
      link: '/features/auto-grading'
    },
    {
      icon: <Sliders className="h-6 w-6" />,
      title: 'Teacher Customization',
      description: 'Teachers can adjust scores and train the AI model over time for continuously improving accuracy.',
      link: '/features/teacher-customization'
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      title: 'AI-Generated Feedback',
      description: 'Provides constructive feedback using NLP models to help students understand their mistakes and improve.',
      link: '/features/ai-feedback'
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: 'Student Performance Reports',
      description: 'Track progress over time with detailed reports highlighting strengths, weaknesses and improvement areas.',
      link: '/features/performance-reports'
    },
    {
      icon: <Binary className="h-6 w-6" />,
      title: 'Web3 Grade Storage',
      description: 'Enterprise plan includes blockchain-based tamper-proof grade records for maximum security and reliability.',
      link: '/features/web3-storage'
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: 'Multi-Language Support',
      description: 'Platform supports Indian regional languages to make it accessible for diverse user groups across the country.',
      link: '/features/language-support'
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Flexible Subscription Plans',
      description: 'Choose from Starter, Professional or Enterprise plans based on institutional needs with a 3-month free trial.',
      link: '/features/subscription-plans'
    },
  ];
  if(loggedindetails==null || loggedindetails==undefined || loggedindetails==""){

  }
  else{
    if(loggedindetails.role=="teacher"){
      features = [
        {
          icon: <FileCheck className="h-6 w-6" />,
          title: 'Student Assignment Uploads',
          description: 'Students can upload assignments in various formats (PDF, DOCX, etc.) with multiple submissions in one go.',
          link: '/features/student-uploads'
        },
        {
          icon: <AlertTriangle className="h-6 w-6" />,
          title: 'AI-Powered Plagiarism Detection',
          description: 'Advanced algorithms compare submissions with both internal database and external sources for comprehensive plagiarism checking.',
          link: '/features/plagiarism-detection'
        },
        {
          icon: <BarChart4 className="h-6 w-6" />,
          title: 'Automatic Grading & Ranking',
          description: 'Smart evaluation system assigns scores based on predefined guidelines and generates detailed ranking reports.',
          link: '/features/auto-grading'
        },
        {
          icon: <Sliders className="h-6 w-6" />,
          title: 'Teacher Customization',
          description: 'Teachers can adjust scores and train the AI model over time for continuously improving accuracy.',
          link: '/features/teacher-customization'
        },
        {
          icon: <MessageSquareText className="h-6 w-6" />,
          title: 'AI-Generated Feedback',
          description: 'Provides constructive feedback using NLP models to help students understand their mistakes and improve.',
          link: '/features/ai-feedback'
        },
        {
          icon: <LineChart className="h-6 w-6" />,
          title: 'Student Performance Reports',
          description: 'Track progress over time with detailed reports highlighting strengths, weaknesses and improvement areas.',
          link: '/features/performance-reports'
        },
        {
          icon: <Binary className="h-6 w-6" />,
          title: 'Web3 Grade Storage',
          description: 'Enterprise plan includes blockchain-based tamper-proof grade records for maximum security and reliability.',
          link: '/features/web3-storage'
        },
        {
          icon: <Languages className="h-6 w-6" />,
          title: 'Multi-Language Support',
          description: 'Platform supports Indian regional languages to make it accessible for diverse user groups across the country.',
          link: '/features/language-support'
        },
        {
          icon: <CreditCard className="h-6 w-6" />,
          title: 'Flexible Subscription Plans',
          description: 'Choose from Starter, Professional or Enterprise plans based on institutional needs with a 3-month free trial.',
          link: '/features/subscription-plans'
        },
      ];
    
    }
    else{

      features = [
        {
          icon: <FileCheck className="h-6 w-6" />,
          title: 'Student Assignment Uploads',
          description: 'Students can upload assignments in various formats (PDF, DOCX, etc.) with multiple submissions in one go.',
          link: '/features/student-uploads'
        },
        {
          icon: <MessageSquareText className="h-6 w-6" />,
          title: 'AI-Generated Feedback',
          description: 'Provides constructive feedback using NLP models to help students understand their mistakes and improve.',
          link: '/features/ai-feedback'
        },
        {
          icon: <LineChart className="h-6 w-6" />,
          title: 'Student Performance Reports',
          description: 'Track progress over time with detailed reports highlighting strengths, weaknesses and improvement areas.',
          link: '/features/performance-reports'
        },
        {
          icon: <Binary className="h-6 w-6" />,
          title: 'Web3 Grade Storage',
          description: 'Enterprise plan includes blockchain-based tamper-proof grade records for maximum security and reliability.',
          link: '/features/web3-storage'
        },
        {
          icon: <Languages className="h-6 w-6" />,
          title: 'Multi-Language Support',
          description: 'Platform supports Indian regional languages to make it accessible for diverse user groups across the country.',
          link: '/features/language-support'
        },
        {
          icon: <CreditCard className="h-6 w-6" />,
          title: 'Flexible Subscription Plans',
          description: 'Choose from Starter, Professional or Enterprise plans based on institutional needs with a 3-month free trial.',
          link: '/features/subscription-plans'
        },
      ];
    

    }
  }
   
  return (
    <div id="features" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-yellow-600/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Modern Education
          </h2>
          <p className="text-gray-300">
            Our comprehensive toolset helps educators make assessment efficient, fair and insightful
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
