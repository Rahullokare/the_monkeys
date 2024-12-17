import * as React from 'react';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
  'h-10 flex w-full px-4 text-sm sm:text-base rounded-md file:border-0 file:rounded-sm file:mr-4 file:text-sm focus-visible:outline-none focus-visible:border-2 focus-visible:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 font-roboto bg-background-light dark:bg-background-dark',
  {
    variants: {
      variant: {
        default:
          'border-1 border-foreground-light/80 dark:border-foreground-dark/80 focus-visible:border-foreground-light dark:focus-visible:border-foreground-dark',
        ghost: 'border-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
