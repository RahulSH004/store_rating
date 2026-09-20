import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315C43] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      default: 'bg-[#315C43] text-[#FFFDF7] hover:bg-[#264B36] shadow-none',
      outline: 'border border-[#DDD8C9] bg-[#FFFDF7] text-[#243027] hover:bg-[#F7F3E8]',
      secondary: 'bg-[#E5EBDD] text-[#315C43] hover:bg-[#D5DECC]',
      ghost: 'hover:bg-[#F7F3E8] text-[#243027]',
      destructive: 'bg-[#B6534B] text-[#FFFDF7] hover:bg-[#9E453D]',
      link: 'text-[#315C43] underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-11 px-6 text-base',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
