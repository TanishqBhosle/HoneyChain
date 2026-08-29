import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getBeekeeperStats(userId: string) {
    const beekeeper = await this.prisma.beekeeper.findUnique({ where: { userId } });
    if (!beekeeper) return { apiaries: 0, totalHives: 0, activeBatches: 0 };
    
    const apiaries = await this.prisma.apiary.findMany({
      where: { beekeeperId: beekeeper.id },
      include: { _count: { select: { hives: true } } }
    });

    const activeBatches = await this.prisma.honeyBatch.count({
      where: { beekeeperId: beekeeper.id, status: { not: 'SOLD' } }
    });

    return {
      apiaries: apiaries.length,
      totalHives: apiaries.reduce((acc, a) => acc + (a._count?.hives || 0), 0),
      activeBatches,
    };
  }

  async getSupplyChainStats() {
    return {
      activeBatches: await this.prisma.honeyBatch.count({ where: { status: { not: 'SOLD' } } }),
      totalBatches: await this.prisma.honeyBatch.count(),
    };
  }

  async getAdminStats() {
    return {
      totalUsers: await this.prisma.user.count(),
      totalHives: await this.prisma.hive.count(),
      totalBatches: await this.prisma.honeyBatch.count(),
    };
  }
}
