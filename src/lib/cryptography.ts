// for encryption and decryption
import CryptoJS from "crypto-js";

// for secure local storage
import secureLocalStorage from "react-secure-storage";

// encrypt refresh token
export function encrypt(message: string, secretKey: string) {
    let ciphertext = null;
    try {
        ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    } catch (err) {
        console.log("Encrypt secret key error:", err);
    }

    return ciphertext;
}

// decrypt refresh token

// store refresh token in secure local storage
export function storeRefresh(refresh: string) {
    try {
        // Store 'username' in localStorage
        secureLocalStorage.setItem(
            process.env.REACT_APP_SECURE_LOCAL_STORAGE_PREFIX as string,
            refresh
        );

    } catch (e) {
        // Log the error if any of the storage operations fail
        console.error("Storage operation failed: ", e);
    }
}


export function secureRefresh(refresh: string) {
    const encryptedRefresh = encrypt(
        refresh,
        process.env.REACT_APP_SECRET_KEY as string
    );
    if (encryptedRefresh !== null) {
        storeRefresh(encryptedRefresh);
    } else {
        console.error("Error encrypting refresh token.");
    }
}


export function decrypt(ciphertext, secretKey) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secretKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (plaintext === '') {
            throw new Error('Decryption succeeded but returned an empty string.');
        }
        return plaintext;
    } catch (err) {
        console.error("Decrypt secret key error:", err);
        throw err; // rethrow the error to handle it in the calling function
    }
}


export async function getDecryptedRefresh() {
    
    try {
        const encryptedRefresh = getRefresh();
        if (!encryptedRefresh) {
            console.error("Encrypted refresh token is empty.");
            return null;
        }
        if (!process.env.REACT_APP_SECRET_KEY) {
            console.error("Secret key is undefined.");
            return null;
        }

        const decryptedRefresh = decrypt(
            encryptedRefresh,
            process.env.REACT_APP_SECRET_KEY
        );

        if (!decryptedRefresh) {
            console.error("Decryption failed or returned an empty result.");
            return null;
        }

        return decryptedRefresh;
    } catch (error) {
        console.error("An error occurred during decryption:", error);
        return null;
    }
}


export function getRefresh() {
    const refresh = secureLocalStorage.getItem(
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_PREFIX as string
    );
    if (typeof refresh === 'undefined') {
        console.error("No refresh token found in secureLocalStorage.");
    }
    return refresh;
}


export function removeRefresh() {
    secureLocalStorage.removeItem(
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_PREFIX as string
    );
}