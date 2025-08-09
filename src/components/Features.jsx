import React from 'react';
import { GripVertical, FileText, Download } from 'lucide-react';

const features = [
  {
    icon: <GripVertical size={48} />, // Corrected icon name
    title: 'Drag-and-Drop Editor',
    description: 'Easily rearrange sections and content to build a perfect resume layout.',
  },
  {
    icon: <FileText size={48} />,
    title: 'Modern Templates',
    description: 'Choose from a variety of professionally designed templates for any industry.',
  },
  {
    icon: <Download size={48} />,
    title: 'Export to PDF',
    description: 'Download your polished resume in a crisp, clean PDF format, ready to send.',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
              <div className="flex items-center justify-center text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;