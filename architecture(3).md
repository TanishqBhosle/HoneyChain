# Honey Chain — Architecture Design

## 1. Purpose

This document converts the Honey Chain PRD into an implementation-ready architecture for an SIH hackathon MVP.

The architecture is intentionally **modular, demoable, low-cost, and realistic for a small team working under a short hackathon timeline**. It should demonstrate the complete product story:

> Hive monitoring → AI assistance → Harvest → Batch → Quality → Processing → Packaging → Blockchain proof → QR → Consumer verification.

The PRD defines three user-facing surfaces: a beekeeper mobile PWA, supply-chain web dashboard, and public consumer verification page. It also defines modular backend capabilities for authentication, hive management, batches, traceability, AI, notifications, and IoT ingestion. fileciteturn0file0L727-L739

---

# 2. Architecture Principles

1. **Build the end-to-end demo path first.**
2. **Use a modular monolith for the core backend**, not a complex microservice deployment.
3. Keep AI as a separate Python service because the ML ecosystem is Python-native.
4. Keep blockchain isolated behind a service/interface.
5. Store large data off-chain.
6. Store only cryptographic proofs and small structured information on-chain.
7. Make the consumer verification endpoint public and highly cacheable.
8. Design beekeeper flows for low-end Android phones and poor connectivity.
9. Every state-changing operation must be authorized and auditable.
10. Every important write must be idempotent.
11. Prefer simulated IoT data for the core hackathon demo, while keeping the architecture ready for ESP32/MQTT.
12. Never make AI output look like a certified diagnosis.

---

# 3. High-Level Design (HLD)

## 3.1 System Context

```text
                         ┌─────────────────────────┐
                         │       Consumers         │
                         │   QR Scan / Browser     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │ Public Verification UI  │
                         └────────────┬────────────┘
                                      │
                                      ▼
┌──────────────────┐       ┌─────────────────────────┐
│ Beekeeper PWA    │──────▶│                         │
└──────────────────┘       │       API / Backend     │
                           │                         │
┌──────────────────┐       │ Auth / Hives / Batches  │
│ Supply Chain UI  │──────▶│ Traceability / Alerts   │
└──────────────────┘       │                         │
                           └──────┬──────┬──────┬─────┘
                                  │      │      │
                         ┌────────▼─┐ ┌──▼────┐ ┌▼───────────┐
                         │PostgreSQL│ │ AI    │ │ Blockchain │
                         │+ Timescale│ │Service│ │ Service    │
                         └──────────┘ └───┬───┘ └────┬───────┘
                                          │           │
                                      Object       Polygon
                                      Storage      Testnet
                                          ▲
                                          │
                                   Hive / Bee Images

┌──────────────┐     MQTT      ┌──────────────────┐
│ ESP32/Sensors│──────────────▶│ IoT Ingestion    │
└──────────────┘               │ / Simulator      │
                               └────────┬─────────┘
                                        │
                                        ▼
                                   Sensor Store
```

---

# 4. HLD Components

## 4.1 Frontend Layer

### A. Beekeeper PWA

Purpose:
- Hive monitoring
- Apiary management
- Alerts
- AI image analysis
- Harvest creation
- Batch creation
- Yield prediction

Design:
- Mobile-first
- PWA installable on Android
- Offline-tolerant forms
- Large touch targets
- Minimal text
- English/Hindi/Kannada-ready

### B. Supply Chain Dashboard

Used by:
- Collection Center
- Quality Inspector
- Processor
- Distributor/Retailer

Purpose:
- View active batches
- Receive batches
- Submit quality tests
- Process/package batches
- View traceability timeline

### C. Admin Dashboard

Used by KVIC/platform administrators.

Purpose:
- User approvals
- Regional analytics
- Active hives
- Batch statistics
- Disease alerts
- QR verification volume

### D. Consumer Verification Page

Public page:
- No login
- Opened by QR
- Shows authenticity result
- Shows product origin
- Shows harvest date
- Shows quality status
- Shows supply-chain timeline
- Shows blockchain verification proof in understandable language

---

# 5. Backend HLD

## 5.1 Recommended Hackathon Architecture

Use a **modular monolith** for the main API:

```text
services/api/
├── auth
├── users
├── apiaries
├── hives
├── sensors
├── health
├── alerts
├── batches
├── quality
├── packages
├── qr
├── traceability
├── dashboard
└── audit
```

This gives the team the logical separation of microservices without the deployment and networking complexity of actual microservices.

The PRD originally describes modular application services aligned with feature modules so they can be built independently. fileciteturn0file0L729-L735

---

# 6. Backend Responsibilities

## Authentication Module

Responsibilities:
- Registration
- OTP verification
- JWT creation
- Refresh tokens
- Role management
- Session handling

Roles:

```text
ADMIN
BEEKEEPER
COLLECTION_CENTER
QUALITY_INSPECTOR
PROCESSOR
DISTRIBUTOR
RETAILER
CONSUMER
```

Consumer does not require an authenticated account for QR verification.

## Apiary Module

Responsibilities:
- Create apiary
- Update apiary
- GPS information
- List hives

## Hive Module

Responsibilities:
- Register hive
- View hive
- Manage hive status
- Link sensors
- Retrieve current health state

## Sensor Module

Responsibilities:
- Receive sensor readings
- Validate readings
- Deduplicate readings
- Store time-series data
- Detect sensor offline condition

## Health Module

Responsibilities:
- Calculate health score
- Calculate component scores
- Trigger alerts
- Store historical health records

The PRD defines a configurable weighted health score using temperature, humidity, activity, weight, disease risk, and environmental score. fileciteturn0file0L389-L425

## AI Module

Responsibilities:
- Image upload
- Image preprocessing
- Disease screening
- Confidence calculation
- Recommendation generation
- Yield prediction

## Batch Module

Responsibilities:
- Create batch
- Validate status transition
- Store batch events
- Maintain lifecycle

Lifecycle:

```text
CREATED
   ↓
COLLECTED
   ↓
TESTED
   ↓
APPROVED
   ↓
PROCESSED
   ↓
PACKAGED
   ↓
DISTRIBUTED
   ↓
SOLD
```

## Traceability Module

Responsibilities:
- Create canonical event payload
- Hash payload
- Send hash to blockchain service
- Store transaction information
- Verify hash
- Build consumer timeline

## QR Module

Responsibilities:
- Generate package serial
- Generate signed QR token
- Validate token
- Detect suspicious scan patterns
- Count scans

## Notification Module

MVP:
- In-app alerts
- Browser/mobile push where practical

Future:
- SMS

---

# 7. Blockchain HLD

The blockchain layer is a **proof layer**, not the primary database.

```text
Application Event
      ↓
Canonical JSON
      ↓
SHA-256 / Keccak-256 Hash
      ↓
Blockchain Service
      ↓
HoneyTraceability.sol
      ↓
Polygon Amoy
      ↓
Transaction Hash
      ↓
PostgreSQL BlockchainRecord
```

The PRD explicitly recommends Polygon testnet/Amoy and storing hashes rather than images, personal information, or bulk sensor data. fileciteturn0file0L441-L467

---

# 8. IoT HLD

```text
DHT22 / DS18B20 ─┐
HX711 Load Cell ─┤
Microphone ──────┤
GPS ─────────────┤
                 ▼
              ESP32
                 │
          Local Buffer
                 │
              MQTT
                 │
                 ▼
          MQTT Broker
                 │
                 ▼
          IoT Ingestion
                 │
          Validation/Dedup
                 │
                 ▼
      TimescaleDB Sensor Data
                 │
                 ▼
        Health Score Engine
                 │
          ┌──────┴──────┐
          ▼             ▼
      Dashboard       Alerts
```

For the hackathon:
- Build a simulator first.
- Add live ESP32 only after the simulator path is stable.
- Simulator should produce realistic sensor fluctuations and abnormal events.

The PRD specifies 15-minute core sensor readings and local buffering during connectivity loss. fileciteturn0file0L361-L371

---

# 9. AI HLD

## Disease Detection

```text
Mobile Camera
     ↓
Image Upload
     ↓
Object Storage
     ↓
AI Service
     ↓
Resize / Normalize
     ↓
MobileNetV3
     ↓
Class Probabilities
     ↓
Confidence Threshold
     ↓
Recommendation
     ↓
Database
     ↓
Frontend
```

Classes for MVP:

```text
healthy
possible_varroa
possible_foulbrood
possible_wax_moth
general_stress
inconclusive
```

If confidence is below the configured threshold, return `inconclusive`.

The PRD explicitly requires preliminary screening language and an inconclusive fallback instead of presenting AI output as a diagnosis. fileciteturn0file0L373-L387

## Yield Prediction

```text
Historical Yield
Sensor Features
Health Trend
Season
Hive Data
     ↓
Feature Engineering
     ↓
Regression Model
     ↓
Predicted Yield
     +
Confidence Range
     ↓
Recommendation
```

Fallback:
- Previous season yield
- Seasonal adjustment
- Current health factor

---

# 10. Low-Level Design (LLD)

## 10.1 Backend Request Flow

Example: Register Hive

```text
POST /hives
   ↓
Auth Middleware
   ↓
JWT Validation
   ↓
RBAC Guard
   ↓
Hive Controller
   ↓
Request DTO Validation
   ↓
Hive Service
   ↓
Check Apiary Ownership
   ↓
Generate Hive ID
   ↓
Database Transaction
   ↓
Create Audit Log
   ↓
Return Response
```

## 10.2 Batch Status Transition

```text
PATCH /batches/:id/status
        ↓
JWT
        ↓
Role Guard
        ↓
Load Batch
        ↓
Validate Current Status
        ↓
Validate Allowed Next Status
        ↓
Validate Actor Permission
        ↓
Create Canonical Event
        ↓
Create DB BatchEvent
        ↓
Calculate Event Hash
        ↓
Blockchain Queue
        ↓
Store BlockchainRecord
        ↓
Commit Transaction
```

Important:
- Database event must be idempotent.
- Blockchain failure must not destroy the business transaction.
- Use a pending blockchain state and retry.
- Consumer verification must clearly indicate when blockchain anchoring is pending.

---

# 11. Batch State Machine

Allowed transitions:

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
CREATED → PROCESSED
CREATED → SOLD
TESTED → CREATED
PACKAGED → COLLECTED
```

Each transition should have:
- actor
- timestamp
- notes
- previous status
- new status
- event ID
- event hash
- blockchain transaction state

---

# 12. Health Score LLD

Normalize every component to 0–100.

```text
temperature_score
humidity_score
activity_score
weight_score
disease_risk_score
environment_score
```

Formula:

```text
health_score =
  temperature_score * 0.20 +
  humidity_score    * 0.15 +
  activity_score    * 0.20 +
  weight_score      * 0.15 +
  disease_risk      * 0.20 +
  environment_score * 0.10
```

Classification:

```text
80–100  Healthy
60–79   Moderate Attention
40–59   Warning
0–39    Critical
```

Store both:
- final score
- component scores

This makes the result explainable.

---

# 13. Alert Engine LLD

Input:
- Latest sensor reading
- Previous readings
- Health score
- AI detection

Rules:

```text
temperature > configured_high_threshold
    → HIGH_TEMPERATURE

humidity > configured_high_threshold
    → HIGH_HUMIDITY

weight drops abnormally
    → WEIGHT_DROP

activity deviates from baseline
    → ABNORMAL_ACTIVITY

AI confidence >= configured threshold
    AND category indicates disease
    → POSSIBLE_DISEASE

now - last_sensor_reading > 2 × expected_interval
    → SENSOR_OFFLINE
```

Alerts should have:

```text
id
hive_id
type
severity
message
recommendation
created_at
resolved_at
```

---

# 14. QR Verification LLD

QR should not expose sequential identifiers directly.

Conceptually:

```text
package_id
    +
random_nonce
    +
expiry/version if required
    ↓
HMAC(secret, canonical_payload)
    ↓
signed_token
    ↓
QR URL
```

Verification:

```text
QR
 ↓
Extract Token
 ↓
Validate Signature
 ↓
Find Package
 ↓
Find Batch
 ↓
Load Batch Events
 ↓
Verify Stored Event Hashes
 ↓
Read Blockchain Proof
 ↓
Run Scan Anomaly Check
 ↓
Return Verification Response
```

The PRD specifically calls for signed tokens and unique package serials to mitigate QR cloning. fileciteturn0file0L469-L495

---

# 15. Offline-First LLD

For beekeeper forms:

```text
User fills form
      ↓
Local IndexedDB
      ↓
UI shows "Saved offline"
      ↓
Connectivity restored
      ↓
Sync Queue
      ↓
API
      ↓
Idempotency Key
      ↓
Server
      ↓
Mark local item synced
```

Do not require the user to manually repeat the form after connectivity returns.

---

# 16. Recommended Folder Structure

```text
honey-chain/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── (public)/
│   │   │   │   └── verify/[token]/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── batches/
│   │   │   │   ├── quality/
│   │   │   │   └── processing/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── public/
│   │
│   ├── beekeeper-mobile/
│   │   ├── app/
│   │   ├── components/
│   │   ├── offline/
│   │   ├── hooks/
│   │   └── lib/
│   │
│   └── admin-dashboard/
│       ├── app/
│       ├── components/
│       └── lib/
│
├── services/
│   ├── api/
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── apiaries/
│   │   │   │   ├── hives/
│   │   │   │   ├── sensors/
│   │   │   │   ├── health/
│   │   │   │   ├── alerts/
│   │   │   │   ├── batches/
│   │   │   │   ├── quality/
│   │   │   │   ├── packages/
│   │   │   │   ├── qr/
│   │   │   │   ├── traceability/
│   │   │   │   ├── dashboards/
│   │   │   │   └── audit/
│   │   │   ├── common/
│   │   │   ├── config/
│   │   │   └── main.ts
│   │   └── test/
│   │
│   ├── ai-service/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── models/
│   │   │   ├── inference/
│   │   │   ├── preprocessing/
│   │   │   ├── training/
│   │   │   └── schemas/
│   │   ├── tests/
│   │   └── models/
│   │
│   ├── iot-service/
│   │   ├── src/
│   │   │   ├── mqtt/
│   │   │   ├── ingestion/
│   │   │   ├── validation/
│   │   │   └── simulator/
│   │   └── tests/
│   │
│   └── blockchain-service/
│       ├── src/
│       │   ├── contract/
│       │   ├── wallet/
│       │   ├── hashing/
│       │   └── verification/
│       └── test/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   └── config/
│
├── contracts/
│   ├── HoneyTraceability.sol
│   ├── deploy/
│   └── test/
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema/
│
├── infrastructure/
│   ├── docker/
│   ├── compose/
│   └── deployment/
│
├── simulator/
│   └── sensor-data/
│
├── docs/
│   ├── PRD.md
│   ├── architecture.md
│   ├── database.md
│   ├── rules.md
│   ├── phase.md
│   ├── design.md
│   └── testing.md
│
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 17. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Web | Next.js + React | Web UI |
| Styling | Tailwind CSS | Responsive UI |
| Components | shadcn/ui | Reusable accessible components |
| PWA | Next PWA/service worker approach | Installable beekeeper experience |
| Core API | NestJS + TypeScript | REST API |
| AI API | FastAPI + Python | ML inference |
| ORM | Prisma or TypeORM | Database access |
| Database | PostgreSQL | Core relational data |
| Time-series | TimescaleDB extension | Sensor readings |
| Cache | Redis | QR/public-read caching and rate limiting |
| Object Storage | S3-compatible storage | Images/documents |
| MQTT | Mosquitto | IoT messaging |
| IoT | ESP32 | Hardware demo |
| AI | PyTorch + MobileNetV3 | Disease screening |
| ML | scikit-learn | Yield prediction |
| Blockchain | Polygon Amoy | Proof anchoring |
| Smart Contract | Solidity | Traceability contract |
| Blockchain tooling | Hardhat + ethers | Contract deployment/integration |
| QR | qrcode library | QR generation |
| Auth | JWT + OTP provider/mock | Authentication |
| Testing | Vitest/Jest + Playwright + Pytest | Automated tests |
| Containers | Docker Compose | Local deployment |

---

# 18. Hackathon Deployment

Keep deployment simple:

```text
Vercel
  ├── Web
  └── Consumer Verification

Cloud/VPS
  ├── NestJS API
  ├── FastAPI
  ├── IoT service
  └── Redis

Managed PostgreSQL/TimescaleDB
Object Storage
MQTT Broker
Polygon RPC
```

Do not introduce Kubernetes during the hackathon.

---

# 19. Critical Demo Architecture

The judges should be able to see one continuous flow:

```text
Hive H-07
  ↓
Sensor abnormality
  ↓
Health score becomes Warning
  ↓
Alert appears
  ↓
AI image screening
  ↓
Harvest
  ↓
Batch created
  ↓
Blockchain event
  ↓
Quality approved
  ↓
Processed
  ↓
Packaged
  ↓
Signed QR generated
  ↓
Consumer scans
  ↓
Verified authenticity
  ↓
Full journey displayed
```

This flow should be treated as the project's **golden path**.
