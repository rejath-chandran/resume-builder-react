import React from 'react';

const Separator = ({ className = '', ...props }) => (
  <hr
    className={`border-t border-purple-700 my-4 ${className}`}
    {...props}
  />
);

export { Separator };
