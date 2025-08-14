import React from 'react';
import { cn } from '../../lib/utils';

const Container = ({ 
  children, 
  className = '', 
  size = 'default',
  as = 'div',
  ...props 
}) => {
  const Component = as;

  const sizeClasses = {
    sm: 'max-w-3xl',
    default: 'max-w-7xl',
    lg: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <Component
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;

