import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HivesService } from './hives.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateHiveDto {
  @IsString()
  apiaryId: string;
  @IsString()
  hiveType: string;
  @IsString()
  species: string;
  @IsDateString()
  @IsOptional()
  installDate?: Date;
}

@Controller('hives')
@Roles(Role.BEEKEEPER, Role.ADMIN)
export class HivesController {
  constructor(private readonly hivesService: HivesService) {}

  @Get()
  findAll() {
    return this.hivesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateHiveDto) {
    return this.hivesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hivesService.findOne(id);
  }

  @Get(':id/health')
  getHealth(@Param('id') id: string) {
    return this.hivesService.getHealth(id);
  }

  @Get(':id/prediction')
  getPrediction(@Param('id') id: string) {
    return this.hivesService.getPrediction(id);
  }
}
