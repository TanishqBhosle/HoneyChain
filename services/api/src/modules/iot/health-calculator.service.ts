import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export const AlertType = {
  HIGH_TEMPERATURE: 'HIGH_TEMPERATURE',
  LOW_TEMPERATURE: 'LOW_TEMPERATURE',
  HIGH_HUMIDITY: 'HIGH_HUMIDITY',
  LOW_WEIGHT: 'LOW_WEIGHT',
  ABNORMAL_ACTIVITY: 'ABNORMAL_ACTIVITY',
  DISEASE_DETECTED: 'DISEASE_DETECTED',
  SENSOR_OFFLINE: 'SENSOR_OFFLINE',
} as const;

export const AlertSeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

@Injectable()
export class HealthCalculatorService {
  constructor(private prisma: PrismaService) {}

  async recalculateHealth(hiveId: string) {
    // 1. Fetch latest readings for this hive
    const sensors = await this.prisma.sensor.findMany({
      where: { hiveId, isActive: true },
      include: {
        readings: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    });

    let temp = 34.0; // Default optimal
    let hum = 60.0;  // Default optimal
    let weight = 20.0; // Default baseline

    sensors.forEach((sensor) => {
      const latestReading = sensor.readings[0];
      if (latestReading) {
        if (sensor.sensorType === 'temperature') {
          temp = latestReading.value;
        } else if (sensor.sensorType === 'humidity') {
          hum = latestReading.value;
        } else if (sensor.sensorType === 'weight') {
          weight = latestReading.value;
        }
      }
    });

    // 2. Fetch latest disease detection
    const latestDisease = await this.prisma.diseaseDetection.findFirst({
      where: { hiveId },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Calculate component scores (0 - 100)
    // Optimal Temp: 33°C - 36°C
    let temperature_score = 100;
    if (temp < 33) {
      temperature_score = Math.max(0, Math.round(100 - (33 - temp) * 15));
    } else if (temp > 36) {
      temperature_score = Math.max(0, Math.round(100 - (temp - 36) * 15));
    }

    // Optimal Humidity: 50% - 70%
    let humidity_score = 100;
    if (hum < 50) {
      humidity_score = Math.max(0, Math.round(100 - (50 - hum) * 3));
    } else if (hum > 70) {
      humidity_score = Math.max(0, Math.round(100 - (hum - 70) * 3));
    }

    // Weight Score: baseline 20kg
    const weight_score = Math.max(0, Math.round(100 - Math.abs(20 - weight) * 10));

    // Activity score: derived from temperature and humidity stability
    const activity_score = Math.round(
      Math.max(0, 90 - (100 - temperature_score) * 0.5 - (100 - humidity_score) * 0.5)
    );

    // Disease score
    let disease_score = 100;
    if (latestDisease && latestDisease.category !== 'healthy') {
      disease_score = Math.max(0, Math.round(100 - latestDisease.confidence * 100));
    }

    const environment_score = 90; // Default environmental health

    // 4. Weighted formula:
    // Temp (20%), Hum (15%), Activity (20%), Weight (15%), Disease (20%), Env (10%)
    const score = Math.round(
      temperature_score * 0.20 +
      humidity_score    * 0.15 +
      activity_score    * 0.20 +
      weight_score      * 0.15 +
      disease_score     * 0.20 +
      environment_score * 0.10
    );

    // 5. Determine status
    let status = 'HEALTHY';
    if (score < 40) {
      status = 'CRITICAL';
    } else if (score < 60) {
      status = 'WARNING';
    } else if (score < 80) {
      status = 'MODERATE_ATTENTION';
    }

    // 6. Create Health Record
    await this.prisma.hiveHealthRecord.create({
      data: {
        hiveId,
        score,
        status,
        componentScores: JSON.stringify({
          temperature: temperature_score,
          humidity: humidity_score,
          activity: activity_score,
          weight: weight_score,
          disease: disease_score,
          environment: environment_score,
        }),
      },
    });

    // 7. Spawn Alerts based on thresholds
    // High temperature alert
    if (temp > 38.0) {
      await this.createAlert(hiveId, AlertType.HIGH_TEMPERATURE, AlertSeverity.CRITICAL, `Critical high temperature detected: ${temp.toFixed(1)}°C`);
    } else if (temp > 36.5) {
      await this.createAlert(hiveId, AlertType.HIGH_TEMPERATURE, AlertSeverity.MEDIUM, `High temperature warning: ${temp.toFixed(1)}°C`);
    }

    // Low temperature alert
    if (temp < 30.0) {
      await this.createAlert(hiveId, AlertType.LOW_TEMPERATURE, AlertSeverity.MEDIUM, `Low temperature warning: ${temp.toFixed(1)}°C`);
    }

    // High humidity alert
    if (hum > 80.0) {
      await this.createAlert(hiveId, AlertType.HIGH_HUMIDITY, AlertSeverity.MEDIUM, `High humidity warning: ${hum.toFixed(1)}%`);
    }

    // Low weight alert
    if (weight < 15.0) {
      await this.createAlert(hiveId, AlertType.LOW_WEIGHT, AlertSeverity.CRITICAL, `Critical weight drop detected: ${weight.toFixed(1)}kg`);
    }

    // Disease detected alert
    if (disease_score < 60) {
      await this.createAlert(
        hiveId,
        AlertType.DISEASE_DETECTED,
        AlertSeverity.HIGH,
        `Possible disease indicators: ${latestDisease?.category} (${Math.round((latestDisease?.confidence || 0) * 100)}% confidence)`
      );
    }
  }

  private async createAlert(hiveId: string, alertType: string, severity: string, message: string) {
    // Check if an unresolved alert of the same type already exists for this hive
    const existing = await this.prisma.alert.findFirst({
      where: {
        hiveId,
        alertType,
        resolvedAt: null,
      },
    });

    if (!existing) {
      await this.prisma.alert.create({
        data: {
          hiveId,
          alertType,
          severity,
          message,
        },
      });
      console.log(`Alert spawned for hive ${hiveId}: [${alertType}] ${message}`);
    }
  }
}
