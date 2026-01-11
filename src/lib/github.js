/**
 * GitHub API Client
 * Interacts directly with the GitHub Repository to save content.
 */

const BASE_URL = 'https://api.github.com/repos';

/**
 * Helper to make authenticated requests.
 */
const request = async (endpoint, token, options = {}) => {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`GitHub API Error: ${response.status} ${errorData.message || response.statusText}`);
    }

    return response.json();
};

/**
 * Gets the SHA of a file (needed for updates).
 * @returns {Promise<string|null>} The SHA string or null if file doesn't exist.
 */
export const getFileSha = async (repo, path, token) => {
    try {
        const data = await request(`${repo}/contents/${path}`, token);
        return data.sha;
    } catch (error) {
        if (error.message.includes('404')) return null;
        throw error;
    }
};

/**
 * Uploads or Updates a file.
 * @param {string} repo - "owner/repo"
 * @param {string} path - "public/content/posts/hello.json"
 * @param {string} content - The content string (will be base64 encoded)
 * @param {string} message - Commit message
 * @param {string} token - PAT
 * @param {string} sha - (Optional) Existing file SHA for updates
 */
export const uploadFile = async (repo, path, content, message, token, sha = null) => {
    // Base64 encode content (handles UTF-8)
    const encodedContent = btoa(unescape(encodeURIComponent(content)));

    const body = {
        message,
        content: encodedContent,
    };

    if (sha) {
        body.sha = sha;
    }

    return await request(`${repo}/contents/${path}`, token, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
};

/**
 * Uploads a binary asset (image).
 * @param {string} repo 
 * @param {string} path 
 * @param {ArrayBuffer} arrayBuffer 
 * @param {string} token 
 */
export const uploadAsset = async (repo, path, arrayBuffer, token) => {
    // Convert ArrayBuffer to Base64
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const encodedContent = btoa(binary);

    return await request(`${repo}/contents/${path}`, token, {
        method: 'PUT',
        body: JSON.stringify({
            message: `Upload asset ${path}`,
            content: encodedContent
        })
    });
};

/**
 * Validates the token and returns the user object.
 */
export const getUser = async (token) => {
    return await request('user', token);
};
