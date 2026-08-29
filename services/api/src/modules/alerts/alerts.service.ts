import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService) {}

  async getAlerts() {
    return this.prisma.alert.findMany({
      where: { resolvedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async resolveAlert(id: string) {
    const alert = await this.prisma.alert.findUnique({ where: { id } });
    if (!alert) throw new NotFoundException('Alert not found');

    return this.prisma.alert.update({
      where: { id },
      data: { isRead: true, resolvedAt: new Date() },
    });
  }
}
