import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiariesModule } from './modules/apiaries/apiaries.module';
import { HivesModule } from './modules/hives/hives.module';
import { IotModule } from './modules/iot/iot.module';
import { AiModule } from './modules/ai/ai.module';
import { BatchesModule } from './modules/batches/batches.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { VerificationModule } from './modules/verification/verification.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ApiariesModule,
    HivesModule,
    IotModule,
    AiModule,
    BatchesModule,
    BlockchainModule,
    VerificationModule,
    AlertsModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
