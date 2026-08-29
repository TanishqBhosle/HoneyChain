# Setup Guide

## Prerequisites
- Node 20+
- pnpm 9+
- Python 3.11+
- Docker Desktop

## Steps

1. **Clone and install**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   *(Ensure `DATABASE_URL` is set to `postgresql://postgres:password@localhost:5432/honeychain?schema=public`)*

3. **Start Infrastructure**
   ```bash
   cd infrastructure/docker
   docker-compose up -d
   cd ../..
   ```

4. **Database Setup**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed
   ```

5. **Start API**
   ```bash
   cd services/api
   pnpm dev
   ```

6. **Start AI Service**
   ```bash
   cd services/ai-service
   pip install -r requirements.txt
   uvicorn app.main:app --port 8000
   ```

7. **Start Frontend**
   ```bash
   cd apps/web
   pnpm dev
   ```

8. **Start IoT Simulator**
   ```bash
   cd services/iot-simulator
   pnpm dev
   ```

9. **Smart Contract (Optional)**
   ```bash
   cd contracts
   npx hardhat compile
   npx hardhat test
   ```

## Access Points
- Web: `http://localhost:3000`
- API: `http://localhost:3001`
- AI: `http://localhost:8000`
