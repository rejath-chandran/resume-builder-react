import React from 'react';

const Card = ({ children, className = '', ...props }) => (
  <div
    className={`rounded-lg border border-purple-700 bg-indigo-950 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-purple-800 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h2 className={`text-xl font-bold text-purple-300 ${className}`} {...props}>
    {children}
  </h2>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
