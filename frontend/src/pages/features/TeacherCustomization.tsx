import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sliders, CheckCircle, Settings, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TeacherCustomization = () => {
  // State for grading parameters
  const [gradingParams, setGradingParams] = useState({
    grammar: 75,
    content: 50,
    structure: 66,
    references: 83
  });
  
  // State for custom rubric
  const [rubricItems, setRubricItems] = useState([
    { name: 'Content Quality', weight: 30 },
    { name: 'Organization', weight: 20 },
    { name: 'Citations', weight: 15 },
    { name: 'Critical Thinking', weight: 35 }
  ]);
  
  // State for AI training options
  const [aiOptions, setAiOptions] = useState({
    learnFromAdjustments: true,
    automaticAdaptation: true,
    manualReview: false
  });

  // Handle slider changes
  const handleParamChange = (param, value) => {
    setGradingParams(prev => ({
      ...prev,
      [param]: value
    }));
  };
  
  // Handle rubric weight changes
  const handleRubricChange = (index, value) => {
    const newRubric = [...rubricItems];
    newRubric[index].weight = value;
    setRubricItems(newRubric);
  };
  
  // Handle switch changes
  const handleSwitchChange = (option, value) => {
    setAiOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

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
                <Sliders className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">Teacher</span> Customization
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Take full control of the assessment process with adjustable grading parameters and the ability to train our AI to match your specific teaching style and requirements.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Adjustable parameters</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>AI training</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Custom rubrics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Personalized workflows</span>
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
                  <Settings className="h-16 w-16 text-yellow-400" />
                  <div className="w-full max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-yellow-400">Grammar</span>
                        <div className="h-4 w-16 bg-yellow-500/20 rounded-full">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${gradingParams.grammar}%` }}></div>
                        </div>
                      </div>
                      <div className="h-20 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-yellow-400">Content</span>
                        <div className="h-4 w-16 bg-yellow-500/20 rounded-full">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${gradingParams.content}%` }}></div>
                        </div>
                      </div>
                      <div className="h-20 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-yellow-400">Structure</span>
                        <div className="h-4 w-16 bg-yellow-500/20 rounded-full">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${gradingParams.structure}%` }}></div>
                        </div>
                      </div>
                      <div className="h-20 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-sm text-yellow-400">References</span>
                        <div className="h-4 w-16 bg-yellow-500/20 rounded-full">
                          <div className="h-full rounded-full bg-yellow-500" style={{ width: `${gradingParams.references}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Customizable grading parameters</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Customization Interface */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Customize Your Assessment Process</h2>
          
          <Tabs defaultValue="parameters" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="parameters">Grading Parameters</TabsTrigger>
              <TabsTrigger value="rubrics">Custom Rubrics</TabsTrigger>
              <TabsTrigger value="ai">AI Training</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters" className="space-y-8">
              <Card className="glass-morphism p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">Adjust Grading Parameters</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="grammar-slider">Grammar Importance</Label>
                      <span className="text-sm text-yellow-400">{gradingParams.grammar}%</span>
                    </div>
                    <Slider 
                      id="grammar-slider"
                      min={0} 
                      max={100} 
                      step={1}
                      value={[gradingParams.grammar]}
                      onValueChange={(value) => handleParamChange('grammar', value[0])}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="content-slider">Content Importance</Label>
                      <span className="text-sm text-yellow-400">{gradingParams.content}%</span>
                    </div>
                    <Slider 
                      id="content-slider"
                      min={0} 
                      max={100} 
                      step={1}
                      value={[gradingParams.content]}
                      onValueChange={(value) => handleParamChange('content', value[0])}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="structure-slider">Structure Importance</Label>
                      <span className="text-sm text-yellow-400">{gradingParams.structure}%</span>
                    </div>
                    <Slider 
                      id="structure-slider"
                      min={0} 
                      max={100} 
                      step={1}
                      value={[gradingParams.structure]}
                      onValueChange={(value) => handleParamChange('structure', value[0])}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="references-slider">References Importance</Label>
                      <span className="text-sm text-yellow-400">{gradingParams.references}%</span>
                    </div>
                    <Slider 
                      id="references-slider"
                      min={0} 
                      max={100} 
                      step={1}
                      value={[gradingParams.references]}
                      onValueChange={(value) => handleParamChange('references', value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                    <Save className="mr-2 h-4 w-4" />
                    Save Parameters
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="rubrics" className="space-y-8">
              <Card className="glass-morphism p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">Create Custom Rubrics</h3>
                
                <div className="space-y-6">
                  {rubricItems.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`rubric-${index}`}>{item.name} Weight</Label>
                        <span className="text-sm text-yellow-400">{item.weight}%</span>
                      </div>
                      <Slider 
                        id={`rubric-${index}`}
                        min={0} 
                        max={100} 
                        step={1}
                        value={[item.weight]}
                        onValueChange={(value) => handleRubricChange(index, value[0])}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
                    Add Rubric Item
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                    <Save className="mr-2 h-4 w-4" />
                    Save Rubric
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-8">
              <Card className="glass-morphism p-8">
                <h3 className="text-xl font-bold mb-6 text-yellow-400">AI Training Settings</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="learn-adjustments" className="text-lg">Learn from Manual Adjustments</Label>
                      <p className="text-sm text-gray-400 mt-1">AI learns from your manual grade adjustments to match your style</p>
                    </div>
                    <Switch 
                      id="learn-adjustments" 
                      checked={aiOptions.learnFromAdjustments}
                      onCheckedChange={(checked) => handleSwitchChange('learnFromAdjustments', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="automatic-adaptation" className="text-lg">Automatic Adaptation</Label>
                      <p className="text-sm text-gray-400 mt-1">Gradually adapts evaluation approach to your teaching style</p>
                    </div>
                    <Switch 
                      id="automatic-adaptation" 
                      checked={aiOptions.automaticAdaptation}
                      onCheckedChange={(checked) => handleSwitchChange('automaticAdaptation', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="manual-review" className="text-lg">Require Manual Review</Label>
                      <p className="text-sm text-gray-400 mt-1">Require your approval before finalizing any grade</p>
                    </div>
                    <Switch 
                      id="manual-review" 
                      checked={aiOptions.manualReview}
                      onCheckedChange={(checked) => handleSwitchChange('manualReview', checked)}
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                    <Save className="mr-2 h-4 w-4" />
                    Save AI Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Templates Section */}
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Saved Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-morphism p-6 hover:yellow-glow cursor-pointer">
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Essay Evaluation</h3>
              <p className="text-gray-300 text-sm mb-4">A balanced template for evaluating academic essays</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Last used: 2 days ago</span>
                <span>4 parameters</span>
              </div>
            </Card>
            
            <Card className="glass-morphism p-6 hover:yellow-glow cursor-pointer">
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Research Paper</h3>
              <p className="text-gray-300 text-sm mb-4">Emphasizes citations and methodology</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Last used: 1 week ago</span>
                <span>6 parameters</span>
              </div>
            </Card>
            
            <Card className="glass-morphism p-6 hover:yellow-glow border-dashed border-2 border-yellow-500/30 flex items-center justify-center">
              <div className="text-center">
                <p className="text-yellow-400 font-medium mb-1">Create New Template</p>
                <p className="text-gray-400 text-sm">Save current settings as template</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">How It Works</h2>
              <p className="text-gray-300 mb-4">
                Our teacher customization system allows you to define exactly how each assignment should be evaluated. Set specific weights for different criteria like content quality, organization, citations, and more.
              </p>
              <p className="text-gray-300">
                As you make manual adjustments to AI-suggested grades, the system learns from your preferences and gradually adapts its evaluation approach to match your teaching style and requirements.
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Create custom rubrics tailored to specific assignment types</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Save different evaluation templates for quick reuse</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Train AI to recognize your grading standards and preferences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Override auto-grading when needed with easy manual adjustments</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to customize your assessment process?</h2>
            <p className="text-gray-300 mb-6">Get started with our free trial and experience the difference.</p>
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

export default TeacherCustomization;
