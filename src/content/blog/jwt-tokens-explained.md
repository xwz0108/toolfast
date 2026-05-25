## What is a JWT?

JWT (JSON Web Token) is a compact, URL-safe way to represent claims. Think of it as a digital passport — small, self-contained, and cryptographically signed.

A JWT has three parts: `header.payload.signature`

### 1. Header
Tells you how the token was signed: `{"alg": "HS256", "typ": "JWT"}`

### 2. Payload
Contains the actual data (claims): `{"userId": 42, "role": "admin"}`

### 3. Signature
Ensures the token was not tampered with. Created by combining header, payload, and a secret.

> Never put sensitive data in the payload. It is only Base64-encoded, not encrypted.

### How Auth Works with JWT
1. User logs in → server creates JWT
2. Client stores JWT
3. Client sends JWT with every request
4. Server verifies signature before processing

[Decode a JWT Now →](/tools/jwt-decoder)
