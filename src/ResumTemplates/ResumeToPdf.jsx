// ResumeToPdf.jsx
// Updated to use web-safe colors (no oklch) and handle missing resumeData properties safely.

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const defaultResumeData = {
  name: "Chris Miller",
  title: "Full-Stack Developer",
  email: "chris.miller@email.com",
  phone: "(123) 456-7890",
  linkedin: "linkedin.com/in/chrismiller",
  github: "github.com/chrismiller",
  summary:
    "Passionate and innovative full-stack developer with 6 years of experience building and deploying scalable web applications.",
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Django",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST APIs",
  ],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "Web Solutions Inc.",
      location: "City, State",
      period: "Jan 2020 – Present",
      bullets: [
        "Led the development of a customer-facing portal using React and Node.js, improving user retention by 20%.",
        "Implemented a scalable API with Django and a PostgreSQL database to handle a 3x increase in traffic.",
        "Collaborated with the design team to translate mockups into responsive, accessible, and high-performance UI.",
      ],
    },
  ],
  projects: [
    {
      name: "E-commerce Microservices",
      url: "github.com/chrismiller/ecommerce-project",
      type: "Personal Project",
      bullets: [
        "Architected and built a full-stack e-commerce platform using a microservices pattern with Docker.",
        "Developed a product catalog service, user authentication service, and a shopping cart service.",
        "Utilized a message queue for inter-service communication to ensure reliability.",
      ],
    },
    {
      name: "Real-time Chat Application",
      url: "github.com/chrismiller/chat-app",
      type: "Personal Project",
      bullets: [
        "Created a real-time messaging application using WebSocket technology on a Node.js backend.",
        "Designed a responsive user interface with React, featuring user presence and typing indicators.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "State University",
      location: "City, State",
      period: "Sep 2014 – May 2018",
    },
  ],
};

export default function ResumeToPdf({ resumeData = defaultResumeData }) {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);

  const {
    name = "",
    title = "",
    email = "",
    phone = "",
    linkedin = "",
    github = "",
    summary = "",
    skills = [],
    experience = [],
    projects = [],
    education = [],
  } = resumeData || {};

  const handleDownload = async () => {
    if (!ref.current) return;
    setLoading(true);

    const element = ref.current;
    const desktopWidth = element.scrollWidth;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: 0,            // Prevent scroll offset issues
      windowWidth: 1024,  
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    //     const pdfWidth = 210; // A4 width in mm
    // const pdfHeight = 297; // A4 height in mm

    //  const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const pxToMm = (px) => (px * 25.4) / 96;

    const imgWidthMm = pxToMm(imgWidthPx);
    const imgHeightMm = pxToMm(imgHeightPx);

    const ratio = Math.min(pdfWidth / imgWidthMm, pdfHeight / imgHeightMm);
    const renderedWidth = imgWidthMm * ratio;
    const renderedHeight = imgHeightMm * ratio;

    if (renderedHeight <= pdfHeight) {
      pdf.addImage(imgData, "PNG", (pdfWidth - renderedWidth) / 2, 10, renderedWidth, renderedHeight);
    } else {
      let position = 0;
      const pageHeightPx = Math.floor((pdfHeight / ratio) * (96 / 25.4));
      while (position < imgHeightPx) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = imgWidthPx;
        canvasPage.height = Math.min(pageHeightPx, imgHeightPx - position);
        const ctx = canvasPage.getContext("2d");
        ctx.drawImage(canvas, 0, position, imgWidthPx, canvasPage.height, 0, 0, canvasPage.width, canvasPage.height);
        const pageImgData = canvasPage.toDataURL("image/png");
        const pageImgHeightMm = pxToMm(canvasPage.height);
        const pageRenderedHeight = pageImgHeightMm * ratio;
        if (position > 0) pdf.addPage();
        pdf.addImage(pageImgData, "PNG", (pdfWidth - renderedWidth) / 2, 10, renderedWidth, pageRenderedHeight);
        position += canvasPage.height;
      }
    }

    pdf.save(`${name.replace(/\s+/g, "_") || "resume"}.pdf`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 flex gap-3 justify-end">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-[#2563eb] text-white px-4 py-2 rounded shadow hover:bg-[#1d4ed8] disabled:opacity-60"
        >
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-white border border-[#d1d5db] px-4 py-2 rounded shadow hover:bg-[#f9fafb]"
        >
          Print
        </button>
      </div>

      <div
        ref={ref}
        // className="bg-white rounded-xl shadow-lg overflow-hidden w-[1024px]"
        className="bg-white rounded-xl shadow-lg overflow-hidden w-full"
    
        style={{ fontFamily: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial` }}
      >
        <header className="bg-[#1f2937] text-white p-6 sm:p-8 md:p-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{name}</h1>
          <p className="text-lg sm:text-xl font-light mt-1">{title}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm sm:text-base mt-4 text-[#e5e7eb]">
            {email && <p>{email}</p>}
            {phone && (<><span>|</span><p>{phone}</p></>)}
            {linkedin && (<><span>|</span><a href={`https://${linkedin}`} className="hover:underline">{linkedin}</a></>)}
            {github && (<><span>|</span><a href={`https://${github}`} className="hover:underline">{github}</a></>)}
          </div>
        </header>

        <main className="p-6 sm:p-8 md:p-10 space-y-10 text-[#1f2937]">
          {summary && (
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-[#d1d5db] pb-2 mb-4">Summary</h2>
              <p className="text-[#374151] leading-relaxed">{summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-[#d1d5db] pb-2 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="bg-[#e5e7eb] text-[#1f2937] text-sm font-medium px-5 py-3 rounded-full">{s}</span>
                ))}
              </div>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-[#d1d5db] pb-2 mb-4">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-[#4b5563] font-medium">{exp.company} | {exp.location}</p>
                    </div>
                    <p className="text-[#6b7280] font-light text-sm mt-1">{exp.period}</p>
                  </div>
                  <ul className="list-disc list-inside mt-3 text-[#374151] space-y-1">
                    {(exp.bullets || []).map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-[#d1d5db] pb-2 mb-4">Projects</h2>
              {projects.map((p, idx) => (
                <div key={idx} className="mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-[#6b7280] font-light text-sm mt-1">{p.type}</p>
                  </div>
                  {p.url && <p className="text-[#374151] font-medium mt-1"><a href={`https://${p.url}`} className="text-[#2563eb] hover:underline">{p.url}</a></p>}
                  <ul className="list-disc list-inside mt-2 text-[#374151] space-y-1">
                    {(p.bullets || []).map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold border-b-2 border-[#d1d5db] pb-2 mb-4">Education</h2>
              {education.map((e, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{e.degree}</h3>
                      <p className="text-[#4b5563] font-medium">{e.school} | {e.location}</p>
                    </div>
                    <p className="text-[#6b7280] font-light text-sm mt-1">{e.period}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>

      <p className="text-sm text-[#6b7280] mt-4">Tip: For best PDF results, use the Download PDF button</p>
    </div>
  );
}
