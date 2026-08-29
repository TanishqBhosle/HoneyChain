import * as crypto from 'crypto';

const API_BASE = process.env.API_URL || 'http://localhost:3001/api/v1';

async function request(url: string, options: any = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return { status: res.status, ok: res.ok, data };
  } catch (err: any) {
    return { status: 500, ok: false, data: { message: err.message } };
  }
}

async function runQrVerificationTests() {
  console.log('============================================================');
  console.log('HONEY CHAIN — COMPREHENSIVE QR GENERATION & VERIFICATION TEST');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(id: string, testName: string, description: string, condition: boolean, evidence?: any) {
    if (condition) {
      console.log(`✅ [PASS] ${id} | ${testName}: ${description}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${id} | ${testName}: ${description} — Evidence:`, evidence);
      failed++;
    }
  }

  const procLogin = await request(`${API_BASE}/auth/otp/verify`, {
    method: 'POST',
    body: JSON.stringify({ phone: '+91 98345 67890', otp: '123456' }),
  });
  const processorToken = procLogin.data?.access_token;
  assert('QR-AUTH-001', 'Processor Auth', 'Processor login successful', !!processorToken);

  // 2. Package BATCH-2026-001 and mint signed QR token
  const packageRes = await request(`${API_BASE}/batches/BATCH-2026-001/package`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${processorToken}` },
    body: JSON.stringify({ quantity: 45.0, unit: 'kg' }),
  });
  const signedToken = packageRes.data?.package?.qrCode?.signedToken;
  assert('QR-GEN-001', 'QR Generation', `HMAC Signed QR minted (${signedToken})`, !!signedToken && packageRes.data?.status === 'PACKAGED');

  // 3. Test Valid QR Token (Public zero-auth verification)
  const validRes = await request(`${API_BASE}/verify/${signedToken}`);
  assert('QR-VERIFY-001', 'Valid Token Verification', 'Public endpoint validates signed HMAC token', validRes.data?.verified === true);
  assert('QR-VERIFY-002', 'Data Integrity', 'Returns authentic batch details, origin, and events', validRes.data?.product?.batchId === 'BATCH-2026-001' && validRes.data?.journey?.length >= 3);
  assert('QR-VERIFY-003', 'Blockchain Proof', 'Blockchain anchor records present', validRes.data?.blockchain?.verified === true && !!validRes.data?.blockchain?.latestTxHash);

  // 4. Test Seeded Batch Direct Token
  const directRes = await request(`${API_BASE}/verify/BATCH-2026-001`);
  assert('QR-VERIFY-004', 'Demo Batch Verification', 'Seeded BATCH-2026-001 is verified authentic', directRes.data?.verified === true);

  // 5. Test Tampered QR Token (Modified HMAC signature)
  const tamperedToken = `${signedToken}_tampered_abc`;
  const tamperedRes = await request(`${API_BASE}/verify/${tamperedToken}`);
  assert('QR-SEC-001', 'Tampered Token Rejection', 'Tampered token rejected with 400 Bad Request', tamperedRes.status === 400);

  // 6. Test Unknown Batch Token
  const unknownRes = await request(`${API_BASE}/verify/fake-unknown-batch-999`);
  assert('QR-SEC-002', 'Unknown Token Rejection', 'Unknown token returns 404 Not Found', unknownRes.status === 404);

  // 7. Test Empty / Blank Token
  const emptyRes = await request(`${API_BASE}/verify/%20`);
  assert('QR-SEC-003', 'Blank Token Rejection', 'Blank token rejected with 400 Bad Request', emptyRes.status === 400);

  // 8. Test Data Privacy (Zero PII leak in public response)
  const piiCheck = validRes.data;
  const noPii = !piiCheck?.beekeeper?.phone &&
                !piiCheck?.beekeeper?.email &&
                !piiCheck?.beekeeper?.passwordHash &&
                !piiCheck?.beekeeper?.credentials;
  assert('QR-PRIV-001', 'PII Protection', 'Zero private beekeeper PII exposed to public consumers', noPii);

  console.log('\n============================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED (TOTAL: ${passed + failed})`);
  console.log('============================================================');
}

runQrVerificationTests();
