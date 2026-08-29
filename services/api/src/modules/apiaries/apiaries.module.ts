import { Module } from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { ApiariesController } from './apiaries.controller';

@Module({
  controllers: [ApiariesController],
  providers: [ApiariesService],
})
export class ApiariesModule {}
