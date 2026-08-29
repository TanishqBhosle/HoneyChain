import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApiariesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any, userId: string) {
    const beekeeper = await this.prisma.beekeeper.findUnique({ where: { userId } });
    if (!beekeeper) throw new NotFoundException('Beekeeper profile not found');
    return this.prisma.apiary.create({
      data: {
        beekeeperId: beekeeper.id,
        name: dto.name,
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
    });
  }

  async findAll(userId: string) {
    const beekeeper = await this.prisma.beekeeper.findUnique({ where: { userId } });
    const whereClause = beekeeper ? { beekeeperId: beekeeper.id } : {};
    return this.prisma.apiary.findMany({
      where: whereClause,
      include: {
        hives: {
          include: {
            healthRecords: { orderBy: { computedAt: 'desc' }, take: 1 },
            sensors: { include: { readings: { orderBy: { timestamp: 'desc' }, take: 1 } } },
            alerts: { where: { resolvedAt: null }, orderBy: { createdAt: 'desc' } },
          },
        },
        _count: { select: { hives: true, batches: true } },
      },
    });
  }

  async findOne(id: string) {
    const apiary = await this.prisma.apiary.findUnique({ where: { id } });
    if (!apiary) throw new NotFoundException('Apiary not found');
    return apiary;
  }
}
