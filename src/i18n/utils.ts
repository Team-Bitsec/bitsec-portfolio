import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const basePath = import.meta.env.BASE_URL;
    let pathname = url.pathname;
    if (basePath !== '/' && pathname.startsWith(basePath)) {
        pathname = pathname.substring(basePath.length);
        if (!pathname.startsWith('/')) pathname = '/' + pathname;
    }
    const [, lang] = pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}

export const showDefaultLang = false;
