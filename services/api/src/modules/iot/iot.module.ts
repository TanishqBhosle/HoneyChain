import { Module } from '@nestjs/common';
import { IotController } from './iot.controller';
import { IotService } from './iot.service';
import { HealthCalculatorService } from './health-calculator.service';
import { SensorSimulatorService } from './sensor-simulator.service';

@Module({
  controllers: [IotController],
  providers: [IotService, HealthCalculatorService, SensorSimulatorService],
  exports: [HealthCalculatorService],
})
export class IotModule {}
