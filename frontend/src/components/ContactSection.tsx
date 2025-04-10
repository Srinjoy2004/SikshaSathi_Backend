
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "support@sikshasathi.edu",
      link: "mailto:support@sikshasathi.edu"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      content: "Tech Park, Koramangala, Bengaluru 560034",
      link: "https://maps.google.com/?q=Koramangala,Bengaluru"
    }
  ];

  return (
    <div id="contact" className="py-20 bg-dark-200">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span> with Us
          </h2>
          <p className="text-gray-300">
            Have questions about SikshaSathi? Our team is here to help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <Card className="glass-morphism p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-200">Name</label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-dark-100/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-200">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-dark-100/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-200">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    className="bg-dark-100/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-200">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message" 
                    rows={6} 
                    className="bg-dark-100/50 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500/20"
                  />
                </div>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-100 w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-morphism p-6">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="rounded bg-yellow-500/20 p-2 mr-4 text-yellow-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-medium mb-1">{item.title}</h4>
                      <a 
                        href={item.link} 
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        {item.content}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="text-base font-medium mb-4">Office Hours</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-300">Monday - Friday</p>
                    <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">Saturday</p>
                    <p className="text-gray-400">10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="glass-morphism p-6">
              <h3 className="text-xl font-bold mb-4">Request a Demo</h3>
              <p className="text-gray-400 mb-4">
                See SikshaSathi in action with a personalized demo for your institution
              </p>
              <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
                Schedule Demo
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
