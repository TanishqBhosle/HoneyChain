const API_BASE = 'http://localhost:3001/api/v1';
const AI_BASE = 'http://localhost:8000/api/v1';

async function request(url: string, options: any = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers });
  let data = null;
  try {
    data = await res.json();
  } catch {}
  return { status: res.status, ok: res.ok, data };
}

async function runAuditSuite() {
  console.log('============================================================');
  console.log('HONEY CHAIN — AUTOMATED E2E & SECURITY AUDIT TEST SUITE');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;
  const testResults: any[] = [];

  function assert(testId: string, feature: string, description: string, condition: boolean, evidence?: string) {
    if (condition) {
      passed++;
      console.log(`✅ [PASS] ${testId} | ${feature}: ${description}`);
      testResults.push({ id: testId, feature, testCase: description, status: 'PASS', severity: 'NONE', evidence });
    } else {
      failed++;
      console.error(`❌ [FAIL] ${testId} | ${feature}: ${description} — Evidence: ${evidence}`);
      testResults.push({ id: testId, feature, testCase: description, status: 'FAIL', severity: 'HIGH', evidence });
    }
  }

  // ------------------------------------------------------------
  // 1. AUTHENTICATION & TOKEN GENERATION (Phases 7, 9)
  // ------------------------------------------------------------
  let beekeeperToken = '';
  let inspectorToken = '';
  let processorToken = '';
  let adminToken = '';

  try {
    // A. Beekeeper Login
    const bkRes = await request(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({ phone: '+91 98765 43210', otp: '123456' }),
    });
    beekeeperToken = bkRes.data?.access_token;
    assert('HC-AUTH-001', 'Auth', 'Beekeeper valid OTP login generates signed JWT', !!beekeeperToken && bkRes.data?.user?.role === 'BEEKEEPER');

    // B. Invalid OTP Rejection
    const invalidOtpRes = await request(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({ phone: '+91 98765 43210', otp: '999999' }),
    });
    assert('HC-AUTH-002', 'Auth', 'Reject wrong OTP with 401 Unauthorized', invalidOtpRes.status === 401);

    // C. Inspector Login
    const inspRes = await request(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({ phone: '+91 98234 56789', otp: '123456' }),
    });
    inspectorToken = inspRes.data?.access_token;
    assert('HC-AUTH-003', 'Auth', 'Quality Inspector login', !!inspectorToken && inspRes.data?.user?.role === 'QUALITY_INSPECTOR');

    // D. Processor Login
    const procRes = await request(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({ phone: '+91 98345 67890', otp: '123456' }),
    });
    processorToken = procRes.data?.access_token;
    assert('HC-AUTH-004', 'Auth', 'Processor login', !!processorToken && procRes.data?.user?.role === 'PROCESSOR');

    // E. Admin Login
    const admRes = await request(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({ phone: '+91 99000 11122', otp: '123456' }),
    });
    adminToken = admRes.data?.access_token;
    assert('HC-AUTH-005', 'Auth', 'Admin login', !!adminToken && admRes.data?.user?.role === 'ADMIN');
  } catch (err: any) {
    console.error('Auth setup failed:', err.message);
  }

  // ------------------------------------------------------------
  // 2. STRICT RBAC ACCESS CONTROL ATTACKS (Phase 10)
  // ------------------------------------------------------------
  try {
    // Attack 1: Beekeeper attempts to package a batch (only PROCESSOR or ADMIN allowed)
    const attack1 = await request(`${API_BASE}/batches/batch_1/package`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${beekeeperToken}` },
      body: JSON.stringify({ quantity: 50 }),
    });
    assert('HC-RBAC-001', 'RBAC', 'Beekeeper package attempt rejected with 403 Forbidden', attack1.status === 403);

    // Attack 2: Beekeeper attempts to submit Quality Test (only QUALITY_INSPECTOR or ADMIN allowed)
    const attack2 = await request(`${API_BASE}/batches/batch_1/quality-test`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${beekeeperToken}` },
      body: JSON.stringify({ moisturePct: 18.0, result: 'APPROVED' }),
    });
    assert('HC-RBAC-002', 'RBAC', 'Beekeeper quality test attempt rejected with 403 Forbidden', attack2.status === 403);

    // Attack 3: Processor attempts to transition status to APPROVED (only QUALITY_INSPECTOR allowed)
    const attack3 = await request(`${API_BASE}/batches/batch_1/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${processorToken}` },
      body: JSON.stringify({ status: 'APPROVED' }),
    });
    assert('HC-RBAC-003', 'RBAC', 'Processor transition to APPROVED rejected with 400 Bad Request', attack3.status === 400);
  } catch (err: any) {
    console.error('RBAC testing error:', err.message);
  }

  // ------------------------------------------------------------
  // 3. IOT SENSOR INGESTION & HEALTH CALCULATION (Phases 14, 15, 16)
  // ------------------------------------------------------------
  try {
    // Ingest telemetry into Hive 7
    const telemetryRes = await request(`${API_BASE}/sensor-data`, {
      method: 'POST',
      body: JSON.stringify([
        { sensorId: 'sens_temp_7', value: 38.8, unit: '°C', timestamp: new Date().toISOString() },
        { sensorId: 'sens_hum_7', value: 75.0, unit: '%', timestamp: new Date().toISOString() },
        { sensorId: 'sens_w_7', value: 20.0, unit: 'kg', timestamp: new Date().toISOString() },
      ]),
    });
    assert('HC-IOT-001', 'IoT', 'Array telemetry ingestion accepted', telemetryRes.status === 201 || telemetryRes.status === 200);

    // Verify Health Record updated for Hive 7
    const hiveRes = await request(`${API_BASE}/hives/hive_7`, {
      headers: { Authorization: `Bearer ${beekeeperToken}` },
    });
    const latestHealth = hiveRes.data?.healthRecords?.[0];
    assert('HC-HEALTH-001', 'Health Engine', 'Hive 7 health record computed automatically', !!latestHealth && latestHealth.score <= 80);

    // Verify Alert spawned for abnormal temperature
    const alertsRes = await request(`${API_BASE}/alerts`, {
      headers: { Authorization: `Bearer ${beekeeperToken}` },
    });
    const tempAlert = alertsRes.data?.find((a: any) => a.hiveId === 'hive_7');
    assert('HC-ALERT-001', 'Alerts', 'Alert generated for abnormal temperature on Hive 7', !!tempAlert);
  } catch (err: any) {
    console.error('IoT/Health error:', err.message);
  }

  // ------------------------------------------------------------
  // 4. AI DISEASE SCREENING (Phase 17, 18)
  // ------------------------------------------------------------
  try {
    // Direct Python AI Service Disease Screening
    const aiHealth = await request(`${AI_BASE}/health`);
    assert('HC-AI-001', 'AI Service', 'Python AI FastAPI service is healthy', aiHealth.data?.status === 'ok');

    // Yield Prediction
    const yieldRes = await request(`${AI_BASE}/predict/yield`, {
      method: 'POST',
      body: JSON.stringify({
        historical_yield_kg: 18.5,
        health_score: 90,
        avg_temperature: 34.5,
        avg_humidity: 62.0,
        season: 'autumn',
        weight_trend: 0.2,
        colony_strength: 85,
      }),
    });
    assert('HC-AI-002', 'AI Yield', 'AI Productivity yield prediction generated', yieldRes.data?.predicted_yield_kg > 0 && yieldRes.data?.confidence_pct > 70);
  } catch (err: any) {
    console.error('AI test error:', err.message);
  }

  // ------------------------------------------------------------
  // 5. GOLDEN PATH: BATCH LIFECYCLE & BLOCKCHAIN PROOF (Phases 19-28)
  // ------------------------------------------------------------
  try {
    // Step A: Beekeeper creates a new Honey Batch
    const newBatchRes = await request(`${API_BASE}/batches`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${beekeeperToken}` },
      body: JSON.stringify({
        apiaryId: 'ap_1',
        hiveIds: ['hive_1', 'hive_7'],
        harvestDate: '2026-08-30',
        honeyType: 'Wild Himalayan Multifloral',
        estimatedQuantityKg: 35.0,
      }),
    });
    const batchId = newBatchRes.data?.id;
    assert('HC-BATCH-001', 'Batch Lifecycle', `Batch created with initial status CREATED (${batchId})`, newBatchRes.data?.status === 'CREATED');

    // Step B: Invalid State Transition Attack (Try to jump directly from CREATED to PACKAGED)
    const attackState = await request(`${API_BASE}/batches/${batchId}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${processorToken}` },
      body: JSON.stringify({ status: 'PACKAGED' }),
    });
    assert('HC-BATCH-002', 'State Machine', 'Invalid transition CREATED -> PACKAGED rejected with 400 Bad Request', attackState.status === 400);

    // Step C: Collection Center receives batch (CREATED -> COLLECTED)
    const ccRes = await request(`${API_BASE}/batches/${batchId}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: 'COLLECTED', notes: 'Custody received at Madikeri Hub' }),
    });
    assert('HC-BATCH-003', 'Batch Lifecycle', 'Transition CREATED -> COLLECTED succeeded', ccRes.data?.status === 'COLLECTED');

    // Step D: Quality Inspector records lab tests and approves (COLLECTED -> TESTED -> APPROVED)
    const testRes = await request(`${API_BASE}/batches/${batchId}/quality-test`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${inspectorToken}` },
      body: JSON.stringify({
        moisturePct: 17.2,
        purityNotes: 'NMR purity 99.4%, 0% adulteration. Certified A+ grade.',
        result: 'APPROVED',
      }),
    });
    assert('HC-QUALITY-001', 'Quality Testing', 'Quality Test recorded and batch APPROVED', testRes.data?.result === 'APPROVED');

    // Step E: Processor packages batch and mints QR token (APPROVED -> PACKAGED)
    const pkgRes = await request(`${API_BASE}/batches/${batchId}/package`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${processorToken}` },
      body: JSON.stringify({ quantity: 35.0, unit: 'kg' }),
    });
    const qrToken = pkgRes.data?.package?.qrCode?.signedToken;
    assert('HC-PKG-001', 'Packaging & QR', `Batch packaged and signed HMAC QR minted (${qrToken})`, !!qrToken && pkgRes.data?.status === 'PACKAGED');

    // Step F: Public Consumer Independent Verification (Zero-auth public endpoint)
    const verifyRes = await request(`${API_BASE}/verify/${qrToken}`);
    const details = verifyRes.data?.batchDetails;
    assert('HC-VERIFY-001', 'Public Verification', 'Public consumer verification verifies authentic honey', verifyRes.data?.verified === true);
    assert('HC-VERIFY-002', 'Public Verification', 'Consumer verification reveals origin & complete journey timeline', (details?.events?.length || 0) >= 3 && (details?.origin?.region || '').includes('Coorg'));
    assert('HC-VERIFY-003', 'Data Privacy', 'Zero private PII (passwords, phone, email) exposed in public verification', !details?.beekeeper?.phone && !details?.beekeeper?.passwordHash && !details?.beekeeper?.email);
  } catch (err: any) {
    console.error('Golden path lifecycle error:', err.message);
  }

  // ------------------------------------------------------------
  // 6. ADMIN REGISTRY & DASHBOARD METRICS (Phase 29)
  // ------------------------------------------------------------
  try {
    const adminStats = await request(`${API_BASE}/dashboard/admin`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert('HC-ADMIN-001', 'Admin Metrics', 'Admin dashboard metrics aggregates live DB state', adminStats.data?.totalHives >= 12 && adminStats.data?.totalUsers >= 5);
  } catch (err: any) {
    console.error('Admin metrics error:', err.message);
  }

  console.log('\n============================================================');
  console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('============================================================');
}

runAuditSuite();
