import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HealthCalculatorService } from './health-calculator.service';

@Injectable()
export class IotService {
  constructor(
    private prisma: PrismaService,
    private healthCalculator: HealthCalculatorService,
  ) {}

  async ingestData(dto: any) {
    const readings = Array.isArray(dto) ? dto : [dto];
    const results = [];
    const hiveIdsToUpdate = new Set<string>();

    for (const item of readings) {
      const timestamp = item.timestamp ? new Date(item.timestamp) : new Date();

      // Deduplicate sensor readings on (sensorId, timestamp)
      const existing = await this.prisma.sensorReading.findFirst({
        where: {
          sensorId: item.sensorId,
          timestamp,
        },
      });

      if (existing) {
        results.push(existing);
        continue;
      }

      const reading = await this.prisma.sensorReading.create({
        data: {
          sensor: { connect: { id: item.sensorId } },
          timestamp,
          value: Number(item.value),
          unit: item.unit || 'unit',
        },
      });
      results.push(reading);

      const sensor = await this.prisma.sensor.findUnique({ where: { id: item.sensorId } });
      if (sensor) {
        hiveIdsToUpdate.add(sensor.hiveId);
      }
    }

    for (const hiveId of hiveIdsToUpdate) {
      await this.healthCalculator.recalculateHealth(hiveId);
    }

    return Array.isArray(dto) ? results : results[0];
  }
}
