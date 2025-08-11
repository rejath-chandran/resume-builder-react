import React, { forwardRef } from "react";

const TemplateOne = forwardRef(function TemplateOne({ resumeData }, ref) {
  const {
    personalInfo,
    summary,
    skills,
    experience,
    projects,
    education,
  } = resumeData;

  const renderSkills = (skillList) => {
    const flattenedSkills = Array.isArray(skillList[0])
      ? skillList.flat()
      : skillList;

    return (
      <div style={{ breakInside: 'avoid' }}>
        {flattenedSkills.map((skill, index) => (
          <span
            key={index}
            className="
              bg-[#e5e7eb] text-[#1f2937] text-xs font-medium p-1.5 px-3 pb-3
              mr-2 mb-2
              rounded-full inline-block mr-1 mb-1
            "
            style={{ breakInside: 'avoid' }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  const renderExperience = (expList) =>
    expList.map((exp, index) => (
      <div key={index} className="mb-4" style={{ breakInside: 'avoid' }}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-[#1f2937]">{exp.title}</h3>
            <p className="text-[#4b5563] font-medium text-sm">
              {exp.company} | {exp.location}
            </p>
          </div>
          <p className="text-[#6b7280] font-light text-xs mt-1">{exp.duration}</p>
        </div>
        <ul className="list-disc list-inside mt-2 text-sm text-[#374151] space-y-0.5">
          {exp.duties.map((duty, idx) => (
            <li key={idx}>{duty}</li>
          ))}
        </ul>
      </div>
    ));

  const renderProjects = (projectList) =>
    projectList.map((project, index) => (
      <div key={index} className="mb-4" style={{ breakInside: 'avoid' }}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#1f2937]">{project.name}</h3>
          <p className="text-[#6b7280] font-light text-xs mt-1">{project.type}</p>
        </div>
        <p className="text-[#374151] font-medium text-sm mt-1">
          <a href={project.link} className="text-[#2563eb] hover:underline">
            {project.link}
          </a>
        </p>
        <ul className="list-disc list-inside mt-1 text-sm text-[#374151] space-y-0.5">
          {project.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    ));

  const renderEducation = (eduList) =>
    eduList.map((edu, index) => (
      <div key={index} className="mb-3" style={{ breakInside: 'avoid' }}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-[#1f2937]">{edu.degree}</h3>
            <p className="text-[#4b5563] font-medium text-sm">
              {edu.institution} | {edu.location}
            </p>
          </div>
          <p className="text-[#6b7280] font-light text-xs mt-1">{edu.duration}</p>
        </div>
      </div>
    ));

  return (
    <div
      ref={ref}
      className="
        bg-white shadow-lg mx-auto overflow-hidden 
        w-full max-w-[794px]
        print:w-[210mm] print:h-[297mm] print:mx-0 print:my-0 print:shadow-none print:rounded-none
      "
    >
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 8mm 10mm; /* Reduced top/bottom margin */
            }
            body {
              margin: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            main > section {
                break-inside: auto;
                margin-top: 5mm; /* Reduced margin-top for new pages */
            }
            main > section:first-child {
                margin-top: 0;
            }
            header {
                break-inside: avoid;
            }
          }
        `}
      </style>

      {/* Header */}
      <header className="bg-[#1f2937] text-white p-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInfo.name}
        </h1>
        <p className="text-base font-light mt-0.5">
          {personalInfo.title}
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-xs mt-2 text-[#e5e7eb]">
          <p>{personalInfo.email}</p>
          <span>|</span>
          <p>{personalInfo.phone}</p>
          <span>|</span>
          <a href={personalInfo.linkedin} className="hover:underline">
            linkedin.com/in/{personalInfo.linkedinUser}
          </a>
          <span>|</span>
          <a href={personalInfo.github} className="hover:underline">
            github.com/{personalInfo.githubUser}
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-[#1f2937] border-b-2 border-[#d1d5db] pb-1 mb-2">
            Summary
          </h2>
          <p className="text-sm text-[#374151] leading-relaxed">{summary}</p>
        </section>

        <section className="skills-container">
          <h2 className="text-xl font-bold text-[#1f2937] border-b-2 border-[#d1d5db] pb-1 mb-2">
            Skills
          </h2>
          {renderSkills(skills)}
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1f2937] border-b-2 border-[#d1d5db] pb-1 mb-2">
            Experience
          </h2>
          {renderExperience(experience)}
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1f2937] border-b-2 border-[#d1d5db] pb-1 mb-2">
            Projects
          </h2>
          {renderProjects(projects)}
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1f2937] border-b-2 border-[#d1d5db] pb-1 mb-2">
            Education
          </h2>
          {renderEducation(education)}
        </section>
      </main>
    </div>
  );
});

export default TemplateOne;