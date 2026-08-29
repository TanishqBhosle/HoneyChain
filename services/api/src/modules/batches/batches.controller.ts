import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { BatchesService } from './batches.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  @Roles(Role.BEEKEEPER, Role.ADMIN)
  create(@Body() dto: any, @CurrentUser() user: any) {
    const userId = user?.id || user?.sub;
    return this.batchesService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.batchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchesService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const userId = user?.id || user?.sub;
    return this.batchesService.updateStatus(id, dto, userId, user?.role);
  }

  @Post(':id/quality-test')
  @Roles(Role.QUALITY_INSPECTOR, Role.ADMIN)
  qualityTest(@Param('id') id: string, @Body() dto: any, @CurrentUser() user: any) {
    const userId = user?.id || user?.sub;
    return this.batchesService.addQualityTest(id, dto, userId);
  }

  @Post(':id/package')
  @Roles(Role.PROCESSOR, Role.ADMIN)
  packageBatch(@Param('id') id: string, @Body() dto: any) {
    return this.batchesService.createPackage(id, dto);
  }
}
