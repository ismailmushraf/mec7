import { sign, verify } from "hono/jwt";
import { Role } from "@prisma/client";

interface HashResult {
  hash: string;
  salt: string;
  iterations: number;
}

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  
  // Generate random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iterations = 100000;
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derive key
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256'
    },
    keyMaterial,
    256 // 32 bytes
  );
  
  // Convert to base64 for storage
  const hashBuffer = new Uint8Array(derivedBits);
  const hashBase64 = btoa(String.fromCharCode(...hashBuffer));
  const saltBase64 = btoa(String.fromCharCode(...salt));
  
  // Store as JSON string
  return JSON.stringify({
    hash: hashBase64,
    salt: saltBase64,
    iterations: iterations
  });
}

export const verifyPassword = async (password: string, storedData: string): Promise<boolean> => {
  try {
    const { hash, salt, iterations }: HashResult = JSON.parse(storedData);
    
    const encoder = new TextEncoder();
    
    // Convert base64 back to Uint8Array
    const saltBuffer = Uint8Array.from(atob(salt), c => c.charCodeAt(0));
    
    // Import password as key material
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    
    // Derive key with same parameters
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    );
    
    // Convert to base64 and compare
    const hashBuffer = new Uint8Array(derivedBits);
    const newHashBase64 = btoa(String.fromCharCode(...hashBuffer));
    
    return newHashBase64 === hash;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

export const createToken = async (
  payload: { userId: string, phone: string, role: Role },
  secret: string
): Promise<string> => {
  return await sign(payload, secret);
}

export const verifyToken = async (token: string, secret: string) => {
  return await verify(token, secret);
}
