
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  institution: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, institution, rating }) => {
  return (
    <Card className="glass-morphism h-full flex flex-col hover:yellow-glow transition-all duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} 
            />
          ))}
        </div>
        <p className="text-gray-300 italic mb-6 flex-grow">{content}</p>
        <div className="mt-auto">
          <p className="font-semibold text-white">{author}</p>
          <p className="text-sm text-gray-400">{role}, {institution}</p>
        </div>
      </div>
    </Card>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      content: "SikshaSathi has drastically reduced the time I spend grading assignments. The plagiarism detection is remarkably accurate, and the automatic grading system aligns perfectly with my evaluation criteria.",
      author: "Dr. Rajesh Sharma",
      role: "Professor of Computer Science",
      institution: "IIT Delhi",
      rating: 5
    },
    {
      content: "The detailed performance reports have transformed how I provide feedback to my students. Now they can clearly see their strengths and areas for improvement, which has led to noticeable progress throughout the semester.",
      author: "Prof. Meena Gupta",
      role: "Head of Mathematics Department",
      institution: "Delhi University",
      rating: 4
    },
    {
      content: "As a school with over 2000 students, managing assignments was a logistical challenge. SikshaSathi has streamlined our entire assessment workflow and provided consistency across departments.",
      author: "Amit Patel",
      role: "Principal",
      institution: "Modern Academy",
      rating: 5
    },
    {
      content: "The AI-powered feedback feature has been a game-changer. My students receive immediate guidance while I can focus on more personalized instruction. The regional language support is excellent for our diverse student body.",
      author: "Dr. Priya Verma",
      role: "Assistant Professor",
      institution: "Bangalore Institute of Technology",
      rating: 5
    }
  ];

  return (
    <div className="bg-dark-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What <span className="text-gradient">Educators</span> Say
          </h2>
          <p className="text-gray-300">
            Join thousands of satisfied educators who have transformed their assessment process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
              <Testimonial {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
