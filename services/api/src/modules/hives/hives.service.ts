import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HivesService {
  constructor(private prisma: PrismaService) {}

  async findAll(apiaryId?: string) {
    const where = apiaryId ? { apiaryId } : {};
    const hives = await this.prisma.hive.findMany({
      where,
      include: {
        apiary: true,
        sensors: {
          include: { readings: { orderBy: { timestamp: 'desc' }, take: 5 } },
        },
        healthRecords: { orderBy: { computedAt: 'desc' }, take: 1 },
        alerts: { where: { resolvedAt: null }, orderBy: { createdAt: 'desc' } },
      },
    });

    return hives.map((h) => {
      const latestHealth = h.healthRecords[0];
      let componentScores = {};
      if (latestHealth && typeof latestHealth.componentScores === 'string') {
        try {
          componentScores = JSON.parse(latestHealth.componentScores);
        } catch {
          componentScores = {};
        }
      }
      return {
        ...h,
        latestHealth: latestHealth ? { ...latestHealth, componentScores } : null,
      };
    });
  }

  async create(dto: any) {
    return this.prisma.hive.create({
      data: {
        apiary: { connect: { id: dto.apiaryId } },
        hiveType: dto.hiveType || 'Langstroth',
        species: dto.species || 'Apis cerana indica',
        installDate: dto.installDate ? new Date(dto.installDate) : new Date(),
        status: 'ACTIVE',
      },
    });
  }

  async findOne(id: string) {
    const hive = await this.prisma.hive.findUnique({
      where: { id },
      include: {
        apiary: true,
        sensors: {
          include: { readings: { orderBy: { timestamp: 'desc' }, take: 10 } },
        },
        healthRecords: { orderBy: { computedAt: 'desc' }, take: 1 },
        alerts: { where: { isRead: false }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!hive) throw new NotFoundException('Hive not found');
    return hive;
  }

  async getHealth(id: string) {
    return this.prisma.hiveHealthRecord.findFirst({
      where: { hiveId: id },
      orderBy: { computedAt: 'desc' },
    });
  }

  async getPrediction(id: string) {
    return this.prisma.productivityPrediction.findFirst({
      where: { hiveId: id },
      orderBy: { generatedAt: 'desc' },
    });
  }
}
