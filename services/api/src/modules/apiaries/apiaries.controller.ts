import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { IsNumber, IsString } from 'class-validator';

export class CreateApiaryDto {
  @IsString()
  name: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}

@Controller('apiaries')
@Roles(Role.BEEKEEPER, Role.ADMIN)
export class ApiariesController {
  constructor(private readonly apiariesService: ApiariesService) {}

  @Post()
  create(@Body() dto: CreateApiaryDto, @CurrentUser() user: any) {
    return this.apiariesService.create(dto, user.sub);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.apiariesService.findAll(user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiariesService.findOne(id);
  }
}
