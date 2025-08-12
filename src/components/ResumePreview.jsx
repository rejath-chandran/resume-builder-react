import React, { useRef } from 'react';
import { Button } from './ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumPdf';


const ResumePreview = ({ data, onEdit }) => {
  const resumeRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <style>
        {`
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
        <header className="text-center pb-4 border-b border-purple-700">
          <h1 className="text-3xl font-bold mb-1 text-purple-300">{data.personal.name}</h1>
          <p className="text-lg text-gray-400 mb-2">{data.personal.title}</p>
          <div className="flex justify-center flex-wrap gap-x-4 text-sm text-gray-400">
            <span>{data.personal.email}</span>
            {data.personal.phone && <span>| {data.personal.phone}</span>}
            {data.personal.linkedin && (
              <span>
                |{' '}
                <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">
                  {data.personal.linkedin}
                </a>
              </span>
            )}
          </div>
        </header>

        {data.personal.summary && (
          <section className="mt-4">
            <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Professional Summary</h2>
            <p className="text-sm">{data.personal.summary}</p>
          </section>
        )}

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

        {data.skills && (
          <section className="mt-6">
            <h2 className="text-xl font-bold border-b border-purple-700 pb-1 mb-2 text-purple-300">Skills</h2>
            <p className="text-sm">{data.skills}</p>
          </section>
        )}

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
        <Button onClick={onEdit} className="bg-purple-300 text-purple-950 hover:bg-purple-400">Edit Details</Button>
        {/* <Button onClick={handlePrint} className="bg-purple-300 text-purple-950 hover:bg-purple-400">Print to PDF</Button> */}

         <PDFDownloadLink
        
          document={<ResumePDF data={data} />}
          fileName="resume.pdf"
        >
          {({ loading }) => (
            <button
               className="bg-purple-300 text-purple-950 font-semibold py-2 px-6 rounded-md hover:bg-purple-400 transition"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Download Resume'}
            </button>
          )}
        </PDFDownloadLink>

      </div>
    </div>
  );
};

export default ResumePreview;
