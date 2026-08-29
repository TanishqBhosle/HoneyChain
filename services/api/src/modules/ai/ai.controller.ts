import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { IsString } from 'class-validator';

export class DetectDiseaseDto {
  @IsString()
  hiveId: string;
  @IsString()
  imageUrl: string;
}

@Controller('disease-detection')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  analyzeImage(@Body() dto: DetectDiseaseDto) {
    return this.aiService.analyzeImage(dto);
  }
}
