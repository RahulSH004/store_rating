import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-[#315C43] text-[#FFFDF7]',
    secondary: 'bg-[#E5EBDD] text-[#315C43]',
    destructive: 'bg-[#B6534B]/10 text-[#B6534B] border border-[#B6534B]/20',
    outline: 'border border-[#DDD8C9] text-[#243027]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
