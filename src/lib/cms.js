/**
 * Core CMS Logic
 * Fetches content from the static JSON files on GitHub Pages.
 */

// Base path for content
const CONTENT_BASE = '/content';

// Helper to add cache buster
const fetchWithCacheBuster = async (url) => {
    const t = Date.now();
    const response = await fetch(`${url}?t=${t}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.json();
};

/**
 * Fetches the Manifest (list of all posts).
 * @returns {Promise<Array>} List of post metadata
 */
export const getManifest = async () => {
    try {
        return await fetchWithCacheBuster(`${CONTENT_BASE}/manifest.json`);
    } catch (error) {
        console.error("Error fetching manifest:", error);
        return [];
    }
};

/**
 * Fetches a single post by slug.
 * @param {string} slug 
 * @returns {Promise<Object|null>} Post data { title, date, content, ... }
 */
export const getPost = async (slug) => {
    try {
        return await fetchWithCacheBuster(`${CONTENT_BASE}/posts/${slug}.json`);
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
};
