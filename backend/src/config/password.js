import crypto from "crypto";

const SCRYPT_KEYLEN = 64;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, savedHash] = storedHash.split(":");
  const derivedHash = crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  const savedBuffer = Buffer.from(savedHash, "hex");
  const derivedBuffer = Buffer.from(derivedHash, "hex");

  if (savedBuffer.length !== derivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(savedBuffer, derivedBuffer);
}
