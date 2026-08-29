# Honey Chain — Database, Evaluation Metrics & API Design

## 1. Database Strategy

Honey Chain has three data categories:

1. **Transactional data** — users, hives, batches, quality tests, packages.
2. **Time-series data** — temperature, humidity, weight, activity and environmental readings.
3. **Large files** — hive images and quality documents.

The PRD recommends PostgreSQL for core entities, TimescaleDB for sensor data, and object storage for images/documents. fileciteturn0file0L743-L763

---

# 2. Database Choice

## PostgreSQL

Use PostgreSQL as the primary database.

Why:
- Strong relational integrity
- Foreign keys
- Transactions
- JSONB support
- Mature tooling
- Easy deployment
- Excellent support from TypeScript/Python ecosystems

## TimescaleDB

Use TimescaleDB as a PostgreSQL extension for sensor readings.

Benefits:
- Time-based partitioning
- Efficient time-series queries
- Aggregation
- Retention policies
- Continuous aggregates

## Redis

Use Redis for:
- QR verification caching
- Rate limiting
- Short-lived OTP/session state
- Job/queue support if required

## Object Storage

Use S3-compatible storage for:
- Hive images
- AI input images
- Quality documents

Never store large binary images directly inside PostgreSQL unless there is a specific reason.

---

# 3. Entity Relationship Model

```text
USER
 │
 └── BEEKEEPER
       │
       └── APIARY
             │
             └── HIVE
                  ├── SENSOR
                  │    └── SENSOR_READING
                  ├── HIVE_HEALTH_RECORD
                  ├── DISEASE_DETECTION
                  ├── ALERT
                  └── PRODUCTIVITY_PREDICTION

BEEKEEPER
    │
    └── HONEY_BATCH
           ├── BATCH_EVENT
           │      └── BLOCKCHAIN_RECORD
           ├── QUALITY_TEST
           └── PACKAGE
                  └── QR_CODE
```

The PRD defines these core entities and their relationships. fileciteturn0file0L767-L837

---

# 4. Detailed Database Schema

## 4.1 users

```text
users
-----
id                  UUID PK
name                VARCHAR(120)
phone               VARCHAR(20) UNIQUE
email               VARCHAR(255) UNIQUE NULL
role                ENUM
language_pref       VARCHAR(10)
is_active           BOOLEAN
is_approved         BOOLEAN
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Indexes:
- phone
- email
- role

---

## 4.2 refresh_tokens

```text
refresh_tokens
--------------
id                  UUID PK
user_id             UUID FK users.id
token_hash          TEXT
expires_at          TIMESTAMP
revoked_at          TIMESTAMP NULL
created_at          TIMESTAMP
```

Never store raw refresh tokens.

---

## 4.3 beekeepers

```text
beekeepers
----------
id                  UUID PK
user_id             UUID UNIQUE FK users.id
region              VARCHAR(150)
district            VARCHAR(100)
state               VARCHAR(100)
kvic_enrollment_id  VARCHAR(100) NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Public verification should expose only a safe display identity and region, not private contact information.

---

## 4.4 apiaries

```text
apiaries
--------
id                  UUID PK
beekeeper_id        UUID FK
name                VARCHAR(120)
latitude            DECIMAL(9,6)
longitude           DECIMAL(9,6)
location_accuracy_m DECIMAL NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Indexes:
- beekeeper_id
- geographic fields if geospatial queries are introduced

---

## 4.5 hives

```text
hives
-----
id                  UUID PK
hive_code           VARCHAR(50) UNIQUE
apiary_id            UUID FK
hive_type            VARCHAR(50)
bee_species          VARCHAR(100)
installation_date   DATE
status               ENUM
created_at           TIMESTAMP
updated_at           TIMESTAMP
```

Hive status:

```text
ACTIVE
INACTIVE
MAINTENANCE
REMOVED
```

---

## 4.6 sensors

```text
sensors
-------
id                  UUID PK
sensor_code         VARCHAR(100) UNIQUE
hive_id             UUID FK
sensor_type         ENUM
device_id           VARCHAR(100)
unit                VARCHAR(30)
last_seen_at        TIMESTAMP NULL
is_active            BOOLEAN
created_at           TIMESTAMP
```

Sensor types:

```text
TEMPERATURE
HUMIDITY
WEIGHT
MICROPHONE
GPS
AMBIENT_TEMPERATURE
AIR_QUALITY
```

---

# 5. Sensor Readings

## sensor_readings

```text
sensor_readings
---------------
id                  BIGSERIAL / UUID
sensor_id           UUID FK
hive_id             UUID FK
recorded_at         TIMESTAMPTZ
value               DOUBLE PRECISION
unit                VARCHAR(30)
quality             VARCHAR(30)
source              VARCHAR(30)
created_at          TIMESTAMPTZ
```

Recommended unique constraint:

```text
(sensor_id, recorded_at)
```

This supports backend deduplication for MQTT QoS 1.

The PRD explicitly proposes backend deduplication on `(sensor_id, timestamp)`. fileciteturn0file0L1229-L1235

For production-scale data, convert this into a Timescale hypertable.

---

# 6. Hive Health

## hive_health_records

```text
hive_health_records
-------------------
id                    UUID PK
hive_id               UUID FK
score                 DECIMAL(5,2)
status                ENUM
temperature_score     DECIMAL(5,2)
humidity_score        DECIMAL(5,2)
activity_score        DECIMAL(5,2)
weight_score          DECIMAL(5,2)
disease_risk_score    DECIMAL(5,2)
environment_score     DECIMAL(5,2)
component_scores      JSONB
computed_at           TIMESTAMPTZ
```

Status:

```text
HEALTHY
MODERATE_ATTENTION
WARNING
CRITICAL
```

---

# 7. Disease Detection

## disease_detections

```text
disease_detections
------------------
id                  UUID PK
hive_id             UUID FK
image_url           TEXT
model_version       VARCHAR(50)
category            VARCHAR(100)
confidence          DECIMAL(5,4)
severity            VARCHAR(20)
recommendation      TEXT
status              VARCHAR(30)
created_at          TIMESTAMPTZ
```

Possible status:

```text
CONFIDENT
INCONCLUSIVE
REVIEW_REQUIRED
```

Always retain `model_version` so model results remain auditable.

---

# 8. Honey Batches

## honey_batches

```text
honey_batches
------------
id                    UUID PK
batch_code            VARCHAR(80) UNIQUE
beekeeper_id          UUID FK
apiary_id             UUID FK
harvest_date          DATE
honey_type            VARCHAR(100)
estimated_quantity_kg DECIMAL(10,2)
actual_quantity_kg    DECIMAL(10,2) NULL
harvest_region        VARCHAR(150)
status                ENUM
created_at             TIMESTAMPTZ
updated_at             TIMESTAMPTZ
```

Because one batch may come from multiple hives, do not store `hive_ids` as a PostgreSQL array for the normalized production schema.

Instead use a join table.

---

# 9. Batch-Hive Join

## batch_hives

```text
batch_hives
-----------
batch_id            UUID FK
hive_id             UUID FK
quantity_kg         DECIMAL(10,2) NULL
PRIMARY KEY(batch_id, hive_id)
```

This makes future analytics easier.

---

# 10. Batch Events

## batch_events

```text
batch_events
------------
id                  UUID PK
batch_id            UUID FK
event_type          ENUM
actor_user_id       UUID FK
previous_status     VARCHAR(30)
new_status          VARCHAR(30)
notes               TEXT
payload             JSONB
payload_hash        VARCHAR(128)
blockchain_status   ENUM
idempotency_key     VARCHAR(100) UNIQUE
occurred_at         TIMESTAMPTZ
created_at          TIMESTAMPTZ
```

Blockchain status:

```text
PENDING
SUBMITTED
CONFIRMED
FAILED
```

---

# 11. Quality Tests

## quality_tests

```text
quality_tests
-------------
id                  UUID PK
batch_id            UUID FK
inspector_id        UUID FK users.id
moisture_pct        DECIMAL(5,2)
purity_notes        TEXT
result              ENUM
document_url        TEXT NULL
tested_at           TIMESTAMPTZ
created_at          TIMESTAMPTZ
```

Result:

```text
PENDING
APPROVED
REJECTED
```

---

# 12. Packages

## packages

```text
packages
--------
id                  UUID PK
batch_id             UUID UNIQUE FK
package_serial       VARCHAR(100) UNIQUE
quantity             DECIMAL(10,2)
unit                 VARCHAR(20)
packaged_at          TIMESTAMPTZ
created_at           TIMESTAMPTZ
```

A batch can conceptually produce multiple consumer packages. Therefore, for a scalable implementation, the database should preferably use:

```text
batch 1 ─── N packages
```

even though the MVP PRD describes a 1-to-1 package relationship.

---

# 13. QR Codes

## qr_codes

```text
qr_codes
--------
id                  UUID PK
package_id          UUID UNIQUE FK
token_hash          TEXT
signed_token        TEXT
scan_count          INTEGER
last_scanned_at     TIMESTAMPTZ NULL
created_at          TIMESTAMPTZ
revoked_at          TIMESTAMPTZ NULL
```

Do not use sequential public IDs.

---

# 14. Blockchain Records

## blockchain_records

```text
blockchain_records
------------------
id                  UUID PK
batch_event_id      UUID UNIQUE FK
network              VARCHAR(50)
contract_address     VARCHAR(100)
tx_hash              VARCHAR(100) UNIQUE
block_number         BIGINT NULL
payload_hash         VARCHAR(128)
status               ENUM
submitted_at         TIMESTAMPTZ
confirmed_at         TIMESTAMPTZ NULL
error_message        TEXT NULL
```

---

# 15. Productivity Predictions

## productivity_predictions

```text
productivity_predictions
------------------------
id                  UUID PK
hive_id             UUID FK
model_version       VARCHAR(50)
predicted_yield_kg  DECIMAL(10,2)
lower_bound_kg      DECIMAL(10,2)
upper_bound_kg      DECIMAL(10,2)
confidence_pct      DECIMAL(5,2)
features_snapshot   JSONB
generated_at        TIMESTAMPTZ
```

---

# 16. Alerts

## alerts

```text
alerts
------
id                  UUID PK
hive_id             UUID FK
type                ENUM
severity            ENUM
message             TEXT
recommendation      TEXT
source              VARCHAR(30)
created_at          TIMESTAMPTZ
resolved_at         TIMESTAMPTZ NULL
resolved_by         UUID FK users.id NULL
```

Severity:

```text
INFO
LOW
MEDIUM
HIGH
CRITICAL
```

---

# 17. Audit Logs

## audit_logs

```text
audit_logs
----------
id                  UUID PK
actor_user_id       UUID FK
action              VARCHAR(100)
entity_type         VARCHAR(80)
entity_id            UUID
before_data         JSONB NULL
after_data          JSONB NULL
ip_hash              TEXT NULL
created_at           TIMESTAMPTZ
```

Audit logs are important for:
- Role-based state changes
- Supply-chain accountability
- Judge demonstration
- Security investigation

---

# 18. Important Constraints

## Foreign Keys

All relationships must use foreign keys.

## Unique constraints

At minimum:

```text
users.phone
users.email
hives.hive_code
sensors.sensor_code
honey_batches.batch_code
packages.package_serial
blockchain_records.tx_hash
batch_events.idempotency_key
```

## Transactions

Use database transactions for:
- Batch status update + event creation
- Package creation + QR creation
- Quality approval + batch status transition
- User approval + role changes

---

# 19. Data Retention

Hackathon:
- Keep all demo data.

Pilot:
- Sensor readings should use configurable retention.
- Aggregate old sensor data where detailed resolution is no longer needed.
- Never delete audit events required for traceability.

---

# 20. API Design

The PRD defines REST endpoints for auth, apiaries, hives, sensors, disease detection, batches, verification, dashboards, predictions and alerts. fileciteturn0file0L843-L881

Base URL:

```text
/api/v1
```

---

## Authentication

### POST /auth/register

```json
{
  "name": "Ramesh Kumar",
  "phone": "+91XXXXXXXXXX",
  "role": "BEEKEEPER",
  "language": "kn"
}
```

Response:

```json
{
  "user_id": "uuid",
  "status": "OTP_SENT"
}
```

### POST /auth/otp/verify

```json
{
  "phone": "+91XXXXXXXXXX",
  "otp": "123456"
}
```

Response:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "user": {
    "id": "uuid",
    "role": "BEEKEEPER"
  }
}
```

---

# 21. Hive APIs

### POST /api/v1/apiaries

Create apiary.

### GET /api/v1/apiaries

List beekeeper apiaries.

### POST /api/v1/hives

Create hive.

### GET /api/v1/hives

List hives.

### GET /api/v1/hives/:id

Get hive details.

### GET /api/v1/hives/:id/health

Get current health.

### GET /api/v1/hives/:id/readings

Get sensor history.

---

# 22. Sensor APIs

### POST /api/v1/sensor-data

Device-authenticated ingestion.

```json
{
  "sensor_id": "SNS-HIVE021-TEMP",
  "timestamp": "2026-08-29T09:15:00Z",
  "value": 39.2,
  "unit": "celsius"
}
```

Response:

```json
{
  "accepted": true,
  "duplicate": false
}
```

### POST /api/v1/sensor-data/batch

Use for offline-buffer synchronization.

---

# 23. AI APIs

### POST /api/v1/disease-detection

Multipart:
- hive_id
- image

Response:

```json
{
  "detection_id": "DET-5521",
  "category": "possible_varroa_indicators",
  "confidence": 0.78,
  "severity": "MEDIUM",
  "recommendation": "Inspect brood frames for mite presence."
}
```

### GET /api/v1/hives/:id/disease-history

Returns previous AI screenings.

### GET /api/v1/hives/:id/prediction

Returns yield forecast.

---

# 24. Batch APIs

### POST /api/v1/batches

Create batch.

### GET /api/v1/batches

List batches according to role.

### GET /api/v1/batches/:id

Batch details.

### PATCH /api/v1/batches/:id/status

```json
{
  "new_status": "COLLECTED",
  "notes": "Received at collection center"
}
```

### GET /api/v1/batches/:id/timeline

Returns all events.

---

# 25. Quality API

### POST /api/v1/batches/:id/quality-test

```json
{
  "moisture_pct": 18.2,
  "purity_notes": "No visible abnormalities",
  "result": "APPROVED"
}
```

This endpoint must:
1. Verify inspector role.
2. Verify batch status.
3. Store test.
4. Create batch event.
5. Hash event.
6. Queue blockchain anchoring.

---

# 26. Packaging APIs

### POST /api/v1/batches/:id/package

Creates package.

### POST /api/v1/packages/:id/qr

Creates signed QR.

### GET /api/v1/packages/:id/qr

Returns QR image/data.

---

# 27. Consumer Verification API

### GET /api/v1/verify/:qrToken

Public endpoint.

Response:

```json
{
  "verified": true,
  "batch_id": "BATCH-2026-001",
  "package_serial": "PKG-0001",
  "honey_type": "Multifloral",
  "harvest_region": "Coorg, Karnataka",
  "harvest_date": "2026-08-25",
  "beekeeper_display_name": "Ramesh K.",
  "quality_status": "Approved",
  "timeline": [
    "Harvested",
    "Quality Tested",
    "Processed",
    "Packaged",
    "Distributed"
  ],
  "blockchain": {
    "verified": true,
    "tx_hash": "0xa1b2...ef90"
  },
  "scan_status": "NORMAL"
}
```

Public API must not expose:
- phone
- email
- exact private address
- wallet private key
- internal database IDs where unnecessary

---

# 28. Dashboard APIs

```text
GET /dashboard/beekeeper
GET /dashboard/supply-chain
GET /dashboard/admin
GET /alerts
GET /alerts/:id
PATCH /alerts/:id/resolve
```

---

# 29. API Response Standard

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "BATCH_INVALID_TRANSITION",
    "message": "Batch cannot move from PACKAGED to TESTED."
  },
  "request_id": "req_xxx"
}
```

---

# 30. Pagination

For list endpoints:

```text
?page=1
&page_size=20
&sort=created_at
&order=desc
```

Response:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

# 31. Evaluation Metrics / Strategy

The project should not be evaluated only by whether the UI works. Evaluate the major technical claims separately.

## 31.1 Traceability

Metrics:
- End-to-end traceability rate
- Batch event completeness
- Blockchain anchoring success rate
- Verification correctness

Target for hackathon demo:

```text
100% of seeded demo batches traceable
100% of lifecycle events have event hashes
100% of verification cases correctly identify valid/invalid QR
```

---

# 32. QR Verification Evaluation

Create test cases:

```text
Valid QR
Modified token
Unknown token
Revoked QR
Duplicate scan pattern
Wrong package serial
```

Metrics:

```text
True Positive Rate
False Acceptance Rate
False Rejection Rate
```

Most important security metric:

> Invalid/tampered QR must never be shown as verified.

---

# 33. Disease Detection Evaluation

Metrics:
- Accuracy
- Precision
- Recall
- F1-score
- Confusion matrix

Recall should receive special attention because missing a possible disease indicator is more concerning than sending a beekeeper for an unnecessary inspection.

The PRD explicitly recommends accuracy plus per-class precision/recall and confusion-matrix review. fileciteturn0file0L1163-L1175

MVP acceptance:

```text
Model loads successfully
Inference completes reliably
Confidence is returned
Low-confidence images become INCONCLUSIVE
No unsupported diagnosis wording
```

Do not claim medical/scientific-grade accuracy from a small hackathon dataset.

---

# 34. Yield Prediction Evaluation

Primary metric:

```text
MAE = mean(abs(actual_yield - predicted_yield))
```

Also track:
- RMSE
- prediction coverage
- confidence interval coverage

For the MVP, MAE is the primary metric as specified by the PRD. fileciteturn0file0L1177-L1187

---

# 35. Hive Health Score Evaluation

Test:
- Normal sensor data
- High temperature
- High humidity
- Sudden weight loss
- Low activity
- Disease signal
- Sensor offline

Acceptance:
- Health score changes predictably.
- Critical conditions produce Critical/Warning state.
- Component scores explain the result.
- Sensor-offline is not confused with environmental danger.

---

# 36. API Performance

PRD targets:

```text
Read API p95 < 400 ms
Write API p95 < 800 ms when hashing is involved
QR verification < 2 seconds
Dashboard initial load < 3 seconds on 4G
```

fileciteturn0file0L631-L639

Use:
- k6
- Artillery
- Lighthouse
- browser performance APIs

---

# 37. Reliability Metrics

Track:

```text
IoT ingestion success rate
IoT duplicate rejection rate
Blockchain transaction success rate
Blockchain retry success rate
API error rate
QR verification error rate
Offline sync success rate
```

Target:
- No lost sensor events during simulated offline/online transition.
- Retry should not create duplicate batch events.

---

# 38. Security Evaluation

Test:
- Unauthorized API access
- Wrong role
- Expired JWT
- Invalid refresh token
- QR brute force
- SQL injection
- XSS
- File upload abuse
- Oversized image
- Malicious file type
- Rate limiting
- IDOR attempts

Critical rule:

```text
Authentication ≠ Authorization
```

Every protected write must validate both.

---

# 39. Hackathon Evaluation Scorecard

Recommended internal scoring:

| Area | Weight |
|---|---:|
| End-to-end functionality | 25% |
| Traceability/blockchain correctness | 20% |
| AI usefulness | 15% |
| IoT/hive monitoring | 15% |
| UX/accessibility | 10% |
| Security/reliability | 5% |
| Performance | 5% |
| Demo/presentation quality | 5% |

The exact SIH judging rubric may differ; this is an internal engineering scorecard, not an official SIH rubric.

---

# 40. Golden Acceptance Test

A seeded demo batch must successfully execute:

```text
Register beekeeper
→ Create apiary
→ Create hive
→ Receive sensor readings
→ Trigger abnormal condition
→ Generate alert
→ Upload hive image
→ Receive AI screening
→ Record harvest
→ Create batch
→ Anchor event
→ Collect
→ Quality test
→ Approve
→ Process
→ Package
→ Generate QR
→ Scan QR
→ Verify blockchain proof
→ Display timeline
```

If this works reliably, the project has a strong hackathon-ready foundation.
