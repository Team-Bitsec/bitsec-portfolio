import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations, useTranslatedPath } from './utils';

// Mock import.meta.env.BASE_URL (vitest sets it to '/' by default)

describe('getLangFromUrl', () => {
    it('returns default lang (bn) for root path', () => {
        const url = new URL('http://localhost/');
        expect(getLangFromUrl(url)).toBe('bn');
    });

    it('returns bn for a BN page', () => {
        const url = new URL('http://localhost/about');
        expect(getLangFromUrl(url)).toBe('bn');
    });

    it('returns en for /en/* path', () => {
        const url = new URL('http://localhost/en/about');
        expect(getLangFromUrl(url)).toBe('en');
    });
});

describe('useTranslations', () => {
    it('returns correct BN translation', () => {
        const t = useTranslations('bn');
        expect(t('nav.home')).toBe('হোম');
    });

    it('returns correct EN translation', () => {
        const t = useTranslations('en');
        expect(t('nav.home')).toBe('Home');
    });

    it('returns correct hero CTA translations', () => {
        const tBn = useTranslations('bn');
        const tEn = useTranslations('en');
        expect(tBn('hero.cta.primary')).toBe('বিনামূল্যে পরামর্শ নিন');
        expect(tEn('hero.cta.primary')).toBe('Get Free Consultation');
    });

    it('returns footer tagline for both languages', () => {
        const tBn = useTranslations('bn');
        const tEn = useTranslations('en');
        expect(tBn('footer.tagline')).toBeTruthy();
        expect(tEn('footer.tagline')).toBeTruthy();
    });
});

describe('useTranslatedPath', () => {
    it('returns path directly for default lang (bn)', () => {
        const translatePath = useTranslatedPath('bn');
        expect(translatePath('/about')).toBe('/about');
    });

    it('prefixes /en for English language', () => {
        const translatePath = useTranslatedPath('en');
        expect(translatePath('/about')).toBe('/en/about');
    });
});
