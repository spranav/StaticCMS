import CryptoJS from 'crypto-js';

/**
 * Encrypts a string (token) using a passphrase.
 * @param {string} text - The raw token
 * @param {string} passphrase - The user's passphrase
 * @returns {string} The encrypted ciphertext
 */
export const encryptToken = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
};

/**
 * Decrypts a string (token) using a passphrase.
 * @param {string} ciphertext - The encrypted string
 * @param {string} passphrase - The user's passphrase
 * @returns {string} The decrypted raw token
 * @throws Will throw if passphrase is wrong (malformed UTF-8)
 */
export const decryptToken = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (!originalText) {
        throw new Error("Incorrect passphrase or invalid data");
    }

    return originalText;
};
