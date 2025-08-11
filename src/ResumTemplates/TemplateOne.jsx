// ResumeToPdf.jsx
// React component that renders a resume (Tailwind) and provides a "Download PDF" button
// Uses html2canvas + jsPDF to capture the resume container and save as a multi-page A4 PDF.
// Install dependencies:
// npm install html2canvas jspdf

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Default resume data (you can pass resumeData prop to customize)
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

  // Generate PDF using html2canvas and jsPDF
  const handleDownload = async () => {
    if (!ref.current) return;
    setLoading(true);

    // ensure fonts and images are loaded
    const element = ref.current;

    // Options for html2canvas to increase quality
    const canvas = await html2canvas(element, {
      scale: 2, // increase for better resolution
      useCORS: true,
      scrollY: -window.scrollY, // keep fixed positioning consistent
    });

    const imgData = canvas.toDataURL("image/png");

    // A4 size in px at 72dpi: 595 x 842. But we'll use jsPDF units (mm) and compute ratio.
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Canvas size in px
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    // Convert px to mm using 96 DPI reference: 1px = 0.264583 mm (approx). But better to compute ratio using widths.
    const pxToMm = (valuePx) => (valuePx * 25.4) / 96; // 1 inch = 25.4mm, assume 96dpi

    const imgWidthMm = pxToMm(imgWidthPx);
    const imgHeightMm = pxToMm(imgHeightPx);

    // Fit width to PDF page, keep aspect ratio
    const ratio = Math.min(pdfWidth / imgWidthMm, pdfHeight / imgHeightMm);
    const renderedWidth = imgWidthMm * ratio;
    const renderedHeight = imgHeightMm * ratio;

    // If content fits in one page
    if (renderedHeight <= pdfHeight) {
      pdf.addImage(imgData, "PNG", (pdfWidth - renderedWidth) / 2, 10, renderedWidth, renderedHeight);
    } else {
      // Multi-page: slice the image vertically
      let position = 0;
      const pageHeightPx = Math.floor((pdfHeight / ratio) * (96 / 25.4));
      // pageHeightPx is height in px that fits one PDF page at the current ratio

      while (position < imgHeightPx) {
        const canvasPage = document.createElement("canvas");
        canvasPage.width = imgWidthPx;
        canvasPage.height = Math.min(pageHeightPx, imgHeightPx - position);
        const ctx = canvasPage.getContext("2d");

        // draw the slice
        ctx.drawImage(
          canvas,
          0,
          position,
          imgWidthPx,
          canvasPage.height,
          0,
          0,
          canvasPage.width,
          canvasPage.height
        );

        const pageImgData = canvasPage.toDataURL("image/png");
        const pageImgHeightMm = pxToMm(canvasPage.height);
        const pageRenderedHeight = pageImgHeightMm * ratio;

        if (position > 0) pdf.addPage();
        pdf.addImage(pageImgData, "PNG", (pdfWidth - renderedWidth) / 2, 10, renderedWidth, pageRenderedHeight);

        position += canvasPage.height;
      }
    }

    pdf.save(`${resumeData.name.replace(/\s+/g, "_") || "resume"}.pdf`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 flex gap-3 justify-end">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-50"
        >
          Print
        </button>
      </div>

      {/* Resume container that will be captured */}
      <div
        ref={ref}
        className="bg-white rounded-xl shadow-lg overflow-hidden w-full"
        style={{ fontFamily: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial` }}
      >
        <header className="bg-gray-800 text-white p-6 sm:p-8 md:p-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{resumeData.name}</h1>
          <p className="text-lg sm:text-xl font-light mt-1">{resumeData.title}</p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm sm:text-base mt-4 text-gray-200">
            <p>{resumeData.email}</p>
            <span>|</span>
            <p>{resumeData.phone}</p>
            <span>|</span>
            <a href={`https://${resumeData.linkedin}`} className="hover:underline">
              {resumeData.linkedin}
            </a>
            <span>|</span>
            <a href={`https://${resumeData.github}`} className="hover:underline">
              {resumeData.github}
            </a>
          </div>
        </header>

        <main className="p-6 sm:p-8 md:p-10 space-y-10 text-gray-800">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((s) => (
                <span key={s} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Experience</h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exp.role}</h3>
                    <p className="text-gray-600 font-medium">{exp.company} | {exp.location}</p>
                  </div>
                  <p className="text-gray-500 font-light text-sm mt-1">{exp.period}</p>
                </div>
                <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Projects</h2>
            {resumeData.projects.map((p, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 font-light text-sm mt-1">{p.type}</p>
                </div>
                <p className="text-gray-700 font-medium mt-1">
                  <a href={`https://${p.url}`} className="text-blue-600 hover:underline">{p.url}</a>
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Education</h2>
            {resumeData.education.map((e, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{e.degree}</h3>
                    <p className="text-gray-600 font-medium">{e.school} | {e.location}</p>
                  </div>
                  <p className="text-gray-500 font-light text-sm mt-1">{e.period}</p>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>

      <p className="text-sm text-gray-500 mt-4">Tip: For best PDF results, use the Download PDF button (it uses html2canvas + jsPDF)</p>
    </div>
  );
}
