import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default Input;
