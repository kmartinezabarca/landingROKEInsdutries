import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const FloatingButton = ({ 
  children, 
  className = '', 
  position = 'bottom-right',
  onClick,
  ariaLabel,
  ...props 
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'fixed z-50 flex items-center justify-center',
        'w-14 h-14 rounded-full shadow-lg',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 focus:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'transition-colors duration-200',
        positionClasses[position],
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default FloatingButton;

