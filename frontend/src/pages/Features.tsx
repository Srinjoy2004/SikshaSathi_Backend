import React from 'react';
 import Navbar from '@/components/Navbar';
 import Footer from '@/components/Footer';
 import { Card } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
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
   CheckCircle
 } from 'lucide-react';
 
 interface FeatureCardProps {
   icon: React.ReactNode;
   title: string;
   description: string;
   benefits: string[];
   link: string;
 }
 
 const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, benefits, link }) => (
   <Card className="glass-morphism hover:yellow-glow transition-all duration-300 h-full">
     <div className="flex flex-col p-8 h-full">
       <div className="h-16 w-16 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
         {icon}
       </div>
       <h3 className="text-2xl font-bold mb-4">{title}</h3>
       <p className="text-gray-400 mb-6">{description}</p>
       <div className="mt-auto">
         <h4 className="text-sm font-semibold text-yellow-400 mb-3">Benefits:</h4>
         <ul className="space-y-2 mb-6">
           {benefits.slice(0, 2).map((benefit, index) => (
             <li key={index} className="flex items-start">
               <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
               <span className="text-sm text-gray-300">{benefit}</span>
             </li>
           ))}
         </ul>
         <Link 
           to={link} 
           className="inline-flex items-center text-yellow-400 hover:text-yellow-500 transition-colors"
         >
           Learn More <ArrowRight className="ml-2 h-4 w-4" />
         </Link>
       </div>
     </div>
   </Card>
 );
 
 const Features: React.FC = () => {
  // alert("This is a test alert to check if the code is working properly.");
   const featuresData = [
     {
       icon: <FileCheck className="h-8 w-8" />,
       title: 'Student  Uploads',
       description: 'Our flexible upload system supports a wide range of document formats, allowing students to submit their work easily.',
       benefits: [
         'Support for multiple file formats (PDF, DOCX, TXT, etc.)',
         'Bulk upload capability for multiple assignments',
         'Automatic file organization by class, subject, and deadline',
         'Custom submission parameters set by educators'
       ],
       link: '/features/student-uploads'
     },
     {
       icon: <AlertTriangle className="h-8 w-8" />,
       title: 'AI-Powered Plagiarism Detection',
       description: 'Our sophisticated algorithms compare submissions against both internal databases and external sources to ensure academic integrity.',
       benefits: [
         'Cross-comparison with previous student submissions',
         'Integration with external academic databases',
         'AI detection of artificially generated content',
         'Detailed similarity reports with source identification'
       ],
       link: '/features/plagiarism-detection'
     },
     {
       icon: <BarChart4 className="h-8 w-8" />,
       title: 'Automatic Grading & Ranking',
       description: 'Save hours of manual grading with our intelligent evaluation system that assigns scores based on customizable criteria.',
       benefits: [
         'Customizable grading rubrics and criteria',
         'Automatic scoring based on predefined parameters',
         'Comparative ranking against class performance',
         'Visual representation of grade distribution'
       ],
       link: '/features/auto-grading'
     },
     {
       icon: <Sliders className="h-8 w-8" />,
       title: 'Teacher Customization',
       description: 'Take full control of the assessment process with adjustable grading parameters and the ability to train our AI.',
       benefits: [
         'Adjustable grading parameters per assignment',
         'AI training based on teacher feedback',
         'Custom rubric creation and management',
         'Personalized assessment workflows'
       ],
       link: '/features/teacher-customization'
     },
     {
       icon: <MessageSquareText className="h-8 w-8" />,
       title: 'AI-Generated Feedback',
       description: 'Provide timely, constructive feedback to students with AI-powered comments that identify areas for improvement.',
       benefits: [
         'Instant feedback generation upon submission',
         'Contextual comments based on submission content',
         'Focus on improvement areas and strengths',
         'Editable suggestions for teacher refinement'
       ],
       link: '/features/ai-feedback'
     },
     {
       icon: <LineChart className="h-8 w-8" />,
       title: 'Student Performance Reports',
       description: 'Track academic progress over time with comprehensive analytics that highlight strengths and weaknesses.',
       benefits: [
         'Longitudinal performance tracking',
         'Skill gap analysis and recommendations',
         'Comparative metrics against learning objectives',
         'Shareable reports for parent-teacher meetings'
       ],
       link: '/features/performance-reports'
     },
     {
       icon: <Binary className="h-8 w-8" />,
       title: 'Web3 Grade Storage',
       description: 'Enterprise plan users benefit from blockchain-based record keeping for the ultimate in security and verification.',
       benefits: [
         'Immutable grade records on secure blockchain',
         'Credential verification for third parties',
         'Digital academic certificates',
         'Enhanced security against record tampering'
       ],
       link: '/features/web3-storage'
     },
     {
       icon: <Languages className="h-8 w-8" />,
       title: 'Multi-Language Support',
       description: 'Our platform supports diverse user groups across India with interfaces and tools available in multiple regional languages.',
       benefits: [
         'Support for major Indian languages',
         'Language detection in uploaded documents',
         'Translation tools for feedback',
         'Localized user interfaces'
       ],
       link: '/features/language-support'
     },
     {
       icon: <CreditCard className="h-8 w-8" />,
       title: 'Flexible Subscription Plans',
       description: 'Choose the right package for your institutional needs with our tiered subscription model, starting with a free trial.',
       benefits: [
         'Three-month free trial for all new users',
         'Scalable plans from individual to institution-wide',
         'Pay only for features you need',
         'Special pricing for educational institutions'
       ],
       link: '/features/subscription-plans'
     },
   ];
 
   return (
     <div className="min-h-screen bg-dark-100">
       <Navbar />
       
       <div className="pt-24 pb-20">
         {/* Hero Section */}
         <div className="container mx-auto px-4 mb-16">
           <div className="text-center max-w-3xl mx-auto">
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
               <span className="text-gradient">Powerful Features</span> for Modern Education
             </h1>
             <p className="text-xl text-gray-300 mb-10">
               Explore our comprehensive suite of tools designed to revolutionize academic assessment
             </p>
             <div className="flex justify-center space-x-4">
               <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                 <Link to="/register">Start Free Trial</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                 <Link to="/contact">Request Demo</Link>
               </Button>
             </div>
           </div>
         </div>
         
         {/* Features Grid */}
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {featuresData.map((feature, index) => (
               <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                 <FeatureCard
                   icon={feature.icon}
                   title={feature.title}
                   description={feature.description}
                   benefits={feature.benefits}
                   link={feature.link}
                 />
               </div>
             ))}
           </div>
         </div>
         
         {/* CTA Section */}
         <div className="container mx-auto px-4 mt-20">
           <Card className="glass-morphism yellow-glow overflow-hidden">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 md:p-12">
                 <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform your assessment process?</h2>
                 <p className="text-gray-300 mb-8">Join thousands of educators who are saving time and improving accuracy with SikshaSathi's intelligent assessment platform.</p>
                 <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                   <Link to="/register" className="inline-flex items-center">
                     Get Started Now
                     <ArrowRight className="ml-2 h-5 w-5" />
                   </Link>
                 </Button>
               </div>
               <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-800/20 hidden md:flex items-center justify-center p-12">
                 <div className="relative w-full h-full">
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                     <div className="text-5xl font-bold text-yellow-400 mb-2">3 Months</div>
                     <div className="text-xl text-yellow-300">Free Trial</div>
                   </div>
                 </div>
               </div>
             </div>
           </Card>
         </div>
       </div>
       
       <Footer />
     </div>
   );
 };
 
 export default Features;