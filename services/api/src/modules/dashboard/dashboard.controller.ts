import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('beekeeper')
  @Roles(Role.BEEKEEPER, Role.ADMIN)
  getBeekeeperStats(@CurrentUser() user: any) {
    return this.dashboardService.getBeekeeperStats(user.sub);
  }

  @Get('supply-chain')
  @Roles(Role.ADMIN, Role.PROCESSOR, Role.DISTRIBUTOR)
  getSupplyChainStats() {
    return this.dashboardService.getSupplyChainStats();
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  getAdminStats() {
    return this.dashboardService.getAdminStats();
  }
}
