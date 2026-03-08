import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    quote: string;
    quoteBN: string;
    author: string;
    role: string;
    initials: string;
    color: string;
    stars: number;
}

const testimonials: Testimonial[] = [
    {
        quote: '"Working with Bitsec was a smooth experience from start to finish. The website they built for us loads fast, looks great on mobile, and our customers love it."',
        quoteBN: '"বিটসেকের সাথে কাজ করার অভিজ্ঞতা শুরু থেকে শেষ পর্যন্ত দারুণ ছিল। তারা আমাদের জন্য যে ওয়েবসাইট তৈরি করেছে সেটি দ্রুত লোড হয়, মোবাইলে সুন্দর দেখায় এবং আমাদের গ্রাহকরা এটি পছন্দ করেন।"',
        author: 'Ahmed Hassan',
        role: 'CEO, RetailBD',
        initials: 'AH',
        color: 'from-blue-500 to-teal-400',
        stars: 5
    },
    {
        quote: '"Their penetration testing service uncovered vulnerabilities in our system that we had no idea existed. Professional, thorough, and highly recommended for any tech startup."',
        quoteBN: '"তাদের পেনেট্রেশন টেস্টিং সার্ভিস আমাদের সিস্টেমে এমন দুর্বলতা খুঁজে বের করেছে যা আমরা জানতামই না। পেশাদার, পুঙ্খানুপুঙ্খ এবং যেকোনো টেক স্টার্টআপের জন্য অত্যন্ত সুপারিশযোগ্য।"',
        author: 'Sarah M.',
        role: 'CTO, Fintech Startup',
        initials: 'SM',
        color: 'from-purple-500 to-blue-500',
        stars: 5
    },
    {
        quote: '"They delivered our mobile app on time and within budget. The UI is clean, the app runs well on both iOS and Android. Very responsive team."',
        quoteBN: '"তারা সময়মতো এবং বাজেটের মধ্যে আমাদের মোবাইল অ্যাপ ডেলিভারি দিয়েছে। UI পরিষ্কার, অ্যাপটি iOS এবং Android উভয়তেই ভালো চলে। অত্যন্ত রেসপন্সিভ টিম।"',
        author: 'Rashed K.',
        role: 'Founder, HealthTrack',
        initials: 'RK',
        color: 'from-teal-500 to-green-400',
        stars: 5
    },
    {
        quote: '"The brand identity package Bitsec delivered exceeded our expectations. From logo to social media kit — everything was consistent and professional."',
        quoteBN: '"বিটসেক যে ব্র্যান্ড আইডেন্টিটি প্যাকেজ ডেলিভারি দিয়েছে তা আমাদের প্রত্যাশাকে ছাড়িয়ে গেছে। লোগো থেকে সোশ্যাল মিডিয়া কিট পর্যন্ত — সব কিছু সামঞ্জস্যপূর্ণ এবং পেশাদার ছিল।"',
        author: 'Nadia I.',
        role: 'Director, Creative Circle',
        initials: 'NI',
        color: 'from-pink-500 to-orange-400',
        stars: 5
    },
];

interface TestimonialsCarouselProps {
    lang: 'en' | 'bn';
}

export default function TestimonialsCarousel({ lang }: TestimonialsCarouselProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = useCallback((idx: number, dir: number) => {
        setDirection(dir);
        setCurrent(idx);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const variants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
    };

    const t = testimonials[current];

    return (
        <section className="py-24 bg-white border-y border-[#DDE5F0]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0D1B2A] mb-4">
                        {lang === 'en' ? 'What Clients Say' : 'ক্লায়েন্টরা কী বলছেন'}
                    </h2>
                    <p className="text-[#5A6A7E]">
                        {lang === 'en' ? 'Real results for real businesses' : 'বাস্তব ব্যবসার বাস্তব ফলাফল'}
                    </p>
                </div>

                <div className="relative overflow-hidden min-h-[280px] flex items-center">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full"
                        >
                            <div className="bg-[#EEF3FF] rounded-2xl border border-[#C5D6FF] shadow-sm p-8 md:p-12">
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: t.stars }).map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>

                                <p className="text-lg md:text-xl text-[#0D1B2A] font-medium italic mb-8 leading-relaxed">
                                    {lang === 'en' ? t.quote : t.quoteBN}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#0D1B2A]">{t.author}</div>
                                        <div className="text-sm text-[#5A6A7E]">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots + Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length, -1)}
                        className="w-10 h-10 rounded-full border border-[#C5D6FF] flex items-center justify-center text-[#5A6A7E] hover:text-[#0057FF] hover:border-[#0057FF] transition-colors"
                        aria-label="Previous"
                    >
                        ←
                    </button>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i, i > current ? 1 : -1)}
                                    className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-3 bg-[#0057FF]' : 'w-3 h-3 bg-[#C5D6FF] hover:bg-[#0057FF]/50'}`}
                                    aria-label={`Go to ${i + 1}`}
                                />
                            ))}
                        </div>
                        {/* Auto-progress bar */}
                        <div className="w-24 h-0.5 bg-[#C5D6FF] rounded-full overflow-hidden">
                            <div
                                key={current}
                                className="h-full bg-[#0057FF] rounded-full"
                                style={{ animation: 'progressBar 5s linear forwards' }}
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => goTo((current + 1) % testimonials.length, 1)}
                        className="w-10 h-10 rounded-full border border-[#C5D6FF] flex items-center justify-center text-[#5A6A7E] hover:text-[#0057FF] hover:border-[#0057FF] transition-colors"
                        aria-label="Next"
                    >
                        →
                    </button>
                </div>
                <style>{`
                    @keyframes progressBar {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                    @media (prefers-reduced-motion: reduce) {
                        @keyframes progressBar { from { width: 100%; } to { width: 100%; } }
                    }
                `}</style>
            </div>
        </section>
    );
}
