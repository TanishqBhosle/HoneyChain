import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { IotService } from './iot.service';
import { Public } from '../../common/decorators/public.decorator';
import { IsString, IsNumber } from 'class-validator';

export class SensorReadingDto {
  @IsString()
  sensorId: string;
  @IsNumber()
  value: number;
  @IsString()
  unit: string;
}

@Controller('sensor-data')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Public()
  @Post()
  ingestData(@Body() dto: any) {
    if (Array.isArray(dto)) {
      for (const item of dto) {
        if (!item.sensorId || typeof item.value === 'undefined') {
          throw new BadRequestException('Invalid sensor reading in array');
        }
      }
    } else {
      if (!dto.sensorId || typeof dto.value === 'undefined') {
        throw new BadRequestException('Invalid sensor reading payload');
      }
    }
    return this.iotService.ingestData(dto);
  }
}
