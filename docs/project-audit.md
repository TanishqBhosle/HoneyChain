# Honey Chain — Project Audit

This document provides a comprehensive audit of the Honey Chain repository prior to the implementation phase. It evaluates the current codebase state against the Product Requirement Document (PRD), Architecture Specification, and Database Design guidelines.

---

## 1. Current Project Structure
The repository is structured as a Turborepo monorepo with multiple workspaces:
```text
honey-chain/
├── apps/
│   └── web/                     # Next.js 14 Frontend Application
├── contracts/                   # Smart Contracts (Hardhat, Solidity 0.8.24)
├── packages/
│   └── database/                # Database Package (Prisma Client & Seeding)
├── services/
│   ├── ai-service/              # Python FastAPI AI/ML Inference Service
│   ├── api/                     # NestJS Core Backend API Monolith
│   └── iot-simulator/           # Node.js IoT Simulator (MQTT + HTTP fallback)
├── docs/                        # Specifications and Setup Guides
├── infrastructure/              # Docker Compose (Local Services)
└── package.json (root)          # Root Workspace Config
```

---

## 2. Existing Technology Stack
*   **Monorepo Tooling**: Turborepo, pnpm workspaces
*   **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, Recharts, shadcn/ui components (under `components/ui/Card.tsx` etc.)
*   **Backend API**: Node.js, NestJS, Prisma ORM, Passport JWT, ethers.js
*   **Database**: PostgreSQL (integrated via Prisma)
*   **AI/ML Service**: Python 3.11+, FastAPI, PyTorch, Torchvision, PIL, scikit-learn, joblib, pandas
*   **Blockchain**: Solidity 0.8.24, Hardhat, Ethers.js, OpenZeppelin (AccessControl)
*   **IoT Service**: MQTT (Eclipse Mosquitto broker via Docker), axios

---

## 3. Existing Working Features
*   **Prisma Schema & Migrations**: Schema matches `database.md` closely with standard relational constraints, UUIDs/CUIDs, indexes, and enums.
*   **Hardhat Contract Suite**: `HoneyTraceability.sol` compiled and has unit tests (`HoneyTraceability.test.ts`) covering batch creation, events, recalls, and hash integrity checks.
*   **FastAPI Base**: The Python FastAPI service loads a PyTorch classification model (MobileNetV3 in cpu mode) and a Scikit-Learn regression model.
*   **IoT Telemetry Sim**: Sends mock metrics (Temperature, Humidity, Weight) to the API periodically.
*   **Auth Guard Infrastructure**: NestJS guards for JWT auth and RBAC roles are present.

---

## 4. Incomplete & Broken Features
*   **Mocked Blockchain Ingestion**: The NestJS `BlockchainService` is fully mocked (`crypto.randomBytes` for tx hashes). It does not interface with the Solidity smart contracts on Polygon Amoy.
*   **Mocked AI Service Integration**: NestJS `AiService` returns hardcoded static values. It does not communicate with the Python FastAPI service.
*   **Mocked Health Engine**: NestJS `HealthCalculatorService` returns a static health score of 85 and constant component scores instead of applying the PRD formula.
*   **Static UI & Routing Gaps**: The Next.js pages contain static mock dashboards for the beekeeper, supply chain, and admin panels. State changes do not write to the database.
*   **QR Code Signatures**: Currently signed with a simplistic format that is not dynamically verified for anomalous scan counts.
*   **IoT API Single-Reading Endpoint**: The simulator sends an array of telemetry items, but the endpoint expects a single item and will reject the payload due to type validation constraints.

---

## 5. File & Folder Classifications

We classify all major files/folders using the required rules:

### KEEP
*   `contracts/contracts/HoneyTraceability.sol`: Correctly written Solidity contract with role-based checks.
*   `contracts/test/HoneyTraceability.test.ts`: Robust test suite for smart contracts.
*   `packages/database/prisma/schema.prisma`: Schema fits the requirements and has all major entities mapped.
*   `packages/database/seed.ts`: Seeds the necessary users (Ramesh Kumar, Priya Devi) and mock hives.
*   `services/ai-service/app/models/disease_classifier.py`: Properly loads PyTorch and has a robust random predictor fallback for demo mode.
*   `services/ai-service/app/models/yield_regressor.py`: Implements fallback yield prediction algorithm.
*   `services/iot-simulator/src/simulator.ts`: Basic simulation loop is useful.

### REFACTOR
*   `services/api/src/modules/blockchain/blockchain.service.ts`: Update to communicate with the local hardhat network or Polygon Amoy contract using `ethers`.
*   `services/api/src/modules/ai/ai.service.ts`: Update to query the FastAPI endpoint via HTTP multipart uploads instead of returning hardcoded values.
*   `services/api/src/modules/iot/health-calculator.service.ts`: Implement the weighted PRD formula.
*   `services/api/src/modules/iot/iot.service.ts` / `iot.controller.ts`: Refactor to ingest both a single reading and arrays of readings.
*   `apps/web/contexts/AuthContext.tsx`: Connect to actual backend authentication (`/api/v1/auth/otp/verify`).
*   `apps/web/app/verify/[token]/page.tsx`: Connect to backend `/api/v1/verify/:token` endpoints.

### REPLACE
*   `apps/web/app/(dashboard)/beekeeper/page.tsx` (and related folders): Replace static components with dynamic state hooks calling the backend APIs.
*   `apps/web/app/(dashboard)/supply-chain/page.tsx`: Bind status updates to real database batch transactions.

### DELETE
*   `apps/web/scaffold.js`: Obsolete scaffolding file.
*   `services/api/generate_auth.js`: Duplicate/obsolete file.

---

## 6. Gaps Identified

### Architecture Gaps
*   No background worker or queue for handling retries of failed blockchain events. The app needs to support `PENDING` states and retry updates to keep operations active when blockchain RPC is offline.

### Security Gaps
*   The `/api/v1/sensor-data` endpoint is public and lacks API token/device authorization checks.
*   Next.js does not enforce role verification routing cleanly, relying on basic context states.

### UI/UX Gaps
*   No language switching interface implemented for English/Hindi/Kannada.
*   No offline forms handling in Beekeeper mobile surfaces (no IndexedDB synchronization cache).

### Testing Gaps
*   No E2E testing framework exists for verifying the Golden Path from IoT sensor trigger to consumer QR scan.

---

## 7. Recommended Implementation Order

1.  **Phase 1: Foundation & Cleanup**: Delete obsolete files (`scaffold.js`, `generate_auth.js`). Verify DB migrations and run the seed script to start with structured data.
2.  **Phase 2: Backend API Core Refactoring**:
    *   Ingestion arrays support (`iot.service.ts`).
    *   Real health score calculations (`health-calculator.service.ts`).
    *   FastAPI endpoint communication for disease and yield predictions (`ai.service.ts`).
    *   Ethers-based smart contract connection (`blockchain.service.ts`).
3.  **Phase 3: Frontend Integration & State Binding**:
    *   Bind authentication, apiary registration, and hive listings to the API.
    *   Make beekeeper harvest flow work dynamically.
    *   Build supply-chain and admin dashboard controls.
4.  **Phase 4: Golden Path Verification**:
    *   Verify the telemetry -> warning alert -> AI analysis -> harvest -> batch transition -> quality test -> package -> QR code -> verify flow.
    *   Implement anomaly scanning detection for QR codes (scan limits).
5.  **Phase 5: Refinement**: Add offline synchronization tolerance (using localStorage/IndexedDB fallbacks for mock forms) and multilanguage toggles.
