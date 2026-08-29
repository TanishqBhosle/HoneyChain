import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const role = (dto.role as string) || 'BEEKEEPER';
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        passwordHash: dto.password,
        role: role,
        languagePref: dto.languagePref || 'en',
      },
    });

    if (role === 'BEEKEEPER') {
      await this.prisma.beekeeper.create({
        data: {
          user: { connect: { id: user.id } },
          region: 'Coorg Region',
        },
      });
    }

    const payload = { sub: user.id, role: user.role, name: user.name };
    return {
      message: 'User registered successfully',
      userId: user.id,
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  async sendOtp(dto: SendOtpDto) {
    console.log(`Sending OTP 123456 to ${dto.phone}`);
    return { message: 'OTP sent successfully', mockOtp: '123456' };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    if (dto.otp !== '123456' && dto.otp !== '1234') {
      throw new UnauthorizedException('Invalid OTP. Use 123456 in demo mode.');
    }
    const cleanPhone = dto.phone.trim();
    let user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanPhone },
          { email: cleanPhone },
          { id: cleanPhone },
        ],
      },
    });

    // If user not found, auto-provision demo user matching the role/identifier
    if (!user) {
      const isEmail = cleanPhone.includes('@');
      let role = 'BEEKEEPER';
      if (cleanPhone.includes('admin')) role = 'ADMIN';
      else if (cleanPhone.includes('inspector') || cleanPhone.includes('lab')) role = 'QUALITY_INSPECTOR';
      else if (cleanPhone.includes('processor') || cleanPhone.includes('plant')) role = 'PROCESSOR';
      else if (cleanPhone.includes('collection')) role = 'COLLECTION_CENTER';
      else if (cleanPhone.includes('distributor')) role = 'DISTRIBUTOR';
      else if (cleanPhone.includes('retailer')) role = 'RETAILER';

      user = await this.prisma.user.create({
        data: {
          name: isEmail ? cleanPhone.split('@')[0].replace('.', ' ') : 'Demo User',
          phone: isEmail ? null : cleanPhone,
          email: isEmail ? cleanPhone : null,
          role,
        },
      });

      if (role === 'BEEKEEPER') {
        await this.prisma.beekeeper.create({
          data: {
            user: { connect: { id: user.id } },
            region: 'Coorg Region',
          },
        }).catch(() => {});
      }
    }

    const payload = { sub: user.id, role: user.role, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(user: any) {
    const payload = { sub: user.sub || user.id, role: user.role, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
