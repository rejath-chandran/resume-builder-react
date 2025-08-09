import React from 'react';

const Textarea = React.forwardRef(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full rounded-md border border-purple-700 bg-purple-900 px-3 py-2 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical ${className}`}
    {...props}
  />
));

Textarea.displayName = 'Textarea';

export { Textarea };
