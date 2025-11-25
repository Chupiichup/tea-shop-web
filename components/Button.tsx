import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 tracking-wide rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-rust-500 text-white hover:bg-rust-600 shadow-sm hover:shadow-md",
    secondary: "bg-stone-800 text-white hover:bg-stone-700 shadow-sm",
    outline: "border border-stone-300 text-stone-700 hover:border-rust-500 hover:text-rust-500 bg-transparent",
    white: "bg-white/90 text-stone-900 hover:bg-white shadow-sm backdrop-blur-sm",
    ghost: "text-stone-600 hover:text-rust-500 hover:bg-rust-50",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};