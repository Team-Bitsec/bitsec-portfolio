import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { ui } from '../i18n/ui';

type NavigationProps = {
    lang: 'en' | 'bn';
    currentPath: string;
    basePath?: string;
};

export default function Navigation({ lang, currentPath, basePath = '/' }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const t = (key: keyof typeof ui['en']) => ui[lang][key];

    const links = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.services') },
        { href: '/portfolio', label: t('nav.portfolio') },
        { href: '/about', label: t('nav.about') },
        { href: '/blog', label: t('nav.blog') },
        { href: '/contact', label: t('nav.contact') },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const buildUrl = (path: string) => {
        const b = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
        return `${b}${path === '/' ? '' : path}` || '/';
    };

    const getLangSwitchUrl = () => {
        if (lang === 'en') {
            const newPath = currentPath.replace(/^\/en/, '');
            return buildUrl(newPath === '' ? '/' : newPath);
        } else {
            return buildUrl(currentPath === '/' ? '/en' : `/en${currentPath}`);
        }
    };

    const navPath = (href: string) => {
        if (lang === 'en') {
            return buildUrl(href === '/' ? '/en' : `/en${href}`);
        }
        return buildUrl(href);
    };

    return (
        <header
            className={cn(
                'fixed top-0 inset-x-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-md shadow-sm py-3'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href={navPath('/')} className="flex items-center gap-2.5 group">
                        <img
                            src={buildUrl('/logo.svg')}
                            alt="BitsecIT Logo"
                            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="text-xl tracking-wide text-text-primary dark:text-white font-extrabold italic" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                            Bitsec<span className="bg-gradient-to-r from-[#0057FF] to-[#00C2A8] bg-clip-text text-transparent">IT</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={navPath(link.href)}
                                className="text-[15px] font-medium text-text-secondary hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href={getLangSwitchUrl()}
                            onClick={() => localStorage.setItem('lang', lang === 'en' ? 'bn' : 'en')}
                            className="flex items-center gap-1.5 p-2 rounded hover:bg-surface dark:hover:bg-[#1C2128] text-sm font-medium text-text-secondary transition-colors"
                        >
                            <Globe size={18} />
                            {lang === 'en' ? 'BN' : 'EN'}
                        </a>
                        <a
                            href={navPath('/contact')}
                            className="bg-gradient-to-r from-[#0057FF] to-[#00C2A8] hover:from-[#0040C0] hover:to-[#009980] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#0057FF]/30 hover:shadow-[#0057FF]/50 hover:scale-[1.03] active:scale-95"
                        >
                            {lang === 'en' ? 'Start My Project →' : 'প্রজেক্ট শুরু করি →'}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Language switcher — visible without opening menu */}
                        <a
                            href={getLangSwitchUrl()}
                            onClick={() => localStorage.setItem('lang', lang === 'en' ? 'bn' : 'en')}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white border border-border dark:border-[#30363D] transition-colors"
                            aria-label="Switch language"
                        >
                            <Globe size={14} />
                            {lang === 'en' ? 'BN' : 'EN'}
                        </a>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-text-primary dark:text-white"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-[#0D1117] border-t border-border dark:border-[#30363D] overflow-hidden"
                    >
                        <div className="px-4 py-4 flex flex-col gap-4">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={navPath(link.href)}
                                    className="block text-base font-medium text-text-primary dark:text-gray-300"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="h-px bg-border dark:bg-[#30363D] w-full my-2" />
                            <div className="flex items-center justify-between">
                                <a
                                    href={getLangSwitchUrl()}
                                    onClick={() => localStorage.setItem('lang', lang === 'en' ? 'bn' : 'en')}
                                    className="flex items-center gap-2 text-text-primary dark:text-gray-300 font-medium"
                                >
                                    <Globe size={20} />
                                    {lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
                                </a>
                            </div>
                            {/* Mobile menu CTA */}
                            <a
                                href={navPath('/contact')}
                                className="block w-full text-center bg-gradient-to-r from-[#0057FF] to-[#00C2A8] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
                            >
                                {lang === 'en' ? '🚀 Start My Project' : '🚀 প্রজেক্ট শুরু করি'}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
