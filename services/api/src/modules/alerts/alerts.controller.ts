import { Controller, Get, Patch, Param } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  getUserAlerts(@CurrentUser() user: any) {
    // In a real scenario, alerts would be filtered by user context (e.g. beekeeper's hives)
    return this.alertsService.getAlerts();
  }

  @Patch(':id/resolve')
  resolveAlert(@Param('id') id: string) {
    return this.alertsService.resolveAlert(id);
  }
}
