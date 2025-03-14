
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AdPlacement from './ui/AdPlacement';
import { Check, Download, Briefcase, GraduationCap, Award, Users, Globe, Pencil } from 'lucide-react';
import { toast } from 'sonner';

const templates = [
  { id: 'professional', name: 'Professional', description: 'Clean and modern design for corporate roles' },
  { id: 'creative', name: 'Creative', description: 'Standout design for creative industries' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design for any position' },
  { id: 'academic', name: 'Academic', description: 'Detailed format for academic and research positions' }
];

const sections = [
  { id: 'personal', name: 'Personal Details', icon: Pencil },
  { id: 'experience', name: 'Work Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills', icon: Award },
  { id: 'languages', name: 'Languages', icon: Globe },
  { id: 'references', name: 'References', icon: Users }
];

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [resumeData, setResumeData] = useState({
    personal: { name: '', email: '', phone: '', location: '', summary: '' },
    experience: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }],
    skills: [''],
    languages: [{ language: '', proficiency: '' }],
    references: [{ name: '', position: '', company: '', email: '', phone: '' }]
  });
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleInputChange = (section: string, field: string, value: string, index: number = 0) => {
    setResumeData(prev => {
      if (section === 'personal') {
        return {
          ...prev,
          personal: {
            ...prev.personal,
            [field]: value
          }
        };
      } else if (section === 'skills') {
        const updatedSkills = [...prev.skills];
        updatedSkills[index] = value;
        return {
          ...prev,
          skills: updatedSkills
        };
      } else {
        const updatedSection = [...prev[section as keyof typeof prev] as any[]];
        updatedSection[index] = {
          ...updatedSection[index],
          [field]: value
        };
        return {
          ...prev,
          [section]: updatedSection
        };
      }
    });
  };
  
  const handleAddItem = (section: string) => {
    setResumeData(prev => {
      if (section === 'skills') {
        return {
          ...prev,
          skills: [...prev.skills, '']
        };
      } else if (section === 'experience') {
        return {
          ...prev,
          experience: [...prev.experience, { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
        };
      } else if (section === 'education') {
        return {
          ...prev,
          education: [...prev.education, { degree: '', school: '', location: '', startDate: '', endDate: '', description: '' }]
        };
      } else if (section === 'languages') {
        return {
          ...prev,
          languages: [...prev.languages, { language: '', proficiency: '' }]
        };
      } else if (section === 'references') {
        return {
          ...prev,
          references: [...prev.references, { name: '', position: '', company: '', email: '', phone: '' }]
        };
      }
      return prev;
    });
  };
  
  const handleRemoveItem = (section: string, index: number) => {
    setResumeData(prev => {
      if (
        ['experience', 'education', 'skills', 'languages', 'references'].includes(section)
      ) {
        const sectionArray = [...prev[section as keyof typeof prev] as any[]];
        if (sectionArray.length > 1) {
          sectionArray.splice(index, 1);
          return {
            ...prev,
            [section]: sectionArray
          };
        }
      }
      return prev;
    });
  };
  
  const handleGenerateResume = () => {
    toast.success('Resume generated successfully');
    // In a real app, this would generate a PDF/DOCX file
  };
  
  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6">Select a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-[3/4] bg-muted/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img 
                        src={`/placeholder.svg`} 
                        alt={template.name}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <span className="text-xl font-medium mb-2">{template.name}</span>
                        <span className="text-sm text-center text-muted-foreground">{template.description}</span>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={!selectedTemplate}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6">Add Your Information</h2>
            
            <div className="space-y-8 mb-8">
              {sections.map((section) => {
                const Icon = section.icon;
                
                return (
                  <div key={section.id} className="border border-border rounded-xl overflow-hidden">
                    <div className="p-4 bg-muted/30 border-b border-border flex items-center">
                      <Icon className="w-5 h-5 text-primary mr-2" />
                      <h3 className="font-medium">{section.name}</h3>
                    </div>
                    
                    <div className="p-6">
                      {section.id === 'personal' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={resumeData.personal.name}
                              onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={resumeData.personal.email}
                              onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={resumeData.personal.phone}
                              onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={resumeData.personal.location}
                              onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                              Professional Summary
                            </label>
                            <textarea
                              rows={3}
                              className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                              value={resumeData.personal.summary}
                              onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                      
                      {section.id === 'experience' && (
                        <div>
                          {resumeData.experience.map((exp, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                              {index > 0 && (
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Experience {index + 1}</h4>
                                  <button
                                    onClick={() => handleRemoveItem('experience', index)}
                                    className="text-sm text-destructive hover:text-destructive/80"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Job Title
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={exp.title}
                                    onChange={(e) => handleInputChange('experience', 'title', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Company
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={exp.company}
                                    onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Location
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={exp.location}
                                    onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                      Start Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/YYYY"
                                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      value={exp.startDate}
                                      onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                      End Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/YYYY or Present"
                                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      value={exp.endDate}
                                      onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                    />
                                  </div>
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={exp.description}
                                    onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                                  />
                                </div>
                              </div>
                              
                              {index < resumeData.experience.length - 1 && (
                                <div className="border-t border-border my-6"></div>
                              )}
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleAddItem('experience')}
                            >
                              Add Another Experience
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {section.id === 'education' && (
                        <div>
                          {resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                              {index > 0 && (
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Education {index + 1}</h4>
                                  <button
                                    onClick={() => handleRemoveItem('education', index)}
                                    className="text-sm text-destructive hover:text-destructive/80"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Degree/Certificate
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={edu.degree}
                                    onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    School/University
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={edu.school}
                                    onChange={(e) => handleInputChange('education', 'school', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Location
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={edu.location}
                                    onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                      Start Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/YYYY"
                                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      value={edu.startDate}
                                      onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                                      End Date
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/YYYY or Present"
                                      className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      value={edu.endDate}
                                      onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                                    />
                                  </div>
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    rows={3}
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={edu.description}
                                    onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                                  />
                                </div>
                              </div>
                              
                              {index < resumeData.education.length - 1 && (
                                <div className="border-t border-border my-6"></div>
                              )}
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleAddItem('education')}
                            >
                              Add Another Education
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {section.id === 'skills' && (
                        <div>
                          {resumeData.skills.map((skill, index) => (
                            <div key={index} className="mb-3 last:mb-0 flex items-center">
                              <input
                                type="text"
                                className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="e.g. Project Management, JavaScript, Photoshop"
                                value={skill}
                                onChange={(e) => handleInputChange('skills', '', e.target.value, index)}
                              />
                              {resumeData.skills.length > 1 && (
                                <button
                                  onClick={() => handleRemoveItem('skills', index)}
                                  className="ml-2 text-sm text-destructive hover:text-destructive/80"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleAddItem('skills')}
                            >
                              Add Another Skill
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {section.id === 'languages' && (
                        <div>
                          {resumeData.languages.map((lang, index) => (
                            <div key={index} className="mb-4 last:mb-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <input
                                  type="text"
                                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                  placeholder="Language"
                                  value={lang.language}
                                  onChange={(e) => handleInputChange('languages', 'language', e.target.value, index)}
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                  placeholder="Proficiency (e.g. Native, Fluent, Intermediate)"
                                  value={lang.proficiency}
                                  onChange={(e) => handleInputChange('languages', 'proficiency', e.target.value, index)}
                                />
                                {resumeData.languages.length > 1 && (
                                  <button
                                    onClick={() => handleRemoveItem('languages', index)}
                                    className="ml-2 text-sm text-destructive hover:text-destructive/80"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleAddItem('languages')}
                            >
                              Add Another Language
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {section.id === 'references' && (
                        <div>
                          {resumeData.references.map((ref, index) => (
                            <div key={index} className="mb-6 last:mb-0">
                              {index > 0 && (
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Reference {index + 1}</h4>
                                  <button
                                    onClick={() => handleRemoveItem('references', index)}
                                    className="text-sm text-destructive hover:text-destructive/80"
                                  >
                                    Remove
                                  </button>
                                </div>
                              )}
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={ref.name}
                                    onChange={(e) => handleInputChange('references', 'name', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Position/Title
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={ref.position}
                                    onChange={(e) => handleInputChange('references', 'position', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Company
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={ref.company}
                                    onChange={(e) => handleInputChange('references', 'company', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={ref.email}
                                    onChange={(e) => handleInputChange('references', 'email', e.target.value, index)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Phone
                                  </label>
                                  <input
                                    type="tel"
                                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={ref.phone}
                                    onChange={(e) => handleInputChange('references', 'phone', e.target.value, index)}
                                  />
                                </div>
                              </div>
                              
                              {index < resumeData.references.length - 1 && (
                                <div className="border-t border-border my-6"></div>
                              )}
                            </div>
                          ))}
                          
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => handleAddItem('references')}
                            >
                              Add Another Reference
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button onClick={handleNext}>
                Preview Resume
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6">Preview & Download</h2>
            
            <div className="border border-border rounded-xl overflow-hidden mb-8">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-medium">Resume Preview</h3>
              </div>
              
              <div className="p-6">
                <div className="aspect-[3/4] bg-muted/30 relative flex items-center justify-center">
                  <img 
                    src={`/placeholder.svg`} 
                    alt="Resume Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 max-w-md w-full">
                      <h2 className="text-2xl font-bold mb-2">{resumeData.personal.name || 'Your Name'}</h2>
                      <p className="text-muted-foreground mb-4">{resumeData.personal.summary || 'Your professional summary will appear here.'}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium">Experience</h3>
                          <p className="text-sm text-muted-foreground">
                            {resumeData.experience[0].title ? `${resumeData.experience[0].title} at ${resumeData.experience[0].company}` : 'Your work experience will appear here.'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Education</h3>
                          <p className="text-sm text-muted-foreground">
                            {resumeData.education[0].degree ? `${resumeData.education[0].degree} at ${resumeData.education[0].school}` : 'Your education will appear here.'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Skills</h3>
                          <p className="text-sm text-muted-foreground">
                            {resumeData.skills[0] ? resumeData.skills.join(', ') : 'Your skills will appear here.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleGenerateResume}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download DOCX
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back to Edit
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= activeStep
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step < activeStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span className="text-sm mt-2 text-muted-foreground">
                {step === 1 ? 'Template' : step === 2 ? 'Details' : 'Preview'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted"></div>
          <div 
            className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
            style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {renderStepContent()}
      
      <div className="mb-8">
        <AdPlacement format="leaderboard" className="mx-auto" />
      </div>
    </div>
  );
}
