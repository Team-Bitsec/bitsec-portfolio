import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = true, children, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
                className={cn(
                    "bg-white dark:bg-surface rounded-2xl border border-border dark:border-border overflow-hidden shadow-sm transition-shadow",
                    hoverEffect && "hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
