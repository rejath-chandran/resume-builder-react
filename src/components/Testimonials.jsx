import React from 'react';

const testimonials = [
  {
    name: 'Sarah Chen',
    quote: "I landed my dream job just one week after using this resume builder. The templates are incredible!",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Michael Rodriguez',
    quote: "The drag-and-drop editor saved me so much time. I was able to customize my resume perfectly.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-indigo-50 p-6 rounded-lg shadow-md">
              <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <p className="font-semibold text-indigo-900">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;