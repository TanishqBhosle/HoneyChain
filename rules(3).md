# Honey Chain — Engineering Rules & Development Standards

## 1. Purpose

These rules keep the Honey Chain codebase consistent, secure, explainable and hackathon-friendly.

The primary goal is **not to build the most complicated architecture**. The goal is to build a convincing, reliable, end-to-end product that can be demonstrated live.

---

# 2. Golden Rules

1. **Working end-to-end flow beats isolated advanced features.**
2. Never add technology only because it sounds impressive.
3. Never put personal data on-chain.
4. Never treat AI output as a medical/veterinary diagnosis.
5. Never bypass RBAC on write endpoints.
6. Never trust data coming from IoT devices.
7. Never trust QR input.
8. Never make blockchain a single point of failure for normal application operation.
9. Every important write must be idempotent.
10. Every important state transition must be auditable.
11. Prefer simple code that the whole team can understand.
12. Use environment variables for secrets.
13. Do not commit API keys, wallet keys or credentials.
14. Test the golden demo path after every major change.

---

# 3. Architecture Rules

## Use

- Modular monolith for core API
- Separate FastAPI AI service
- Separate blockchain integration layer
- PostgreSQL
- TimescaleDB
- Redis where useful
- Object storage
- Docker Compose locally

## Avoid

- Kubernetes for the hackathon
- Complex microservice orchestration
- Kafka unless genuinely required
- Custom blockchain
- Mainnet transactions
- Large on-chain payloads
- Multiple databases serving the same entity without a strong reason

---

# 4. Frontend Rules

## Use

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query where appropriate
- PWA/service worker support
- IndexedDB for offline forms

## UI Rules

- Mobile-first
- Large buttons
- Minimum touch target around 44px
- Clear icons
- Strong status indicators
- Avoid long forms
- Avoid technical blockchain terminology
- Show actionable recommendations
- Use skeleton loading states
- Use empty states
- Use clear error messages

---

# 5. Beekeeper UX Rules

Do not show:

```text
Blockchain transaction hash: 0x...
```

as the main message.

Show:

```text
✓ Journey securely verified
```

Technical proof can appear under:

```text
Verification details
```

Similarly, do not show:

```text
Model logits
confidence vector
```

Show:

```text
Possible health issue detected
Confidence: 78%
Recommended action: Inspect brood frames.
```

---

# 6. Backend Rules

## Use

- TypeScript
- NestJS
- DTO validation
- Service/repository separation
- Dependency injection
- Structured logging
- Request IDs
- Central exception handling
- RBAC guards
- Database transactions

## Every endpoint must define

```text
Authentication
Authorization
Input validation
Business validation
Expected response
Possible errors
```

---

# 7. API Rules

Use versioned APIs:

```text
/api/v1/...
```

Use nouns:

```text
/hives
/batches
/alerts
```

Avoid RPC-style endpoints where REST semantics are sufficient.

For state changes:

```text
PATCH /batches/:id/status
```

is acceptable because status is a resource property.

---

# 8. Validation Rules

Validate on the server even if the frontend validates.

Examples:

```text
temperature must be within physically plausible range
humidity must be 0–100
weight must not be negative
confidence must be 0–1
moisture percentage must be 0–100
coordinates must be valid
batch status transition must be allowed
```

Never rely on frontend validation for security.

---

# 9. Authentication Rules

Use:
- OTP verification
- short-lived JWT access token
- refresh token
- hashed refresh token storage

Never:
- log OTP
- store OTP in plain text longer than necessary
- put JWT secrets in source code
- put private wallet keys in frontend code

---

# 10. Authorization Rules

RBAC must be enforced at the backend.

Example:

```text
BEEKEEPER
  can create hive
  can create batch

QUALITY_INSPECTOR
  can submit quality test

PROCESSOR
  can process/package

DISTRIBUTOR
  can distribute

ADMIN
  can manage platform
```

Do not hide a button and assume that provides security.

---

# 11. Batch Rules

Batch lifecycle is a state machine.

Allowed:

```text
CREATED
→ COLLECTED
→ TESTED
→ APPROVED
→ PROCESSED
→ PACKAGED
→ DISTRIBUTED
→ SOLD
```

Never allow arbitrary status changes.

Every transition creates:
- BatchEvent
- hash
- audit record
- blockchain operation

---

# 12. Idempotency Rules

Use idempotency keys for:
- Batch events
- Sensor batch uploads
- Blockchain submissions
- QR generation where appropriate

If the same request arrives twice:

```text
First request → creates record
Second request → returns existing result
```

It must not create duplicate business events.

---

# 13. Blockchain Rules

## Store on-chain

- Event hash
- Small identifiers
- Timestamp/proof
- Ownership/custody proof

## Keep off-chain

- Personal information
- Phone numbers
- Emails
- Images
- Sensor datasets
- Quality documents
- Full event payloads

The PRD explicitly defines this off-chain/on-chain split. fileciteturn0file0L441-L449

---

# 14. Blockchain Failure Rule

Never make:

```text
Blockchain unavailable
```

equal to:

```text
Batch data lost
```

Correct approach:

```text
DB event → blockchain_status=PENDING
       ↓
background retry
       ↓
CONFIRMED
```

If blockchain permanently fails:

```text
FAILED
```

and admin can retry.

---

# 15. Smart Contract Rules

Contract should remain small.

Must support:
- create batch
- append event hash
- ownership transfer if used
- read history
- verification

Do not put:
- images
- large JSON
- user profiles
- sensor readings

on-chain.

---

# 16. QR Rules

QR tokens must be:
- signed
- non-guessable
- package-specific

Do not generate:

```text
/verify/1
/verify/2
/verify/3
```

Instead use a signed token.

Track:
- scan count
- timestamps
- package serial
- approximate anomaly indicators if available

Never expose secrets in QR payload.

---

# 17. AI Rules

AI output must always be described as:

```text
screening
possible indicator
recommendation
```

Never:

```text
confirmed disease
medical diagnosis
guaranteed result
```

Low confidence:

```text
INCONCLUSIVE
```

The PRD requires this behavior. fileciteturn0file0L383-L387

---

# 18. AI Dataset Rules

Use:
- public datasets with appropriate licensing
- clearly documented sources
- curated hackathon samples
- train/validation/test separation

Avoid:
- leaking test images into training
- evaluating on training data
- claiming production accuracy from tiny datasets
- mixing labels without documentation

Record:
- dataset version
- model version
- training date
- class mapping
- evaluation metrics

---

# 19. AI Image Upload Rules

Accept only:
- JPEG
- PNG
- WebP if supported

Enforce:
- file-size limit
- image dimension limit
- MIME validation
- extension validation
- image decoding validation

Never execute uploaded files.

---

# 20. IoT Rules

Treat sensor data as untrusted.

Validate:
- device identity
- device authorization
- timestamp
- value range
- sensor type
- hive association

Use MQTT QoS 1 for MVP where appropriate.

Deduplicate using:

```text
sensor_id + timestamp
```

The PRD recommends QoS 1 and backend deduplication. fileciteturn0file0L1229-L1235

---

# 21. IoT Simulator Rules

The simulator must support:

### Normal mode

```text
temperature: stable
humidity: stable
weight: gradual increase/decrease
activity: normal
```

### Abnormal mode

```text
temperature spike
humidity spike
weight drop
activity drop
sensor offline
```

This makes the hackathon demo controllable.

---

# 22. Health Score Rules

Keep health scoring explainable.

Always show:

```text
Overall: 54
Temperature: 40
Humidity: 70
Activity: 60
Weight: 65
Disease risk: 45
Environment: 80
```

Do not hide the components behind an unexplained AI score.

---

# 23. Database Rules

Use:
- UUIDs internally
- timestamps in UTC
- foreign keys
- transactions
- indexes for common filters
- migrations
- seed scripts

Do not:
- modify production schema manually
- use untracked SQL changes
- store passwords/OTP secrets in plaintext
- expose internal database IDs unnecessarily

---

# 24. Time Rules

Store timestamps in UTC:

```text
2026-08-29T09:15:00Z
```

Convert to local time only in the UI.

---

# 25. Logging Rules

Use structured logs:

```json
{
  "level": "error",
  "request_id": "req_123",
  "service": "api",
  "event": "blockchain_submission_failed"
}
```

Never log:
- OTP
- access token
- refresh token
- private key
- raw personal data unnecessarily

---

# 26. Error Handling

Use stable error codes:

```text
AUTH_INVALID_OTP
AUTH_EXPIRED_TOKEN
FORBIDDEN_ROLE
HIVE_NOT_FOUND
SENSOR_INVALID_READING
BATCH_NOT_FOUND
BATCH_INVALID_TRANSITION
QR_INVALID_SIGNATURE
QR_REVOKED
AI_LOW_CONFIDENCE
BLOCKCHAIN_PENDING
BLOCKCHAIN_FAILED
FILE_TOO_LARGE
```

User-facing errors should be simple.

Bad:

```text
Prisma P2002 unique constraint violation
```

Good:

```text
This hive ID is already registered.
```

---

# 27. Retry Rules

Retry only transient failures.

Retry:
- blockchain RPC timeout
- temporary database connection issue
- MQTT transient connection issue
- object storage temporary failure

Do not blindly retry:
- invalid user input
- invalid role
- invalid batch transition
- invalid QR signature

Use exponential backoff.

---

# 28. Dependencies

## Frontend

```text
next
react
typescript
tailwindcss
shadcn/ui
zod
react-hook-form
@tanstack/react-query
qrcode
```

## Backend

```text
@nestjs/common
@nestjs/config
@nestjs/jwt
class-validator
class-transformer
Prisma or TypeORM
bcrypt/argon2 where password hashing is needed
Redis client
```

## AI

```text
fastapi
uvicorn
pydantic
torch
torchvision
pillow
scikit-learn
numpy
pandas
```

## Blockchain

```text
hardhat
ethers
solidity
OpenZeppelin Contracts
```

## Testing

```text
Jest/Vitest
Supertest
Playwright
Pytest
```

Exact versions should be pinned in lockfiles.

---

# 29. Dependency Rules

Before adding a package ask:

1. Do we really need it?
2. Can the existing stack solve it?
3. Is it maintained?
4. Is it compatible with the project license?
5. Does it add unnecessary bundle size?
6. Does it increase security risk?

Avoid dependency bloat.

---

# 30. Git Rules

Branch naming:

```text
feature/hive-dashboard
feature/blockchain-traceability
feature/ai-detection
fix/qr-verification
chore/database-seed
```

Commit examples:

```text
feat: add hive health scoring
feat: implement batch lifecycle
fix: prevent duplicate batch events
test: add qr verification cases
```

Do not commit:
- `.env`
- wallet private keys
- API keys
- large datasets
- model secrets

---

# 31. Environment Variables

Use:

```text
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
OTP_PROVIDER_KEY=
S3_ENDPOINT=
S3_ACCESS_KEY=
S3_SECRET_KEY=
BLOCKCHAIN_RPC_URL=
BLOCKCHAIN_PRIVATE_KEY=
CONTRACT_ADDRESS=
QR_SIGNING_SECRET=
```

Only `.env.example` goes into Git.

---

# 32. What to Avoid During SIH

Avoid spending major time on:

- marketplace
- payments
- SMS production integration
- satellite mapping
- complex acoustic AI
- multi-state government integration
- insurance scoring
- Kubernetes
- custom blockchain
- advanced MLOps platform

These are explicitly outside or beyond the MVP direction in the PRD. fileciteturn0file0L85-L99

---

# 33. Definition of Done

A feature is done only when:

```text
Code implemented
+
Validation added
+
Error handling added
+
Authorization checked
+
Tests added
+
UI connected
+
Demo data works
+
No console/runtime errors
```

---

# 34. Final Hackathon Rule

If the team has limited time, prioritize:

```text
1. Consumer QR verification
2. Batch traceability
3. Blockchain proof
4. Beekeeper hive dashboard
5. IoT simulation
6. Health score + alerts
7. AI screening
8. Supply-chain dashboard
9. Admin analytics
10. Nice-to-have features
```

A reliable complete product is better than ten half-built modules.
