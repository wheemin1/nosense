import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  primary = false, 
  disabled = false,
  className = ''
}) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const primaryClasses = "bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-300 shadow-md hover:shadow-lg";
  const secondaryClasses = "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200";
  
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`;
  
  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;