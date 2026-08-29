import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  // Clean up any existing data in reverse order of foreign keys
  await prisma.qRCode.deleteMany().catch(() => {});
  await prisma.package.deleteMany().catch(() => {});
  await prisma.qualityTest.deleteMany().catch(() => {});
  await prisma.blockchainRecord.deleteMany().catch(() => {});
  await prisma.batchEvent.deleteMany().catch(() => {});
  await prisma.honeyBatch.deleteMany().catch(() => {});
  await prisma.alert.deleteMany().catch(() => {});
  await prisma.productivityPrediction.deleteMany().catch(() => {});
  await prisma.diseaseDetection.deleteMany().catch(() => {});
  await prisma.hiveHealthRecord.deleteMany().catch(() => {});
  await prisma.sensorReading.deleteMany().catch(() => {});
  await prisma.sensor.deleteMany().catch(() => {});
  await prisma.hive.deleteMany().catch(() => {});
  await prisma.apiary.deleteMany().catch(() => {});
  await prisma.beekeeper.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // 1. Create Core Users for All Roles
  const users = [
    { id: 'usr_admin', name: 'KVIC State Administrator', email: 'admin@honeychain.org', phone: '+91 99000 11122', role: 'ADMIN' },
    { id: 'usr_bk1', name: 'Ramesh Kumar', email: 'ramesh.beekeeper@honeychain.org', phone: '+91 98765 43210', role: 'BEEKEEPER' },
    { id: 'usr_bk2', name: 'Priya Devi', email: 'priya.beekeeper@honeychain.org', phone: '+91 98765 43211', role: 'BEEKEEPER' },
    { id: 'usr_cc', name: 'Suresh Gowda', email: 'collection.madikeri@honeychain.org', phone: '+91 98123 45678', role: 'COLLECTION_CENTER' },
    { id: 'usr_insp', name: 'Dr. Priya Devi', email: 'priya.inspector@honeychain.org', phone: '+91 98234 56789', role: 'QUALITY_INSPECTOR' },
    { id: 'usr_proc', name: 'Anil Verma', email: 'processor.mysore@honeychain.org', phone: '+91 98345 67890', role: 'PROCESSOR' },
    { id: 'usr_dist', name: 'Vikram Logistics', email: 'distributor.south@honeychain.org', phone: '+91 98456 78901', role: 'DISTRIBUTOR' },
    { id: 'usr_ret', name: 'Pooja Sharma', email: 'retailer.bangalore@honeychain.org', phone: '+91 98567 89012', role: 'RETAILER' },
  ];

  for (const u of users) {
    await prisma.user.create({ data: u });
  }

  // 2. Beekeeper Profiles
  const bk1 = await prisma.beekeeper.create({
    data: { id: 'bk_1', userId: 'usr_bk1', region: 'Coorg, Karnataka', kvicEnrollmentId: 'KVIC-KA-2024-001' }
  });
  const bk2 = await prisma.beekeeper.create({
    data: { id: 'bk_2', userId: 'usr_bk2', region: 'Nilgiris, Tamil Nadu', kvicEnrollmentId: 'KVIC-TN-2024-002' }
  });

  // 3. Apiaries
  const apiary1 = await prisma.apiary.create({
    data: { id: 'ap_1', beekeeperId: bk1.id, name: 'Nilgiri Valley Apiary (Coorg)', latitude: 12.3375, longitude: 75.8069 }
  });
  const apiary2 = await prisma.apiary.create({
    data: { id: 'ap_2', beekeeperId: bk2.id, name: 'Nilgiri Forest Apiary', latitude: 11.4916, longitude: 76.7337 }
  });

  // 4. Hives (12 Monitored Hives)
  for (let i = 1; i <= 8; i++) {
    const status = i === 7 ? 'MAINTENANCE' : 'ACTIVE';
    await prisma.hive.create({
      data: { id: `hive_${i}`, apiaryId: apiary1.id, hiveType: 'Langstroth', species: 'Apis cerana indica', installDate: new Date('2024-01-15'), status }
    });
  }
  for (let i = 9; i <= 12; i++) {
    const status = i === 11 ? 'MAINTENANCE' : 'ACTIVE';
    await prisma.hive.create({
      data: { id: `hive_${i}`, apiaryId: apiary2.id, hiveType: 'Langstroth', species: 'Apis dorsata', installDate: new Date('2024-03-20'), status }
    });
  }

  // 5. Sensors & 7 Days Telemetry Data
  const now = new Date();
  for (let i = 1; i <= 12; i++) {
    const hiveId = `hive_${i}`;
    const sTemp = await prisma.sensor.create({ data: { id: `sens_temp_${i}`, hiveId, sensorType: 'temperature', deviceId: `dev_t_${i}` }});
    const sHum = await prisma.sensor.create({ data: { id: `sens_hum_${i}`, hiveId, sensorType: 'humidity', deviceId: `dev_h_${i}` }});
    const sWeight = await prisma.sensor.create({ data: { id: `sens_w_${i}`, hiveId, sensorType: 'weight', deviceId: `dev_w_${i}` }});
    
    // Readings
    for (let day = 0; day < 7; day++) {
      for (let h = 0; h < 24; h += 6) {
        const ts = new Date(now.getTime() - (day * 24 * 60 * 60 * 1000) + (h * 60 * 60 * 1000));
        
        let tVal = 34.2 + (Math.random() * 1.5);
        let hVal = 62.0 + (Math.random() * 4.0);
        let wVal = 20.5 + (Math.random() * 0.5);

        if (i === 7) { tVal = 38.5 + Math.random(); hVal = 74.0; } // Warning hive
        if (i === 11) { tVal = 40.2 + Math.random(); hVal = 82.0; wVal = 17.5 - (day * 0.2); } // Critical hive

        await prisma.sensorReading.create({ data: { sensorId: sTemp.id, timestamp: ts, value: Number(tVal.toFixed(1)), unit: '°C' } });
        await prisma.sensorReading.create({ data: { sensorId: sHum.id, timestamp: ts, value: Number(hVal.toFixed(1)), unit: '%' } });
        await prisma.sensorReading.create({ data: { sensorId: sWeight.id, timestamp: ts, value: Number(wVal.toFixed(1)), unit: 'kg' } });
      }
    }

    const score = i === 11 ? 38 : (i === 7 ? 58 : 92);
    const status = i === 11 ? 'CRITICAL' : (i === 7 ? 'WARNING' : 'HEALTHY');
    await prisma.hiveHealthRecord.create({
      data: {
        hiveId,
        score,
        status,
        componentScores: JSON.stringify({
          temperature: i === 11 ? 30 : (i === 7 ? 60 : 95),
          humidity: i === 11 ? 40 : (i === 7 ? 65 : 92),
          activity: i === 11 ? 35 : (i === 7 ? 60 : 90),
          weight: i === 11 ? 50 : 90,
          disease: i === 11 ? 30 : 95,
          environment: 90
        })
      }
    });

    await prisma.productivityPrediction.create({
      data: {
        hiveId,
        predictedYieldKg: Number((16.0 + Math.random() * 6).toFixed(1)),
        confidencePct: 91,
        rangeLow: 14.5,
        rangeHigh: 22.0,
      }
    });
  }

  // 6. Alerts
  await prisma.alert.create({
    data: { hiveId: 'hive_7', alertType: 'HIGH_TEMPERATURE', severity: 'MEDIUM', message: 'Abnormal temperature and humidity detected (38.5°C, 74%)' }
  });
  await prisma.alert.create({
    data: { hiveId: 'hive_11', alertType: 'HIGH_TEMPERATURE', severity: 'CRITICAL', message: 'Critical high temperature and rapid weight loss detected' }
  });

  // 7. Seed Honey Batches with Full Lifecycle
  const b1 = await prisma.honeyBatch.create({
    data: {
      id: 'BATCH-2026-001',
      beekeeperId: bk1.id,
      apiaryId: apiary1.id,
      hiveIds: JSON.stringify(['hive_1', 'hive_7']),
      harvestDate: new Date('2026-08-12'),
      honeyType: 'Coorg Multifloral Raw Honey',
      estimatedQuantityKg: 45.0,
      status: 'PACKAGED'
    }
  });

  // Events for BATCH-2026-001
  const ev1 = await prisma.batchEvent.create({
    data: {
      batchId: b1.id,
      eventType: 'HARVEST',
      actorUserId: 'usr_bk1',
      notes: 'Harvested from Hive H-01 & H-07 in Coorg Apiary. Raw unpasteurized.',
      timestamp: new Date('2026-08-12T08:30:00Z')
    }
  });
  await prisma.blockchainRecord.create({
    data: {
      eventId: ev1.id,
      txHash: '0x8f2d9c104e76a2139b817c093a842b109e87f61c5a981240c5f214781290bb3a',
      chain: 'polygon-amoy',
      blockNumber: 5129401,
      hashOfPayload: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  });

  const ev2 = await prisma.batchEvent.create({
    data: {
      batchId: b1.id,
      eventType: 'COLLECTION',
      actorUserId: 'usr_cc',
      notes: 'Received at Madikeri Regional Collection Center. Custody sealed.',
      timestamp: new Date('2026-08-13T11:00:00Z')
    }
  });
  await prisma.blockchainRecord.create({
    data: {
      eventId: ev2.id,
      txHash: '0x4a12f9b87c09231847120938bca87102938471928374910283749102837491aa',
      chain: 'polygon-amoy',
      blockNumber: 5130820,
      hashOfPayload: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
    }
  });

  const ev3 = await prisma.batchEvent.create({
    data: {
      batchId: b1.id,
      eventType: 'QUALITY_TESTED',
      actorUserId: 'usr_insp',
      notes: 'NABL lab tests passed: Moisture 17.8%, C4 Sugar 0%, HMF 12mg/kg.',
      timestamp: new Date('2026-08-14T14:15:00Z')
    }
  });
  await prisma.blockchainRecord.create({
    data: {
      eventId: ev3.id,
      txHash: '0x3b991827364510293847561029384756102938475610293847561029384756bb',
      chain: 'polygon-amoy',
      blockNumber: 5132104,
      hashOfPayload: 'bf21a948c08129387410293847561029'
    }
  });

  await prisma.qualityTest.create({
    data: {
      batchId: b1.id,
      inspectorId: 'usr_insp',
      moisturePct: 17.8,
      purityNotes: 'Passed NMR spectroscopy and C4 sugar adulteration screening. Certified A+ grade.',
      result: 'APPROVED',
      testedAt: new Date('2026-08-14T14:15:00Z')
    }
  });

  const ev4 = await prisma.batchEvent.create({
    data: {
      batchId: b1.id,
      eventType: 'PACKAGED',
      actorUserId: 'usr_proc',
      notes: 'Micro-filtered at 40°C. Bottled into 90 × 500g tamper-evident glass jars.',
      timestamp: new Date('2026-08-15T16:00:00Z')
    }
  });
  await prisma.blockchainRecord.create({
    data: {
      eventId: ev4.id,
      txHash: '0x7c819203948571029384756102938475610293847561029384756102938475cc',
      chain: 'polygon-amoy',
      blockNumber: 5133950,
      hashOfPayload: 'ff019283746152430192837465102938'
    }
  });

  const pkg1 = await prisma.package.create({
    data: {
      id: 'pkg_coorg_001',
      batchId: b1.id,
      quantity: 45.0,
      unit: 'kg'
    }
  });

  await prisma.qRCode.create({
    data: {
      id: 'qr_coorg_001',
      packageId: pkg1.id,
      signedToken: 'BATCH-2026-001',
      batchUrl: 'http://localhost:3000/verify/BATCH-2026-001',
      scanCount: 14
    }
  });

  console.log('✅ Database successfully seeded with full SIH demo state!');
}

main()
  .catch(e => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
