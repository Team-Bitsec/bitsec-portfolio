import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none group";

        const variants = {
            primary: "bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:bg-white dark:hover:bg-gray-100 dark:text-black dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5",
            outline: "border border-black/10 text-black/80 hover:bg-black/5 hover:text-black dark:border-white/10 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white hover:-translate-y-0.5",
            ghost: "text-text-secondary hover:text-text-primary dark:hover:text-white relative overflow-hidden",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-2.5 text-base",
            lg: "px-8 py-3.5 text-lg font-semibold tracking-wide",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {/* For ghost variants (often used for secondary links), optionally append an arrow if it's not explicitly passed in children */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                    {variant === 'ghost' && (
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    )}
                </span>

                {/* Subtle hover background sweep for ghost */}
                {variant === 'ghost' && (
                    <span className="absolute inset-0 bg-primary/5 dark:bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full" />
                )}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
