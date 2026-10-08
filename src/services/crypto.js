/**
 * Secure Password Hashing Service using SHA-256 with unique 16-byte Salt
 * Uses native Web Crypto API (crypto.subtle and crypto.getRandomValues)
 */

// Convert ArrayBuffer to Hex String
function bufferToHex(buffer) {
  const byteArray = new Uint8Array(buffer);
  let hexString = "";
  for (let i = 0; i < byteArray.length; i++) {
    const hex = byteArray[i].toString(16).padStart(2, "0");
    hexString += hex;
  }
  return hexString;
}

// Convert Hex String to Uint8Array
function hexToBytes(hexString) {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Generate a cryptographically secure random 16-byte (128-bit) salt
 * @returns {string} 32-character hexadecimal string
 */
export function generateSalt() {
  const saltBytes = new Uint8Array(16);
  window.crypto.getRandomValues(saltBytes);
  return bufferToHex(saltBytes);
}

/**
 * Hash a password with a salt using SHA-256
 * @param {string} password - Raw password text
 * @param {string} saltHex - Hex-encoded salt
 * @returns {Promise<string>} 64-character hexadecimal SHA-256 hash string
 */
export async function hashPassword(password, saltHex) {
  const encoder = new TextEncoder();
  // Join salt + password
  const combined = saltHex + password;
  const data = encoder.encode(combined);

  // Compute SHA-256 digest via Web Crypto API
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

/**
 * Verify an entered password against a stored salt and hash
 * @param {string} enteredPassword
 * @param {string} storedSaltHex
 * @param {string} storedHashHex
 * @returns {Promise<boolean>} True if password matches
 */
export async function verifyPassword(enteredPassword, storedSaltHex, storedHashHex) {
  const candidateHash = await hashPassword(enteredPassword, storedSaltHex);
  return candidateHash.toLowerCase() === storedHashHex.toLowerCase();
}
