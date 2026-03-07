/**
 * Normalizes a Vite/Astro BASE_URL by removing the trailing slash.
 * Returns an empty string when the base is just '/'.
 *
 * @example
 * normalizeBase('/')               // ''
 * normalizeBase('/bitsec-portfolio')   // '/bitsec-portfolio'
 * normalizeBase('/bitsec-portfolio/')  // '/bitsec-portfolio'
 */
export function normalizeBase(basePath: string): string {
    if (basePath === '/') return '';
    return basePath.replace(/\/$/, '');
}

/**
 * Builds a full URL from a base path + locale path.
 */
export function buildUrl(basePath: string, path: string): string {
    const b = normalizeBase(basePath);
    const resolved = b + (path === '/' ? '' : path);
    return resolved || '/';
}
