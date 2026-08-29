# Honey Chain — SIH Hackathon Implementation Phases

## 1. Objective

This plan is designed for a short SIH hackathon build and follows the PRD's four-day roadmap while making the execution more practical for a team.

The PRD proposes:
- Day 1: foundation
- Day 2: core features
- Day 3: traceability
- Day 4: polish and demo. fileciteturn0file0L1555-L1589

The most important rule is:

> Build the complete golden path early, then improve each module.

---

# 2. Team Structure

Recommended team split:

## Team A — Frontend

Own:
- Beekeeper PWA
- Supply-chain UI
- Consumer verification
- Admin dashboard

## Team B — Backend

Own:
- Auth
- Hives
- Batches
- APIs
- RBAC
- Alerts
- Database

## Team C — AI + IoT

Own:
- Sensor simulator
- Health scoring
- AI disease detection
- Yield prediction
- FastAPI AI service

## Team D — Blockchain + Integration

Own:
- Smart contract
- Polygon deployment
- Hashing
- QR signing
- End-to-end integration
- Deployment

If fewer people are available, combine Team C and D.

---

# 3. Phase 0 — Pre-Hackathon Preparation

## Goal

Remove setup risk before coding.

### Tasks

- Create Git repository
- Create monorepo
- Create `.env.example`
- Decide deployment targets
- Create database
- Create Polygon test wallet
- Get Polygon Amoy RPC
- Prepare sample dataset
- Prepare demo images
- Prepare seed users
- Prepare sample honey batches
- Create Figma/wireframes
- Prepare demo script

### Output

```text
Repository works
Frontend starts
Backend starts
Database starts
AI service starts
Blockchain wallet works
```

---

# 4. Phase 1 — Foundation

## Day 1 — First Block

### Backend

Build:
- NestJS application
- PostgreSQL connection
- Migrations
- User model
- Role enum
- JWT
- OTP mock/provider abstraction
- RBAC middleware

### Frontend

Build:
- App shell
- Routing
- Design tokens
- Mobile navigation
- Login
- Dashboard shell

### Database

Create:
- users
- beekeepers
- apiaries
- hives
- sensors

### DevOps

Create:

```text
docker-compose.yml
```

with:
- PostgreSQL
- Redis
- MQTT broker

---

# 5. Phase 1 Acceptance

Before continuing:

```text
User can login
User receives JWT
Role is recognized
Beekeeper can create apiary
Beekeeper can create hive
Hive appears in dashboard
```

Do not move forward if authentication/RBAC is unstable.

---

# 6. Phase 2 — Hive Monitoring

## Day 1 Evening / Day 2 Morning

Build:

### Sensor simulator

Generate:
- temperature
- humidity
- weight
- activity

Example:

```json
{
  "hive_id": "HIVE-021",
  "timestamp": "...",
  "temperature": 31.2,
  "humidity": 68,
  "weight": 42.4,
  "activity": 81
}
```

### Health engine

Implement weighted score.

### Alerts

Implement:
- high temperature
- high humidity
- weight drop
- abnormal activity
- sensor offline

### Dashboard

Show:
- total hives
- healthy
- warning
- critical
- current sensor values
- active alerts

---

# 7. Phase 2 Acceptance

Demo:

```text
Normal Hive
   ↓
Turn simulator to abnormal
   ↓
Health score decreases
   ↓
Alert appears
   ↓
Beekeeper sees recommended action
```

This must work without physical hardware.

---

# 8. Phase 3 — AI Disease Screening

## Day 2

Build FastAPI service.

### Step 1

Load pretrained MobileNetV3.

### Step 2

Prepare small dataset.

### Step 3

Train/fine-tune.

### Step 4

Evaluate.

### Step 5

Expose:

```text
POST /predict
```

### Step 6

Connect frontend image upload.

### Step 7

Show:

```text
Possible indicator
Confidence
Recommendation
```

### Step 8

Implement:

```text
confidence < threshold
→ INCONCLUSIVE
```

---

# 9. Phase 3 Acceptance

Demo:

```text
Upload image
 ↓
AI processing
 ↓
Category
 ↓
Confidence
 ↓
Recommendation
```

Do not spend hours chasing perfect model accuracy if the integration is not working.

---

# 10. Phase 4 — Honey Batch

## Day 2 Evening

Build:

### Harvest form

Fields:
- harvest date
- honey type
- quantity
- apiary
- hives

### Batch creation

Generate:

```text
BATCH-2026-001
```

### Status machine

Implement:

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

---

# 11. Phase 4 Acceptance

Beekeeper can:

```text
Harvest
 ↓
Create Batch
 ↓
View Batch Timeline
```

Supply-chain user can advance only the allowed lifecycle stage.

---

# 12. Phase 5 — Blockchain

## Day 3 Morning

### Step 1

Write Solidity contract.

### Step 2

Deploy to Polygon Amoy.

### Step 3

Implement hashing.

Canonical payload example:

```json
{
  "batch_id": "BATCH-2026-001",
  "event": "COLLECTED",
  "actor_id": "USER-01",
  "timestamp": "2026-08-29T10:30:00Z"
}
```

Hash:

```text
keccak256(canonical_payload)
```

### Step 4

Write hash to contract.

### Step 5

Store tx hash in PostgreSQL.

### Step 6

Implement read/verify.

---

# 13. Blockchain Acceptance

Live demo must show:

```text
Batch Event
 ↓
Hash
 ↓
Transaction submitted
 ↓
Transaction confirmed
 ↓
Verification succeeds
```

Have a fallback seeded transaction if the public RPC is temporarily unavailable.

---

# 14. Phase 6 — QR Verification

## Day 3

Build:

```text
Package
 ↓
Unique serial
 ↓
Signed token
 ↓
QR
```

Consumer:

```text
Scan
 ↓
Token validation
 ↓
Batch lookup
 ↓
Event verification
 ↓
Blockchain verification
 ↓
Timeline
```

---

# 15. QR Acceptance

Test:

```text
Valid QR → Verified
Modified QR → Invalid
Unknown token → Invalid
Revoked QR → Invalid
```

---

# 16. Phase 7 — Supply Chain Dashboard

## Day 3 Afternoon

Build views for:

### Collection Center

```text
Incoming batches
Receive
Confirm quantity
```

### Quality Inspector

```text
Pending tests
Submit test
Approve/reject
```

### Processor

```text
Approved batches
Process
Package
Generate QR
```

### Distributor

```text
Packaged batches
Dispatch
```

---

# 17. Phase 8 — Consumer Experience

## Day 3 Evening

Make this the strongest visual screen.

Show:

```text
✓ VERIFIED AUTHENTIC HONEY

Multifloral Honey

Origin
Coorg, Karnataka

Harvested
12 August 2026

Journey

🐝 Harvested
  ↓
🧪 Quality Tested
  ↓
🏭 Processed
  ↓
📦 Packaged
  ↓
🚚 Distributed
```

Then:

```text
Secure verification
Blockchain proof confirmed
```

Keep technical details secondary.

---

# 18. Phase 9 — Admin Dashboard

## Day 4 Morning

Show:

```text
Registered Beekeepers
Registered Hives
Active Batches
Verified QR Scans
Disease Alerts
Regional Distribution
```

Charts:
- hives by health
- batches by status
- QR scans over time
- alerts by type
- regional participation

---

# 19. Phase 10 — Offline Support

If time permits:

Implement local storage for:

- apiary creation
- hive notes
- harvest
- batch creation

Sync:

```text
offline
 ↓
local queue
 ↓
internet restored
 ↓
sync
 ↓
server
```

This is valuable because the PRD explicitly considers intermittent rural connectivity. fileciteturn0file0L1419-L1435

---

# 20. Phase 11 — Real ESP32

Only after simulator is stable.

Connect:

```text
DHT22
HX711
ESP32
MQTT
```

Demo:
- live temperature
- humidity
- weight

If hardware fails during judging, immediately switch to simulator.

---

# 21. Phase 12 — Testing

## Day 4

Run:

```text
Unit tests
Integration tests
API tests
E2E tests
AI tests
Blockchain tests
QR security tests
Performance tests
Mobile responsiveness tests
```

Fix:
- crashes
- broken routes
- loading issues
- authorization bugs
- bad error messages
- visual inconsistencies

---

# 22. Phase 13 — Demo Data

Seed:

```text
5 Beekeepers
3 Apiaries
12 Hives
8 Sensors
5 Batches
Multiple lifecycle events
3 Quality tests
5 Packages
5 QR codes
Alerts
AI detections
Predictions
```

Have at least one intentionally unhealthy hive.

---

# 23. Phase 14 — Demo Rehearsal

Run the exact presentation 5–10 times.

Script:

### Scene 1

Login as beekeeper.

### Scene 2

Show:

```text
12 Active Hives
10 Healthy
1 Warning
1 Critical
```

### Scene 3

Trigger abnormal sensor.

### Scene 4

Show alert.

### Scene 5

Upload hive image.

### Scene 6

Show AI recommendation.

### Scene 7

Harvest honey.

### Scene 8

Create batch.

### Scene 9

Show blockchain transaction.

### Scene 10

Quality approval.

### Scene 11

Processing.

### Scene 12

Packaging.

### Scene 13

Generate QR.

### Scene 14

Scan QR.

### Scene 15

Consumer sees:

```text
✓ Verified Authentic Honey
```

This follows the PRD's intended demo scenario. fileciteturn0file0L1303-L1351

---

# 24. Priority Matrix

## P0 — Must Work

```text
Authentication
Hive registration
Sensor simulator
Health score
Alerts
Batch creation
Batch lifecycle
Blockchain hashing
QR generation
Consumer verification
```

## P1 — Strongly Recommended

```text
AI disease screening
Quality testing
Supply-chain dashboard
Admin dashboard
```

## P2 — If Time Remains

```text
Yield prediction
Push notifications
Offline sync
Live ESP32
```

## P3 — Do Not Risk Core Demo For

```text
SMS
Marketplace
Satellite data
Acoustic AI
Insurance
Advanced analytics
```

---

# 25. Emergency Cut Plan

If only 6 hours remain:

Remove:
- real ESP32
- yield prediction
- admin advanced charts
- multilingual completion
- push notifications

Keep:

```text
Hive
→ Sensor simulator
→ Health
→ Alert
→ Batch
→ Blockchain
→ QR
→ Consumer verification
```

---

# 26. Final 2-Hour Freeze

No new features.

Only:

```text
Bug fixes
Demo data
UI polish
Performance
Testing
Presentation
```

Freeze database schema.

Freeze API contracts.

Freeze smart contract.

Freeze model.

---

# 27. Final Deliverables

The repository should contain:

```text
Working web app
Working beekeeper PWA
Working backend
Working AI service
Working blockchain contract
Working QR verification
Database migrations
Seed data
Docker setup
Tests
Documentation
Demo video/screenshots
Presentation
```

---

# 28. Definition of Hackathon Success

Success means a judge can understand this story in a few minutes:

> "We can monitor a hive, identify risk, record a harvest, prove the batch journey using blockchain, generate a secure QR, and let a consumer verify the honey's story."

Everything else supports that story.
