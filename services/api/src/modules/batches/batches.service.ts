import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class BatchesService {
  constructor(
    private prisma: PrismaService,
    private blockchainService: BlockchainService
  ) {}

  async create(dto: any, userId: string) {
    const beekeeper = await this.prisma.beekeeper.findUnique({ where: { userId } });
    if (!beekeeper) throw new NotFoundException('Beekeeper not found');

    const batch = await this.prisma.honeyBatch.create({
      data: {
        beekeeper: { connect: { id: beekeeper.id } },
        apiary: { connect: { id: dto.apiaryId } },
        hiveIds: JSON.stringify(dto.hiveIds || []),
        harvestDate: dto.harvestDate ? new Date(dto.harvestDate) : new Date(),
        honeyType: dto.honeyType || 'Multifloral',
        estimatedQuantityKg: Number(dto.estimatedQuantityKg || 0),
        status: 'CREATED',
      },
    });

    const event = await this.prisma.batchEvent.create({
      data: {
        batch: { connect: { id: batch.id } },
        eventType: 'CREATED',
        actor: { connect: { id: userId } },
        notes: 'Batch created',
      },
    });

    await this.blockchainService.recordEvent(event.id, batch);
    return batch;
  }

  async findAll() {
    return this.prisma.honeyBatch.findMany({
      include: {
        apiary: true,
        events: true,
        qualityTests: true,
        package: { include: { qrCode: true } },
      },
    });
  }

  async findOne(id: string) {
    const batch = await this.prisma.honeyBatch.findUnique({
      where: { id },
      include: {
        apiary: true,
        beekeeper: { include: { user: true } },
        events: { include: { blockchainRecord: true, actor: true } },
        qualityTests: { include: { inspector: true } },
        package: { include: { qrCode: true } },
      },
    });
    if (!batch) throw new NotFoundException('Batch not found');
    return batch;
  }

  async updateStatus(id: string, dto: any, userId: string, role: string) {
    const existing = await this.prisma.honeyBatch.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Batch not found');

    const targetStatus = dto.status as string;
    const currentStatus = existing.status;

    // Define valid state machine transitions
    const validTransitions: Record<string, string[]> = {
      CREATED: ['COLLECTED'],
      COLLECTED: ['TESTED'],
      TESTED: ['APPROVED', 'REJECTED'],
      APPROVED: ['PROCESSED'],
      PROCESSED: ['PACKAGED'],
      PACKAGED: ['DISTRIBUTED'],
      DISTRIBUTED: ['SOLD'],
      REJECTED: [],
      SOLD: [],
    };

    // Role-based authorization for specific status changes
    const rolePermissions: Record<string, string[]> = {
      COLLECTED: ['COLLECTION_CENTER', 'ADMIN'],
      TESTED: ['QUALITY_INSPECTOR', 'ADMIN'],
      APPROVED: ['QUALITY_INSPECTOR', 'ADMIN'],
      REJECTED: ['QUALITY_INSPECTOR', 'ADMIN'],
      PROCESSED: ['PROCESSOR', 'ADMIN'],
      PACKAGED: ['PROCESSOR', 'ADMIN'],
      DISTRIBUTED: ['DISTRIBUTOR', 'ADMIN'],
      SOLD: ['RETAILER', 'ADMIN'],
    };

    const allowedRoles = rolePermissions[targetStatus];
    if (allowedRoles && !allowedRoles.includes(role)) {
      throw new BadRequestException(`Role '${role}' is not authorized to transition batch to '${targetStatus}'. Required: ${allowedRoles.join(', ')}`);
    }

    const nextAllowed = validTransitions[currentStatus] || [];
    if (!nextAllowed.includes(targetStatus) && role !== 'ADMIN') {
      throw new BadRequestException(`Invalid state transition: Cannot move batch from '${currentStatus}' to '${targetStatus}'. Allowed next: [${nextAllowed.join(', ')}]`);
    }

    const batch = await this.prisma.honeyBatch.update({
      where: { id },
      data: { status: targetStatus },
    });

    const event = await this.prisma.batchEvent.create({
      data: {
        batch: { connect: { id } },
        eventType: targetStatus,
        actor: { connect: { id: userId } },
        notes: dto.notes || `Custody status updated to ${targetStatus}`,
      },
    });

    await this.blockchainService.recordEvent(event.id, batch);

    // If packaged, ensure package and QR code exist
    if (targetStatus === 'PACKAGED') {
      await this.ensurePackageAndQr(id, batch.estimatedQuantityKg);
    }

    return batch;
  }

  async addQualityTest(id: string, dto: any, inspectorId: string) {
    const batch = await this.prisma.honeyBatch.findUnique({ where: { id } });
    if (!batch) throw new NotFoundException('Batch not found');

    const result = dto.result || (Number(dto.moisturePct || 18) <= 20 ? 'APPROVED' : 'REJECTED');

    const test = await this.prisma.qualityTest.create({
      data: {
        batch: { connect: { id } },
        inspector: { connect: { id: inspectorId } },
        moisturePct: dto.moisturePct ? Number(dto.moisturePct) : 17.8,
        purityNotes: dto.purityNotes || 'Moisture & NMR spectroscopy passed. 0% C4 adulteration.',
        result,
      },
    });

    // Update batch status to APPROVED or REJECTED
    const nextStatus = result === 'APPROVED' ? 'APPROVED' : 'REJECTED';
    await this.prisma.honeyBatch.update({
      where: { id },
      data: { status: nextStatus },
    });

    const event = await this.prisma.batchEvent.create({
      data: {
        batch: { connect: { id } },
        eventType: 'QUALITY_TESTED',
        actor: { connect: { id: inspectorId } },
        notes: `Lab Quality Test ${result}: Moisture ${test.moisturePct}%, ${test.purityNotes}`,
      },
    });

    await this.blockchainService.recordEvent(event.id, { testId: test.id, result, moisturePct: test.moisturePct });
    return test;
  }

  async createPackage(batchId: string, dto: any) {
    const batch = await this.prisma.honeyBatch.findUnique({ where: { id: batchId } });
    if (!batch) throw new NotFoundException('Batch not found');

    const quantity = Number(dto.quantity || batch.estimatedQuantityKg || 1);
    const unit = dto.unit || 'kg';

    let pack = await this.prisma.package.findUnique({ where: { batchId } });
    if (!pack) {
      pack = await this.prisma.package.create({
        data: {
          batch: { connect: { id: batchId } },
          quantity,
          unit,
        },
      });
    }

    // Generate signed HMAC token
    const secret = process.env.QR_HMAC_SECRET || 'your-qr-signing-secret-change-in-production';
    const hmac = require('crypto').createHmac('sha256', secret).update(batchId).digest('hex');
    const signedToken = `${batchId}:${hmac.slice(0, 16)}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    await this.prisma.qRCode.upsert({
      where: { packageId: pack.id },
      create: {
        packageId: pack.id,
        signedToken,
        batchUrl: `${appUrl}/verify/${signedToken}`,
        scanCount: 0,
      },
      update: {
        signedToken,
        batchUrl: `${appUrl}/verify/${signedToken}`,
      },
    });

    // Update batch status to PACKAGED if not already
    await this.prisma.honeyBatch.update({
      where: { id: batchId },
      data: { status: 'PACKAGED' },
    });

    return this.findOne(batchId);
  }

  private async ensurePackageAndQr(batchId: string, quantityKg: number) {
    let pack = await this.prisma.package.findUnique({ where: { batchId } });
    if (!pack) {
      pack = await this.prisma.package.create({
        data: {
          batch: { connect: { id: batchId } },
          quantity: quantityKg || 25,
          unit: 'kg',
        },
      });
    }

    const secret = process.env.QR_HMAC_SECRET || 'your-qr-signing-secret-change-in-production';
    const hmac = require('crypto').createHmac('sha256', secret).update(batchId).digest('hex');
    const signedToken = `${batchId}:${hmac.slice(0, 16)}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    await this.prisma.qRCode.upsert({
      where: { packageId: pack.id },
      create: {
        packageId: pack.id,
        signedToken,
        batchUrl: `${appUrl}/verify/${signedToken}`,
        scanCount: 0,
      },
      update: {},
    });
  }
}
