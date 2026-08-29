# Honey Chain — Testing Strategy & Test Plan

## 1. Testing Objective

The purpose of testing is not just to prove that individual screens work.

The system must prove the central product promise:

> A hive can be monitored, risk can be detected, a honey batch can be traced through its lifecycle, the records can be anchored to blockchain, and a consumer can independently verify the product using a QR code.

---

# 2. Testing Pyramid

```text
                 ┌──────────────┐
                 │   E2E Tests  │
                 └──────┬───────┘
                ┌───────▼────────┐
                │ Integration     │
                └───────┬────────┘
              ┌─────────▼──────────┐
              │ API / Service Tests │
              └─────────┬──────────┘
            ┌────────────▼────────────┐
            │       Unit Tests        │
            └─────────────────────────┘
```

Most tests should be unit/service tests.
A smaller set should be full E2E tests.

---

# 3. Test Environments

## Local

```text
Frontend
Backend
AI service
PostgreSQL
Redis
MQTT
Blockchain local/mock
```

## Staging/Demo

```text
Frontend deployed
Backend deployed
AI deployed
Managed DB
Polygon Amoy
Real QR
Seeded demo data
```

---

# 4. Test Data

Seed:

```text
5 users
2 admins
5 beekeepers
3 collection operators
2 inspectors
2 processors
2 distributors
12 hives
20 sensors
5 batches
10 packages
10 QR codes
```

Create:

### Healthy hive

```text
Temperature: 32°C
Humidity: 60%
Weight: stable
Activity: normal
```

### Warning hive

```text
Temperature: 39°C
Humidity: 74%
Activity: lower than baseline
```

### Critical hive

```text
Temperature: extreme
Weight: sudden drop
Activity: abnormal
```

---

# 5. Unit Testing

## 5.1 Health Score

Test formula.

Input:

```text
temperature = 40
humidity = 70
activity = 60
weight = 65
disease = 45
environment = 80
```

Expected:

```text
54
```

because:

```text
40*.20 +
70*.15 +
60*.20 +
65*.15 +
45*.20 +
80*.10
= 54
```

---

# 6. Health Classification Tests

```text
100 → Healthy
80 → Healthy
79 → Moderate Attention
60 → Moderate Attention
59 → Warning
40 → Warning
39 → Critical
0 → Critical
```

Test boundary values explicitly.

---

# 7. Alert Rule Tests

### Temperature

```text
normal → no alert
high → HIGH_TEMPERATURE
```

### Humidity

```text
normal → no alert
high → HIGH_HUMIDITY
```

### Weight

```text
stable → no alert
abnormal drop → WEIGHT_DROP
```

### Sensor

```text
recent reading → online
2× interval exceeded → sensor offline
```

---

# 8. Batch State Machine Tests

Valid:

```text
CREATED → COLLECTED
COLLECTED → TESTED
TESTED → APPROVED
APPROVED → PROCESSED
PROCESSED → PACKAGED
PACKAGED → DISTRIBUTED
DISTRIBUTED → SOLD
```

Invalid:

```text
CREATED → SOLD
CREATED → PACKAGED
APPROVED → CREATED
PACKAGED → TESTED
```

Expected:

```text
400 BATCH_INVALID_TRANSITION
```

---

# 9. RBAC Tests

## Beekeeper

Allowed:
- create hive
- create batch

Denied:
- submit quality test
- admin analytics
- approve batch

## Inspector

Allowed:
- quality test

Denied:
- create hive
- package batch

## Processor

Allowed:
- process/package

Denied:
- approve quality

## Admin

Allowed:
- platform management

Every role must be tested against every sensitive endpoint.

---

# 10. Authentication Tests

Test:

```text
valid OTP
invalid OTP
expired OTP
already-used OTP
missing OTP
wrong phone
expired JWT
invalid JWT
revoked refresh token
```

Expected behavior must be deterministic.

---

# 11. API Validation Tests

Test:
- missing required fields
- wrong data types
- invalid dates
- negative quantity
- invalid coordinates
- invalid enum
- oversized payload

Example:

```json
{
  "estimated_quantity_kg": -10
}
```

Expected:

```text
400 validation error
```

---

# 12. Sensor Ingestion Tests

Test:

### Valid reading

```text
accepted = true
```

### Duplicate

Same:

```text
sensor_id + timestamp
```

Expected:

```text
accepted = true
duplicate = true
```

but only one database record.

### Invalid device

Expected:

```text
401/403
```

### Invalid value

Expected:

```text
400
```

---

# 13. Offline Sync Tests

Scenario:

```text
Device offline
 ↓
Create 3 sensor readings
 ↓
Store locally
 ↓
Reconnect
 ↓
Sync
```

Verify:
- all 3 reach backend
- timestamps remain original
- no duplicates
- local queue becomes empty

---

# 14. AI Tests

## Model loading

```text
model starts
weights load
inference works
```

## Image validation

Test:
- JPEG
- PNG
- corrupt image
- empty file
- oversized file
- unsupported extension

## Output

Must contain:

```text
category
confidence
recommendation
```

---

# 15. AI Confidence Tests

If:

```text
confidence >= threshold
```

return prediction.

If:

```text
confidence < threshold
```

return:

```text
INCONCLUSIVE
```

Never force a category.

---

# 16. AI Evaluation

Run held-out test set.

Calculate:

```text
accuracy
precision
recall
F1
confusion matrix
```

Also inspect:
- false negatives
- false positives
- class imbalance

Do not only report accuracy.

---

# 17. Yield Prediction Tests

Test:
- enough history
- limited history
- no history

Expected:

```text
enough history → model prediction
limited/no history → rule-based fallback
```

Prediction should include:
- estimated yield
- range
- confidence
- model/fallback indicator

---

# 18. Blockchain Tests

## Smart Contract

Test:
- create batch
- duplicate batch
- add event
- unknown batch
- unauthorized actor
- ownership transfer
- history retrieval
- hash verification

---

# 19. Blockchain Integration Tests

Test:

```text
DB event
 ↓
hash
 ↓
submit
 ↓
tx hash
 ↓
confirmation
 ↓
DB record
```

Failure test:

```text
RPC unavailable
 ↓
blockchain_status = PENDING/FAILED
 ↓
retry
 ↓
confirmed
```

---

# 20. Hash Integrity Test

Create event:

```json
{
  "batch_id": "BATCH-001",
  "event": "COLLECTED",
  "timestamp": "..."
}
```

Calculate hash.

Modify one field.

Verify:

```text
hash_original != hash_modified
```

This is one of the most important traceability tests.

---

# 21. QR Tests

## Valid

```text
correct signature
correct package
```

Expected:

```text
verified = true
```

## Tampered

Modify token.

Expected:

```text
verified = false
```

## Unknown

Random token.

Expected:

```text
verified = false
```

## Revoked

Expected:

```text
verified = false
```

---

# 22. QR Clone/Anomaly Tests

Simulate:

```text
same package
50 scans
multiple suspicious locations/time pattern
```

Expected:

```text
scan_status = CAUTION
```

Do not automatically claim counterfeit. The system should say verification caution.

---

# 23. Consumer Verification E2E Test

Full test:

```text
Create batch
 ↓
Create events
 ↓
Anchor events
 ↓
Package
 ↓
Generate QR
 ↓
Open QR URL
 ↓
Verify token
 ↓
Verify batch
 ↓
Verify hashes
 ↓
Show timeline
```

This is the most important automated E2E test.

---

# 24. Supply Chain E2E

```text
Beekeeper creates batch
 ↓
Collection center collects
 ↓
Inspector tests
 ↓
Inspector approves
 ↓
Processor processes
 ↓
Processor packages
 ↓
Distributor dispatches
 ↓
Consumer verifies
```

At every step verify:
- correct role
- correct status
- event created
- audit log created
- hash generated

---

# 25. Database Tests

Check:
- foreign keys
- unique constraints
- transactions
- cascading behavior
- indexes
- migrations
- seed scripts

Test duplicate:
- phone
- hive code
- batch code
- package serial
- QR
- transaction hash

---

# 26. Security Tests

Run:

```text
Authentication bypass
Authorization bypass
IDOR
SQL injection
XSS
CSRF where applicable
File upload abuse
JWT manipulation
QR brute force
Rate-limit bypass
```

Important IDOR examples:

```text
Beekeeper A requests Beekeeper B's hive
```

Expected:

```text
403
```

---

# 27. Rate Limiting Tests

Test:
- login endpoint
- OTP endpoint
- QR verification
- public API

Expected:

```text
normal requests → allowed
excessive requests → 429
```

---

# 28. Performance Tests

## API

Targets from PRD:

```text
GET p95 < 400ms
WRITE p95 < 800ms
```

## QR

Target:

```text
< 2 seconds end-to-end
```

## Dashboard

Target:

```text
< 3 seconds initial load on 4G
```

Use:
- k6
- Lighthouse
- browser performance tools

---

# 29. Load Test Scenarios

### Scenario A

```text
100 concurrent QR verification requests
```

### Scenario B

```text
100 sensor messages/minute
```

### Scenario C

```text
50 dashboard users
```

### Scenario D

```text
burst of QR scans
```

Verify:
- latency
- error rate
- database load
- cache effectiveness

---

# 30. Frontend Tests

Test:
- routing
- buttons
- forms
- loading states
- error states
- responsive layouts
- authentication redirects
- role-based navigation
- QR page
- offline states

---

# 31. Mobile Tests

At minimum test:

```text
360 × 800
390 × 844
412 × 915
```

Also test:
- low-end Android browser
- slow network
- offline mode
- camera permissions
- image upload

---

# 32. Accessibility Tests

Check:
- keyboard navigation
- focus states
- labels
- contrast
- alt text
- screen reader semantics
- touch target size
- reduced motion

Use Lighthouse and axe where available.

---

# 33. Offline Tests

Simulate:

```text
Internet OFF
Login/session already available
Create harvest
Create batch
Close app
Internet ON
Open app
Sync
```

Verify no data loss.

---

# 34. Error Recovery Tests

## Database temporarily unavailable

Expected:
- friendly error
- no partial business transaction

## Blockchain unavailable

Expected:
- event remains in DB
- blockchain status pending/failed
- retry works

## AI service unavailable

Expected:
```text
AI temporarily unavailable.
You can continue recording the hive event.
```

The whole application must not become unusable.

---

# 35. Demo Reliability Test

Run the complete demo:

```text
10 consecutive times
```

Success requirement:

```text
10/10 completed without blocking failure
```

If one external dependency is unreliable, add a safe fallback.

---

# 36. Pre-Demo Checklist

## Frontend

```text
[ ] No broken routes
[ ] No console errors
[ ] Mobile responsive
[ ] Loading states
[ ] Error states
[ ] Demo data present
```

## Backend

```text
[ ] API healthy
[ ] Database connected
[ ] Redis connected
[ ] RBAC works
[ ] Seed data loaded
```

## AI

```text
[ ] Model loads
[ ] Sample image works
[ ] Confidence displayed
[ ] Inconclusive fallback works
```

## Blockchain

```text
[ ] Contract deployed
[ ] Wallet funded
[ ] RPC works
[ ] Transaction confirmation works
[ ] Verification works
```

## QR

```text
[ ] QR generated
[ ] QR opens correct page
[ ] Valid token verified
[ ] Tampered token rejected
```

---

# 37. Final Golden Test

This must pass before presentation:

```text
1. Login as beekeeper
2. Open Hive H-07
3. Trigger abnormal sensor data
4. Verify Warning/Critical score
5. Verify alert
6. Upload AI image
7. Receive screening result
8. Record harvest
9. Create BATCH-2026-001
10. Show CREATED event
11. Collection center marks COLLECTED
12. Inspector submits test
13. Inspector approves
14. Processor processes
15. Processor packages
16. QR generated
17. Blockchain proof confirmed
18. Consumer opens QR
19. Verification returns TRUE
20. Timeline is displayed
```

---

# 38. Bug Severity

## P0 — Demo blocker

Examples:
- app cannot start
- login broken
- QR verification broken
- batch cannot advance
- blockchain proof impossible
- database corruption

Fix immediately.

## P1 — Major

Examples:
- incorrect health score
- incorrect permissions
- AI result not displayed
- mobile flow broken

Fix before presentation.

## P2 — Medium

Examples:
- chart incorrect
- minor layout issue
- non-critical error message

Fix if time.

## P3 — Cosmetic

Examples:
- spacing
- icon
- animation

Only fix after P0/P1.

---

# 39. Test Automation Priority

Automate first:

```text
1. Authentication
2. RBAC
3. Health score
4. Batch state machine
5. Batch event hashing
6. QR validation
7. Consumer verification
8. Blockchain integration
9. Sensor ingestion
10. AI confidence fallback
```

These protect the core product.

---

# 40. Final Quality Gate

The project is ready for judging only when:

```text
✓ Core flow works
✓ No P0 bugs
✓ No known security bypass
✓ QR tampering rejected
✓ Blockchain proof verified
✓ AI has confidence fallback
✓ Sensor simulator works
✓ Mobile UI works
✓ Demo data is seeded
✓ Complete demo rehearsed
✓ Backup demo path exists
```
