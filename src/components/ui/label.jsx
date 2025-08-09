import React from 'react';

const Label = ({ children, htmlFor, className = '', ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-purple-300 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export { Label };
