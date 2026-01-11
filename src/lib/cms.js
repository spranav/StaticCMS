/**
 * Core CMS Logic
 * Fetches content from the static JSON files on GitHub Pages.
 */

// Base path for content
// To get instant updates, we fetch directly from GitHub Raw
// REPLACE 'spranav/StaticCMS' with your actual 'username/repo'
const REPO_PATH = 'spranav/StaticCMS';
const BRANCH = 'main';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${REPO_PATH}/${BRANCH}/public/content`;

// Helper to add cache buster
const fetchWithCacheBuster = async (path) => {
    const t = Date.now();
    // Try GitHub Raw first (fastest updates)
    // If running locally (localhost), we might prefer local files, but Raw works too if online.
    // However, to save bandwidth/rate-limits during dev, we can check hostname.

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let url;

    if (isLocal) {
        url = `/content${path}`;
    } else {
        url = `${GITHUB_RAW_BASE}${path}`;
    }

    const response = await fetch(`${url}?t=${t}`);
    if (!response.ok) {
        // Fallback to local/relative if Raw fails (e.g. repo private or typo)
        console.warn(`Failed to fetch from Raw (${url}), falling back to relative path.`);
        const fallbackResponse = await fetch(`/content${path}?t=${t}`);
        if (!fallbackResponse.ok) throw new Error("Content not found");
        return fallbackResponse.json();
    }
    return response.json();
};

/**
 * Fetches the Manifest (list of all posts).
 * @returns {Promise<Array>} List of post metadata
 */
export const getManifest = async () => {
    try {
        return await fetchWithCacheBuster(`/manifest.json`);
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
        return await fetchWithCacheBuster(`/posts/${slug}.json`);
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
};
