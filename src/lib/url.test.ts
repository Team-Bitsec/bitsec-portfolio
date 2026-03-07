import { describe, it, expect } from 'vitest';
import { normalizeBase, buildUrl } from '../lib/url';

describe('normalizeBase', () => {
    it('returns empty string for root slash', () => {
        expect(normalizeBase('/')).toBe('');
    });

    it('returns path unchanged when no trailing slash', () => {
        expect(normalizeBase('/bitsec-portfolio')).toBe('/bitsec-portfolio');
    });

    it('strips trailing slash from base path', () => {
        expect(normalizeBase('/bitsec-portfolio/')).toBe('/bitsec-portfolio');
    });
});

describe('buildUrl', () => {
    it('builds root URL correctly', () => {
        expect(buildUrl('/', '/')).toBe('/');
    });

    it('builds path with non-root base', () => {
        expect(buildUrl('/bitsec-portfolio', '/about')).toBe('/bitsec-portfolio/about');
    });

    it('builds root href with non-root base (no double slash)', () => {
        expect(buildUrl('/bitsec-portfolio', '/')).toBe('/bitsec-portfolio');
    });

    it('handles root base with normal path', () => {
        expect(buildUrl('/', '/contact')).toBe('/contact');
    });
});
