import React, { useState ,useRef} from 'react';

import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsAndProjectsForm from './SkillsAndProjectsForm';
import ResumePreview from './ResumePreview';
import TemplateOne from '../ResumTemplates/TemplateOne';
import { usePDF } from 'react-to-pdf';
import ResumeToPdf from '../ResumTemplates/ResumeToPdf';


const sampleResumeData = {
  personalInfo: {
    name: "Chris Miller",
    title: "Full-Stack Developer",
    email: "chris.miller@email.com",
    phone: "(123) 456-7890",
    linkedin: "#",
    linkedinUser: "chrismiller",
    github: "#",
    githubUser: "chrismiller",
  },
  summary: "Passionate and innovative full-stack developer with 6 years of experience building and deploying scalable web applications. Proficient in both front-end and back-end technologies, with a strong focus on clean code and robust architecture. Seeking to contribute to challenging projects and a collaborative team environment.",
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Django",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST APIs"
  ],
  experience: [
    {
      title: "Full-Stack Developer",
      company: "Web Solutions Inc.",
      location: "City, State",
      duration: "Jan 2020 – Present",
      duties: [
        "Led the development of a customer-facing portal using React and Node.js, improving user retention by 20%.",
        "Implemented a scalable API with Django and a PostgreSQL database to handle a 3x increase in traffic.",
        "Collaborated with the design team to translate mockups into responsive, accessible, and high-performance UI."
      ]
    }
  ],
  projects: [
    {
      name: "E-commerce Microservices",
      type: "Personal Project",
      link: "github.com/chrismiller/ecommerce-project",
      details: [
        "Architected and built a full-stack e-commerce platform using a microservices pattern with Docker.",
        "Developed a product catalog service, user authentication service, and a shopping cart service.",
        "Utilized a message queue for inter-service communication to ensure reliability."
      ]
    },
    {
      name: "Real-time Chat Application",
      type: "Personal Project",
      link: "github.com/chrismiller/chat-app",
      details: [
        "Created a real-time messaging application using WebSocket technology on a Node.js backend.",
        "Designed a responsive user interface with React, featuring user presence and typing indicators."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "State University",
      location: "City, State",
      duration: "Sep 2014 – May 2018"
    }
  ]
};

const ResumeBuilder = () => {
  
    const { toPDF ,targetRef} = usePDF({filename: 'page.pdf'});
  const [resumeData, setResumeData] = useState({
    personal: { name: '', title: '', email: '', phone: '', linkedin: '', summary: '' },
    education: [],
    experience: [],
    skills: '',
    projects: [],
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Personal details handler
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  // Generic add item
  const handleAddItem = (key) => {
    const newItem =
      key === 'experience'
        ? { company: '', position: '', duration: '', description: '' }
        : key === 'education'
        ? { school: '', degree: '', years: '' }
        : { name: '', description: '' };

    setResumeData(prev => ({
      ...prev,
      [key]: [...prev[key], newItem],
    }));
  };

  // Generic remove item
  const handleRemoveItem = (key, index) => {
    setResumeData(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Generic array change
  const handleArrayChange = (key, index, e) => {
    const { name, value } = e.target;
    const updatedArray = resumeData[key].map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setResumeData(prev => ({
      ...prev,
      [key]: updatedArray,
    }));
  };

  // Skills change handler (simple string)
  const handleSkillsChange = (e) => {
    setResumeData(prev => ({
      ...prev,
      skills: e.target.value,
    }));
  };

  // Project handlers (add/remove/change) use generic array handlers for projects
  const handleProjectAdd = () => handleAddItem('projects');
  const handleProjectRemove = (index) => handleRemoveItem('projects', index);
  const handleProjectChange = (index, e) => handleArrayChange('projects', index, e);

  // Education handlers
  const handleEducationAdd = () => handleAddItem('education');
  const handleEducationRemove = (index) => handleRemoveItem('education', index);
  const handleEducationChange = (index, e) => handleArrayChange('education', index, e);

  // Experience handlers
  const handleExperienceAdd = () => handleAddItem('experience');
  const handleExperienceRemove = (index) => handleRemoveItem('experience', index);
  const handleExperienceChange = (index, e) => handleArrayChange('experience', index, e);

  // Step navigation
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (step) => setCurrentStep(step);

  return (
    <div className="min-h-screen bg-indigo-950 py-8">
      {currentStep === 0 && (
        <PersonalDetailsForm personal={resumeData.personal} onChange={handlePersonalChange} />
      )}
      {currentStep === 1 && (
        <EducationForm
          education={resumeData.education}
          onAdd={handleEducationAdd}
          onRemove={handleEducationRemove}
          onChange={handleEducationChange}
        />
      )}
      {currentStep === 2 && (
        <ExperienceForm
          experience={resumeData.experience}
          onAdd={handleExperienceAdd}
          onRemove={handleExperienceRemove}
          onChange={handleExperienceChange}
        />
      )}
      {currentStep === 3 && (
        <SkillsAndProjectsForm
          skills={resumeData.skills}
          projects={resumeData.projects}
          onSkillsChange={handleSkillsChange}
          onProjectAdd={handleProjectAdd}
          onProjectRemove={handleProjectRemove}
          onProjectChange={handleProjectChange}
        />
      )}
      {currentStep === 4 && (
        <>
        <ResumePreview
          data={resumeData}
          onEdit={() => goToStep(0)}
        />

        </>
      )}

      <div className="max-w-2xl mx-auto mt-6 flex justify-between px-4">
        {currentStep > 0 && currentStep < 4 && (
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {currentStep < 4 && (
          <button
            className="bg-purple-400 text-purple-900 px-4 py-2 rounded hover:bg-purple-500 ml-auto"
            onClick={nextStep}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
