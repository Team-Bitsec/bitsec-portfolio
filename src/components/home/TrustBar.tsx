import React, { useEffect, useRef, useState } from 'react';

interface CounterProps {
    end: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}

function Counter({ end, suffix = '', prefix = '', duration = 2000 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const start = 0;
                    const steps = 60;
                    const stepTime = duration / steps;
                    let current = start;
                    const increment = end / steps;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            current = end;
                            clearInterval(timer);
                        }
                        setCount(Math.floor(current));
                    }, stepTime);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
}

interface StatItem {
    value: number;
    suffix: string;
    labelBN: string;
    labelEN: string;
}

const stats: StatItem[] = [
    { value: 50, suffix: '+', labelBN: 'প্রজেক্ট সম্পন্ন', labelEN: 'Projects Delivered' },
    { value: 25, suffix: '+', labelBN: 'সন্তুষ্ট ক্লায়েন্ট', labelEN: 'Happy Clients' },
    { value: 4, suffix: '+', labelBN: 'বছরের অভিজ্ঞতা', labelEN: 'Years Experience' },
    { value: 100, suffix: '%', labelBN: 'সন্তুষ্টির হার', labelEN: 'Satisfaction Rate' },
];

interface TrustBarProps {
    lang: 'en' | 'bn';
}

export default function TrustBar({ lang }: TrustBarProps) {
    return (
        <section className="py-16 bg-surface dark:bg-background border-y border-border dark:border-[#27272A] overflow-hidden relative">

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/50 dark:bg-surface border border-black/5 dark:border-white/5 shadow-sm">
                            <div className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white mb-3 tracking-tight">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">
                                {lang === 'en' ? stat.labelEN : stat.labelBN}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
}
