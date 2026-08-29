import { Controller, Get, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('verify')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Public()
  @Get(':qrToken')
  verifyToken(@Param('qrToken') qrToken: string) {
    return this.verificationService.verifyToken(qrToken);
  }
}
