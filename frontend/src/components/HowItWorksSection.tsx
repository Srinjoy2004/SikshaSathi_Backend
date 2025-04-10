
import React from 'react';
import { Upload, Search, CheckSquare, BarChart2 } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: 'Upload Documents',
      description: 'Teachers upload master copies and students submit their assignments through the platform.'
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: 'AI Analysis',
      description: 'Our advanced AI checks for plagiarism, compares with other submissions, and analyzes content.'
    },
    {
      icon: <CheckSquare className="h-8 w-8" />,
      title: 'Automatic Grading',
      description: 'System grades assignments based on similarity to master copy and other quality factors.'
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: 'Generate Reports',
      description: 'Detailed performance reports with scores, rankings, and improvement suggestions.'
    }
  ];

  return (
    <div className="bg-dark-200 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How <span className="text-gradient">SikshaSathi</span> Works
          </h2>
          <p className="text-gray-300">
            A simple and effective process to transform how you evaluate academic work
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-ml-0.5 w-1 bg-yellow-500/30 h-full"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              <div className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-4 md:-translate-x-3 w-6 h-6 bg-dark-100 border-2 border-yellow-500 rounded-full z-10 shadow-lg shadow-yellow-500/20"></div>

                {/* Timeline Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="glass-morphism p-6 rounded-xl">
                    <div className="flex items-center mb-4 gap-3">
                      <div className="rounded-lg bg-yellow-500/20 p-2 text-yellow-400">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
