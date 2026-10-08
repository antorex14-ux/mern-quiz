# PASSWORD HASHING ALGORITHM
## Secure Login System Using SHA-256 with Salt (Student & Teacher Portals)

**Project:** MERN Stack QuizHub  
**Repository:** [https://github.com/Antony/mern-quiz-app]  
**Author:** Antony  

---

### 1. Introduction
This login system demonstrates secure password hashing with a unique cryptographically generated random salt using the SHA-256 hash function for both **Student** and **Teacher** roles. The browser's native **Web Crypto API** (`window.crypto`) performs the cryptographic operations client-side. Instead of saving plaintext passwords, the system stores only the unique salt and the resulting hash digest, ensuring the real password is never stored or exposed in local storage or database records.

---

### 2. Algorithm Used
- **Algorithm:** SHA-256 (Secure Hash Algorithm, 256-bit) applied to `salt + password`.
- **Salt length:** 16 bytes (128 bits), generated with high cryptographic entropy for each user account.
- **Hash output length:** 256 bits (32 bytes), stored as a 64-character hexadecimal string.
- **One-Way Function:** SHA-256 is mathematically irreversible: given a password and salt, the hash can be computed instantaneously, but the password cannot be reverse-engineered from the hash. Because standard SHA-256 is computationally fast, production backends typically employ key-stretching functions like bcrypt, PBKDF2, or Argon2id. SHA-256 with unique 16-byte salt is implemented here to demonstrate fundamental cryptographic storage and verification.

---

### 3. What Is a Salt?
A salt is a cryptographically random byte sequence concatenated with the password prior to hashing. The salt is public and stored alongside the user record:
- Because every student and teacher receives a distinct random 16-byte salt, identical passwords result in completely different hashes.
- This prevents adversaries from detecting identical passwords across different accounts.
- It completely invalidates precomputed lookup tables and rainbow table attacks.

---

### 4. Registration Algorithm
1. Read the user's name, email, role (`student` or `teacher`), and password.
2. Validate input: ensure all fields are populated and the password contains at least 6 characters.
3. Check that the email address is not already registered.
4. Generate a secure random 16-byte salt using `crypto.getRandomValues(new Uint8Array(16))`.
5. Convert the salt hex string and plaintext password into UTF-8 bytes using `TextEncoder()`.
6. Calculate the cryptographic digest using `crypto.subtle.digest("SHA-256", data)`.
7. Convert the resulting ArrayBuffer digest into a 64-character hexadecimal string.
8. Store the user record `{ id, name, email, role, salt, passwordHash }` in persistent storage (`localStorage`). The raw password is discarded from memory and never stored.

---

### 5. Login Verification Algorithm
1. Read the entered email, password, and designated role.
2. Retrieve the stored account record matching the email; if not found, reject with an authentication error.
3. Extract the stored 16-byte `salt` and expected `passwordHash` from the record.
4. Concatenate the stored salt with the candidate password: `salt + enteredPassword`.
5. Compute the candidate SHA-256 digest using the Web Crypto API.
6. Compare the candidate hash with the stored hash string.
7. If both match, grant authenticated session access based on role (`Student` or `Teacher`); otherwise, reject with `"Invalid password"`.

---

### 6. Simplified Pseudocode

```text
REGISTRATION(name, email, password, role):
    IF length(password) < 6:
        RETURN "Password too short"
    IF USER_EXISTS(email):
        RETURN "Account already exists"
        
    salt = SECURE_RANDOM_BYTES(16).toHex()
    passwordHash = SHA256(salt + password).toHex()
    
    SAVE_USER(id, name, email, role, salt, passwordHash)
    // Never persist the raw password

LOGIN(email, entered_password, role):
    record = LOAD_USER(email)
    IF record does not exist:
        RETURN "User not found"
        
    candidate_hash = SHA256(record.salt + entered_password).toHex()
    
    IF candidate_hash == record.passwordHash:
        SET_ACTIVE_SESSION(record.id, record.role)
        RETURN "Login successful"
    ELSE:
        RETURN "Invalid password"
```

---

### 7. Important JavaScript Web Crypto Functions
- `crypto.getRandomValues(bytes)`: Generates cryptographically secure pseudorandom numbers for salt generation.
- `crypto.subtle.digest("SHA-256", data)`: Asynchronously computes the 256-bit SHA-256 cryptographic hash digest.
- `TextEncoder()`: Encodes UTF-8 strings into binary `Uint8Array` bytes required by the cryptographic engine.
- `localStorage`: Persists salted credentials client-side for sandbox and demonstration environments.

---

### 8. Security Notes and Limitations
- **Educational / Client Demonstration**: Client-side storage (`localStorage`) can be inspected via browser developer tools. In production systems, hashing and credential verification must be executed server-side (Node.js/Express) over TLS/HTTPS.
- **Hash Speed**: Plain SHA-256 allows rapid parallel computation on GPUs. Production enterprise architectures should use Argon2id, bcrypt, or PBKDF2 with high work factors.
- **Public Salt**: The salt is not a secret key, but must remain unique per user to neutralize rainbow tables.
- **Protection Measures**: Recommended production safeguards include account lockout, brute-force rate-limiting, and generic failure messages.

---

### 9. Conclusion
The MERN QuizHub authentication system implements salted SHA-256 hashing. During account creation, a unique 16-byte random salt is generated and the resulting digest is stored rather than the raw password. During login, the candidate password is concatenated with the stored salt, re-hashed, and compared against the recorded hash digest. This satisfies essential cryptographic security principles for password storage and role authorization.
