/// <reference types="vite/client" />

/**
 * Permanent asset URL resolver for Vite.
 * Automatically resolves relative asset paths against Vite's base URL
 * so assets load seamlessly across localhost, GitHub Pages subpaths,
 * custom domains, and mobile devices without hardcoding.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};
