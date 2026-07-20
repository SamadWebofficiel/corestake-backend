import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const stakes = await this.prisma.stakePosition.findMany({ where: { status: 'ACTIVE' } });
    
    let totalStakedCore = 0;
    let totalStakedBtc = 0;

    stakes.forEach(stake => {
      if (stake.currency === 'CORE') totalStakedCore += stake.amount;
      if (stake.currency === 'BTC') totalStakedBtc += stake.amount;
    });

    return {
      totalUsers,
      totalStakedCore,
      totalStakedBtc,
      activeStakes: stakes.length
    };
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        stakePositions: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
