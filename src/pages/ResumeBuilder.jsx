import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

// This is the main App component that handles state and rendering.
const App = () => {
  // State to manage all resume data. This will be passed down to the form and resume components.
  const [resumeData, setResumeData] = useState({
    personal: { name: '', title: '', email: '', phone: '', linkedin: '', summary: '' },
    education: [],
    experience: [],
    skills: '',
    projects: [],
  });

  // State to track the current step in the form (0: Personal, 1: Education, 2: Experience, 3: Skills/Projects).
  // 4 indicates the resume preview is being shown.
  const [currentStep, setCurrentStep] = useState(0);

  // Updates the state for nested objects like 'personal'.
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value }
    }));
  };

  // Generic handler for adding new items to an array (education, experience, projects).
  const handleAddItem = (key) => {
    const newItem = key === 'experience'
      ? { company: '', position: '', duration: '', description: '' }
      : key === 'education'
        ? { school: '', degree: '', years: '' }
        : { name: '', description: '' };
    setResumeData(prev => ({
      ...prev,
      [key]: [...prev[key], newItem]
    }));
  };

  // Generic handler for removing items from an array.
  const handleRemoveItem = (key, index) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  // Handler for updating items within an array.
  const handleArrayChange = (key, index, e) => {
    const { name, value } = e.target;
    const updatedArray = resumeData[key].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setResumeData(prev => ({ ...prev, [key]: updatedArray }));
  };

  // Handles the change for the skills textarea.
  const handleSkillsChange = (e) => {
    setResumeData(prev => ({ ...prev, skills: e.target.value }));
  };

  // Component for the Personal Details form.
  const PersonalDetailsForm = () => (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Personal Details</CardTitle>
        <CardDescription className="text-gray-400">Start by telling us about yourself.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={resumeData.personal.name} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input id="title" name="title" value={resumeData.personal.title} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={resumeData.personal.email} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea id="summary" name="summary" value={resumeData.personal.summary} onChange={handlePersonalChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
      </CardContent>
    </Card>
  );

  // Component for the Education form.
  const EducationForm = () => (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Education</CardTitle>
        <CardDescription className="text-gray-400">Add your educational background.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.education.map((edu, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
            <div className="space-y-2">
              <Label htmlFor={`school-${index}`}>School/University</Label>
              <Input id={`school-${index}`} name="school" value={edu.school} onChange={(e) => handleArrayChange('education', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree/Major</Label>
              <Input id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`years-${index}`}>Years Attended</Label>
              <Input id={`years-${index}`} name="years" value={edu.years} onChange={(e) => handleArrayChange('education', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <Button variant="outline" className="mt-2 text-purple-400 border-purple-700 hover:bg-purple-900" onClick={() => handleRemoveItem('education', index)}>Remove</Button>
          </div>
        ))}
        <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => handleAddItem('education')}>Add Education</Button>
      </CardContent>
    </Card>
  );

  // Component for the Experience form.
  const ExperienceForm = () => (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Work Experience</CardTitle>
        <CardDescription className="text-gray-400">Tell us about your professional experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input id={`company-${index}`} name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input id={`position-${index}`} name="position" value={exp.position} onChange={(e) => handleArrayChange('experience', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`duration-${index}`}>Duration</Label>
              <Input id={`duration-${index}`} name="duration" value={exp.duration} onChange={(e) => handleArrayChange('experience', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea id={`description-${index}`} name="description" value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)} className="bg-purple-900 border-purple-700 text-white" />
            </div>
            <Button variant="outline" className="mt-2 text-purple-400 border-purple-700 hover:bg-purple-900" onClick={() => handleRemoveItem('experience', index)}>Remove</Button>
          </div>
        ))}
        <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => handleAddItem('experience')}>Add Experience</Button>
      </CardContent>
    </Card>
  );

  // Component for the Skills and Projects form.
  const SkillsAndProjectsForm = () => (
    <Card className="w-full max-w-2xl mx-auto bg-indigo-950 text-gray-200 border-purple-800">
      <CardHeader>
        <CardTitle className="text-purple-300">Skills & Projects</CardTitle>
        <CardDescription className="text-gray-400">List your key skills and any relevant projects.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Textarea id="skills" name="skills" value={resumeData.skills} onChange={handleSkillsChange} className="bg-purple-900 border-purple-700 text-white" />
        </div>
        <Separator className="bg-purple-800" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Projects</h3>
          {resumeData.projects.map((proj, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md border-purple-800">
              <div className="space-y-2">
                <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                <Input id={`project-name-${index}`} name="name" value={proj.name} onChange={(e) => handleArrayChange('projects', index, e)} className="bg-purple-900 border-purple-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <Textarea id={`project-description-${index}`} name="description" value={proj.description} onChange={(e) => handleArrayChange('projects', index, e)} className="bg-purple-900 border-purple-700 text-white" />
              </div>
              <Button variant="outline" className="mt-2 text-purple-400 border-purple-700 hover:bg-purple-900" onClick={() => handleRemoveItem('projects', index)}>Remove</Button>
            </div>
          ))}
          <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => handleAddItem('projects')}>Add Project</Button>
        </div>
      </CardContent>
    </Card>
  );

  // Component for the Resume Preview. This component formats the data for an ATS-friendly resume.
  const ResumePreview = ({ data }) => {
    // We use a ref to target the specific content we want to print.
    const resumeRef = useRef(null);

    // Function to handle printing.
    const handlePrint = () => {
      window.print();
    };

    return (
      <div className="w-full max-w-3xl mx-auto">
        <style>
          {`
            /* CSS for printing */
            @media print {
              body {
                background-color: #ffffff !important;
                color: #000000 !important;
              }
              .no-print {
                display: none !important;
              }
              .print-resume-container {
                padding: 0;
                margin: 0;
                box-shadow: none;
                background: #ffffff;
                color: #000000;
              }
              .print-resume-container h1, .print-resume-container h2 {
                color: #000000 !important;
              }
            }
          `}
        </style>
        <div ref={resumeRef} className="print-resume-container p-8 bg-indigo-950 shadow-lg rounded-lg leading-relaxed text-gray-200">
          {/* Header with personal information */}
          <header className="text-center pb-4 border-b border-purple-700">
            <h1 className="text-3xl font-bold mb-1 text-purple-300">{data.personal.name}</h1>
            <p className="text-lg text-gray-400 mb-2">{data.personal.title}</p>
            <div className="flex justify-center flex-wrap gap-x-4 text-sm text-gray-400">
              <span>{data.personal.email}</span>
              {data.personal.phone && <span>| {data.personal.phone}</span>}
              {data.personal.linkedin && <span>| <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">{data.personal.linkedin}</a></span>}
            </div>
          </header>

          {/* Professional Summary section */}
          {data.personal.summary && (
            <section className="mt-4">
              <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Professional Summary</h2>
              <p className="text-sm">{data.personal.summary}</p>
            </section>
          )}

          {/* Education section */}
          {data.education.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-200">{edu.school}</h3>
                    <span className="text-sm text-gray-400">{edu.years}</span>
                  </div>
                  <p className="text-sm italic text-gray-300">{edu.degree}</p>
                </div>
              ))}
            </section>
          )}

          {/* Experience section */}
          {data.experience.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-200">{exp.position} at {exp.company}</h3>
                    <span className="text-sm text-gray-400">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-300">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills section */}
          {data.skills && (
            <section className="mt-6">
              <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Skills</h2>
              <p className="text-sm">{data.skills}</p>
            </section>
          )}

          {/* Projects section */}
          {data.projects.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-gray-200">{proj.name}</h3>
                  <p className="text-sm text-gray-300">{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4 no-print">
          <Button onClick={() => setCurrentStep(0)} className="bg-purple-300 text-purple-950 hover:bg-purple-400">Edit Details</Button>
          <Button onClick={handlePrint} className="bg-purple-300 text-purple-950 hover:bg-purple-400">Print to PDF</Button>
        </div>
      </div>
    );
  };

  // Main render logic based on the current step.
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <SkillsAndProjectsForm />;
      case 4:
        return <ResumePreview data={resumeData} />;
      default:
        return <PersonalDetailsForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-8 flex flex-col items-center font-inter text-white">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-purple-300">Resume Builder</h1>
        {renderContent()}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between w-full max-w-2xl mx-auto no-print">
          {currentStep > 0 && currentStep < 4 && (
            <Button className="bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
          )}
          {currentStep < 3 && (
            <Button className="ml-auto bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
          )}
          {currentStep === 3 && (
            <Button className="ml-auto bg-purple-300 text-purple-950 hover:bg-purple-400" onClick={() => setCurrentStep(4)}>Generate Resume</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
