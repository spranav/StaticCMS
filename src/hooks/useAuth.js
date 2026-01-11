import { useState, useEffect } from 'react';
import { encryptToken, decryptToken } from '../lib/crypto';
import { getUser } from '../lib/github';

const STORAGE_KEY = 'cms_encrypted_token';
const REPO_KEY = 'cms_repo_path'; // "owner/repo"

export function useAuth() {
    const [token, setToken] = useState(null); // Decrypted session token
    const [isEncrypted, setIsEncrypted] = useState(false); // Does a token exist in localStorage?
    const [repo, setRepo] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const storedRepo = localStorage.getItem(REPO_KEY);
        if (stored) setIsEncrypted(true);
        if (storedRepo) setRepo(storedRepo);
        setLoading(false);
    }, []);

    /**
     * First setup: Encrypts token and saves it.
     */
    const setup = async (rawToken, passphrase, repoPath) => {
        // Validate token first
        await getUser(rawToken);

        // Encrypt
        const encrypted = encryptToken(rawToken, passphrase);
        localStorage.setItem(STORAGE_KEY, encrypted);
        localStorage.setItem(REPO_KEY, repoPath);

        setToken(rawToken); // Set session
        setRepo(repoPath);
        setIsEncrypted(true);
    };

    /**
     * Login: Decrypts token.
     */
    const login = (passphrase) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) throw new Error("No token found");

        const decrypted = decryptToken(stored, passphrase);
        setToken(decrypted); // Set session
        return true;
    };

    const logout = () => {
        setToken(null);
        // Note: We don't clear localStorage, just the session
    };

    const clearStorage = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REPO_KEY);
        setToken(null);
        setIsEncrypted(false);
    }

    return { token, isEncrypted, repo, loading, setup, login, logout, clearStorage };
}
