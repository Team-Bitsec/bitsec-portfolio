import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface HeroProps {
    lang?: 'en' | 'bn';
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    primaryLink: string;
    secondaryLink: string;
    trustClients: string;
    trustProjects: string;
    trustReply: string;
}

// highlight phrases জন্য mapping
const HIGHLIGHTS: Record<string, string> = {
    'পরবর্তী ধাপে': 'পরবর্তী ধাপে',
    'Next Level': 'Next Level',
};

function HighlightedTitle({ title }: { title: string }) {
    for (const phrase of Object.keys(HIGHLIGHTS)) {
        const idx = title.indexOf(phrase);
        if (idx !== -1) {
            const before = title.slice(0, idx);
            const after = title.slice(idx + phrase.length);
            return (
                <>
                    {before}
                    <span className="relative inline-block">
                        <span
                            className="bg-gradient-to-r from-[#0057FF] via-[#00C2A8] to-[#0057FF] bg-clip-text text-transparent"
                            style={{
                                backgroundSize: '200% auto',
                                animation: 'gradientShimmer 3s linear infinite',
                            }}
                        >
                            {phrase}
                        </span>
                        {/* solid underline instead of pulsating glow */}
                        <span
                            className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary"
                        />
                    </span>
                    {after}
                </>
            );
        }
    }
    return <>{title}</>;
}

export default function Hero({ lang = 'bn', title, subtitle, primaryCta, secondaryCta, primaryLink, secondaryLink, trustClients, trustProjects, trustReply }: HeroProps) {
    return (
        <section className="relative overflow-hidden pt-24 pb-32 flex items-center min-h-[90vh]">

            {/* Background Gradients */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0057FF] to-[#00C2A8] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary dark:text-white tracking-tight leading-tight mb-8 max-w-3xl mx-auto">
                            <HighlightedTitle title={title} />
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p className="text-lg md:text-2xl text-text-secondary dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a href={primaryLink} className="w-full sm:w-auto">
                            <Button size="lg" className="w-full text-lg px-8 py-4">
                                {primaryCta}
                            </Button>
                        </a>
                        <a href={secondaryLink} className="w-full sm:w-auto">
                            <Button variant="ghost" size="lg" className="w-full text-lg px-8 py-4">
                                {secondaryCta}
                            </Button>
                        </a>
                    </motion.div>

                    {/* Inline Trust Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-10 text-sm text-text-secondary dark:text-gray-400"
                    >
                        <span className="flex items-center gap-1.5">
                            <span className="text-yellow-400">★★★★★</span>
                            <span className="font-medium text-text-primary dark:text-white">25+</span> {trustClients}
                        </span>
                        <span className="hidden sm:block w-px h-4 bg-border dark:bg-[#30363D]"></span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#00C2A8]">✓</span>
                            <span className="font-medium text-text-primary dark:text-white">50+</span> {trustProjects}
                        </span>
                        <span className="hidden sm:block w-px h-4 bg-border dark:bg-[#30363D]"></span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#0057FF]">⚡</span>
                            {trustReply}
                        </span>
                    </motion.div>


                </div>
            </div>

            {/* Restored floating shapes and SVG animations */}

            {/* Background Gradients/Blobs with slow pulse */}
            <motion.div
                className="absolute right-[10%] top-[20%] w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute left-[10%] bottom-[20%] w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating SVGs */}
            <motion.div
                className="absolute hidden md:block top-[20%] left-[8%] -z-10 text-primary/20"
                animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute hidden md:block bottom-[25%] right-[12%] -z-10 text-accent/20"
                animate={{ y: [0, 40, 0], rotate: [0, -90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <rect x="7" y="7" width="10" height="10" rx="1" ry="1" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute hidden md:block top-[25%] right-[25%] -z-10 text-[#0057FF]/10"
                animate={{ x: [0, 30, 0], rotate: [0, 180, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                </svg>
            </motion.div>
        </section>
    );
}
