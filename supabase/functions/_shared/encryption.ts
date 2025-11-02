/**
 * Field-level encryption utilities for sensitive data
 * Uses AES-256-GCM encryption with per-field unique IVs
 */

const ENCRYPTION_KEY_HEX = Deno.env.get('ENCRYPTION_KEY');

if (!ENCRYPTION_KEY_HEX) {
  throw new Error('ENCRYPTION_KEY environment variable is required');
}

// Convert hex string to Uint8Array
const hexToBytes = (hex: string): Uint8Array => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
};

const ENCRYPTION_KEY = hexToBytes(ENCRYPTION_KEY_HEX);

/**
 * Encrypt a string value using AES-256-GCM
 */
export const encryptField = async (plaintext: string): Promise<string> => {
  if (!plaintext) return '';

  // Generate a random IV for this encryption
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Import the key
  const key = await crypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  // Encrypt the data
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  // Combine IV + ciphertext and encode as base64
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return btoa(String.fromCharCode(...combined));
};

/**
 * Decrypt a string value using AES-256-GCM
 */
export const decryptField = async (encrypted: string): Promise<string> => {
  if (!encrypted) return '';

  try {
    // Decode from base64
    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));

    // Extract IV and ciphertext
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    // Import the key
    const key = await crypto.subtle.importKey(
      'raw',
      ENCRYPTION_KEY,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return '[ENCRYPTED]';
  }
};

/**
 * Encrypt sensitive lead fields
 */
export const encryptLeadData = async (data: any) => {
  const encrypted = { ...data };
  
  if (data.email) {
    encrypted.email = await encryptField(data.email);
  }
  
  if (data.phone) {
    encrypted.phone = await encryptField(data.phone);
  }
  
  return encrypted;
};

/**
 * Decrypt sensitive lead fields
 */
export const decryptLeadData = async (data: any) => {
  const decrypted = { ...data };
  
  if (data.email) {
    decrypted.email = await decryptField(data.email);
  }
  
  if (data.phone) {
    decrypted.phone = await decryptField(data.phone);
  }
  
  return decrypted;
};
