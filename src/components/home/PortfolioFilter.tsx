import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Work {
    id: string;
    title: string;
    titleBN: string;
    category: string;
    categoryBN: string;
    filter: string;
    image: string;
    description: string;
    descriptionBN: string;
    link?: string;
}

// works array replaced with Firebase fetching
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const filters = [
    { key: 'all', labelEN: 'All', labelBN: 'সব' },
    { key: 'web', labelEN: 'Web', labelBN: 'ওয়েব' },
    { key: 'app', labelEN: 'App', labelBN: 'অ্যাপ' },
    { key: 'design', labelEN: 'Design', labelBN: 'ডিজাইন' },
    { key: 'security', labelEN: 'Security', labelBN: 'সিকিউরিটি' },
];

interface PortfolioPreviewProps {
    lang: 'en' | 'bn';
    portfolioPath: string;
}

export default function PortfolioFilter({ lang, portfolioPath }: PortfolioPreviewProps) {
    const [active, setActive] = useState('all');
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const fetchedWorks: Work[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Map Firebase fields to the required Work interface format
                    // Defaulting titleBN/categoryBN to the English ones if they are missing in the database
                    fetchedWorks.push({
                        id: doc.id,
                        title: data.title || '',
                        titleBN: data.titleBN || data.title || '',
                        category: data.category || '',
                        categoryBN: data.categoryBN || data.category || '',
                        filter: data.category ? data.category.toLowerCase().split(' ')[0] : 'web', // Basic mapping to filter text like 'web', 'app'
                        image: data.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop', // Fallback image
                        description: data.description || '',
                        descriptionBN: data.descriptionBN || data.description || '',
                        link: data.link || '',
                    });
                });
                setWorks(fetchedWorks.slice(0, 6)); // Display max 6 works on the home page like before
            } catch (error) {
                console.error("Error fetching works from Firebase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filtered = active === 'all' ? works : works.filter(w => w.filter === active);

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-primary dark:text-white mb-4">
                        {lang === 'en' ? 'Recent Work' : 'আমাদের অনবদ্য কাজগুলো'}
                    </h2>
                    <p className="text-lg text-text-secondary dark:text-text-secondary max-w-xl">
                        {lang === 'en' ? 'Take a look at some of our successful digital projects.' : 'আমাদের সফল ডিজিটাল প্রজেক্টগুলোর এক ঝলক দেখে নিন।'}
                    </p>
                </div>
                <a href={portfolioPath} className="inline-flex items-center text-primary font-medium hover:text-blue-600 transition-colors">
                    {lang === 'en' ? 'View All Projects' : 'সব প্রজেক্ট দেখুন'}
                    <span className="ml-2">→</span>
                </a>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
                {filters.map(f => (
                    <button
                        key={f.key}
                        onClick={() => setActive(f.key)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${active === f.key
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                            : 'bg-surface dark:bg-surface text-text-secondary dark:text-text-secondary border border-border dark:border-border hover:border-primary hover:text-primary'
                            }`}
                    >
                        {lang === 'en' ? f.labelEN : f.labelBN}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((work, index) => (
                            <motion.a
                                key={`${work.id}-${index}`}
                                href={`${portfolioPath}/${work.id}`}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                className="group flex flex-col relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#121212] transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,87,255,0.15)] dark:shadow-none dark:hover:shadow-[0_8px_30px_-4px_rgba(0,87,255,0.15)] border border-gray-100 dark:border-white/5"
                            >
                                {/* Image Container (Aspect Ratio to ensure consistency) */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                    {/* Primary Color Overlay on Hover */}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-multiply dark:mix-blend-color-burn"></div>

                                    {/* Blurred Backdrop for Portrait App Images */}
                                    {work.filter === 'app' && (
                                        <img
                                            src={work.image}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-60 scale-125 saturate-150"
                                            aria-hidden="true"
                                        />
                                    )}

                                    <img
                                        src={work.image}
                                        alt={lang === 'en' ? work.title : work.titleBN}
                                        loading="lazy"
                                        className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-110 ${work.filter === 'app' ? 'object-contain p-4 z-10 drop-shadow-2xl' : 'object-cover'}`}
                                    />

                                    {/* Floating Glassmorphism Badge */}
                                    <div className="absolute top-5 left-5 z-20 overflow-hidden rounded-full shadow-md">
                                        <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-md"></div>
                                        <span className="relative block px-4 py-1.5 text-xs font-bold tracking-wide text-text-primary dark:text-white uppercase transition-colors group-hover:text-primary">
                                            {lang === 'en' ? work.category : work.categoryBN}
                                        </span>
                                    </div>

                                    {/* Overlay Action Icon */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                        <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl text-primary border border-gray-100 dark:border-white/10">
                                            <svg className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-700 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between relative bg-white dark:bg-[#121212] z-20 border-t border-gray-50 dark:border-white/5">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary dark:text-white mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                                            {lang === 'en' ? work.title : work.titleBN}
                                        </h3>
                                        <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2 mb-6 leading-relaxed flex-grow">
                                            {lang === 'en' ? work.description : work.descriptionBN}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center text-sm font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors duration-300 w-max pb-1 relative">
                                            {lang === 'en' ? 'Explore Project' : 'প্রজেক্ট বিস্তারিত'}
                                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </div>
                                        {work.link && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(work.link, '_blank', 'noopener,noreferrer');
                                                }}
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors z-30 relative"
                                            >
                                                {lang === 'en' ? 'Live Link' : 'লাইভ লিংক'}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    );
}
