import React from 'react';
import { cn } from "../../lib/utils";
import { ButtonProps } from "../../types";

// ボタンコンポーネント
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    disabled = false, 
    type = 'button', 
    onClick, 
    className, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-slate-200 text-slate-900 hover:bg-slate-300': variant === 'secondary',
            'border border-slate-300 bg-transparent hover:bg-slate-100': variant === 'outline',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-11 px-6 text-lg': size === 'lg',
            'w-full': fullWidth
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export const buttonVariants = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-slate-200 text-slate-900 hover:bg-slate-300': variant === 'secondary',
      'border border-slate-300 bg-transparent hover:bg-slate-100': variant === 'outline',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
      'h-9 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-base': size === 'md',
      'h-11 px-6 text-lg': size === 'lg',
      'w-full': fullWidth
    },
    className
  );
};

export default Button;
