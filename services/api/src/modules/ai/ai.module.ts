import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { IotModule } from '../iot/iot.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [IotModule, PrismaModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
