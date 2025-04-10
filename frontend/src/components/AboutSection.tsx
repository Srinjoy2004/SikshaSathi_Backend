
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, Award, BookOpen, GraduationCap } from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our platform, from the AI algorithms to the user interface."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Accessibility",
      description: "Education should be accessible to all, which is why we support multiple languages and provide flexible pricing."
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously innovate and improve our AI technology to provide the best possible educational tools."
    }
  ];

  return (
    <div id="about" className="py-20 bg-dark-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              About <span className="text-gradient">SikshaSathi</span>
            </h2>
            <p className="text-gray-300">
              SikshaSathi was born from a simple observation: teachers in India spend countless hours grading assignments 
              and detecting plagiarism manually. We aimed to solve this problem by leveraging the power of AI.
            </p>
            <p className="text-gray-300">
              Founded by a team of educators and technologists from IITs and leading universities, 
              SikshaSathi combines cutting-edge technology with deep educational expertise to create 
              a platform that truly understands the needs of Indian educational institutions.
            </p>
            <p className="text-gray-300">
              Our mission is to transform academic assessment, making it more efficient, fair, and 
              insightful for both educators and students across India.
            </p>
            
            <div className="pt-4">
              <h3 className="font-bold mb-3">Our aim is to:</h3>
              <ul className="space-y-2">
                {[
                  "Save educators countless hours of manual grading",
                  "Provide fair and consistent evaluation across all students",
                  "Detect and prevent plagiarism effectively",
                  "Generate actionable insights for student improvement",
                  "Make quality educational assessment accessible to all Indian institutions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">Our Core Values</h3>
              <p className="text-gray-400">The principles that guide everything we do</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="glass-morphism p-6 hover:yellow-glow transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="rounded-lg bg-yellow-500/20 p-3 text-yellow-400">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
