import React from 'react';
import { cn } from '../../lib/utils';

type ContainerSize = 'sm' | 'default' | 'lg' | 'full';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: React.ElementType;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
  as = 'div',
  ...props
}) => {
  const Component = as;

  const sizeClasses: Record<ContainerSize, string> = {
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
