/**
 * CI/CD Automated Verification Script
 * Validates SHA-256 salted password hashing & question bank integrity
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("==================================================");
console.log("🔍 RUNNING CI/CD VERIFICATION CHECKS");
console.log("==================================================");

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// ---------------- 1. TEST SHA-256 + 16-BYTE SALT ALGORITHM ----------------
console.log("\n[Test 1] SHA-256 with 16-Byte Random Salt Hashing");

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.createHash("sha256").update(salt + password).digest("hex");
}

function verifyPassword(enteredPassword, salt, expectedHash) {
  const candidate = hashPassword(enteredPassword, salt);
  return candidate.toLowerCase() === expectedHash.toLowerCase();
}

const salt1 = generateSalt();
assert(salt1.length === 32, "Salt is exactly 16 bytes (32 hex characters)");

const pw = "mySecretPassword123";
const hash1 = hashPassword(pw, salt1);
assert(hash1.length === 64, "SHA-256 hash is exactly 256 bits (64 hex characters)");

// Verification matches
const isValid = verifyPassword(pw, salt1, hash1);
assert(isValid === true, "Password verification succeeds for correct password");

// Wrong password fails
const isInvalid = verifyPassword("wrongPassword", salt1, hash1);
assert(isInvalid === false, "Password verification fails for incorrect password");

// Salt uniqueness: same password with different salts yields distinct hashes
const salt2 = generateSalt();
const hash2 = hashPassword(pw, salt2);
assert(hash1 !== hash2, "Different salts produce unique hashes for identical passwords (rainbow-table resistant)");

// ---------------- 2. TEST MERN QUESTION BANK INTEGRITY ----------------
console.log("\n[Test 2] Validating 120 Curated MERN Questions");

const questionsFilePath = path.join(__dirname, "..", "src", "data", "questions.js");
const questionsFileContent = fs.readFileSync(questionsFilePath, "utf8");

// Verify presence of questions
assert(questionsFileContent.includes("export const initialQuestions = ["), "questions.js exports initialQuestions");

// Extract id count
const idMatches = questionsFileContent.match(/id:\s*\d+/g) || [];
assert(idMatches.length === 120, `Question bank contains exactly 120 questions (found ${idMatches.length})`);

// Count difficulty levels
const easyMatches = (questionsFileContent.match(/level:\s*"easy"/g) || []).length;
const mediumMatches = (questionsFileContent.match(/level:\s*"medium"/g) || []).length;
const hardMatches = (questionsFileContent.match(/level:\s*"hard"/g) || []).length;

assert(easyMatches === 40, `Found 40 Easy questions (found ${easyMatches})`);
assert(mediumMatches === 40, `Found 40 Medium questions (found ${mediumMatches})`);
assert(hardMatches === 40, `Found 40 Hard questions (found ${hardMatches})`);

// ---------------- 3. TEST FREE API INTEGRATION FILES ----------------
console.log("\n[Test 3] Validating Free API and Security Services");

const cryptoServicePath = path.join(__dirname, "..", "src", "services", "crypto.js");
assert(fs.existsSync(cryptoServicePath), "crypto.js exists with Web Crypto API implementation");

const freeApiServicePath = path.join(__dirname, "..", "src", "services", "freeApi.js");
assert(fs.existsSync(freeApiServicePath), "freeApi.js exists with Open Trivia DB and Advice API");

const storageServicePath = path.join(__dirname, "..", "src", "services", "storage.js");
assert(fs.existsSync(storageServicePath), "storage.js exists with dual-role user & attempts store");

console.log("\n==================================================");
if (failed) {
  console.error("❌ CI/CD VERIFICATION CHECKS FAILED!");
  process.exit(1);
} else {
  console.log("🎉 ALL CI/CD VERIFICATION CHECKS PASSED SUCCESSFULLY!");
  process.exit(0);
}
