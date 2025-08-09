import React from 'react';

const Button = React.forwardRef(({ children, className = '', variant = 'default', ...props }, ref) => {
  let baseClasses = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  let variantClasses = '';

  switch (variant) {
    case 'outline':
      variantClasses = 'border border-purple-700 text-purple-400 hover:bg-purple-900 hover:text-purple-300';
      break;
    case 'default':
    default:
      variantClasses = 'bg-purple-600 text-white hover:bg-purple-700';
  }

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
