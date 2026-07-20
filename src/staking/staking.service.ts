import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StakingService {
  constructor(private prisma: PrismaService) {}

  // Mocking real-time APY from Core DAO RPCs
  getPools() {
    return [
      { id: 'core-pool-1', asset: 'CORE', apy: 12.5, tvl: 1500000 },
      { id: 'btc-pool-1', asset: 'BTC', apy: 5.2, tvl: 450 },
    ];
  }

  async stake(userId: string, asset: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than 0');
    }

    const pools = this.getPools();
    const pool = pools.find(p => p.asset === asset);

    if (!pool) {
      throw new BadRequestException('Invalid asset for staking');
    }

    // In a real app, we would deduct the balance here
    // await this.prisma.user.update(...)

    const stake = await this.prisma.stakePosition.create({
      data: {
        userId,
        currency: asset,
        amount,
        protocol: 'Core_Native', // Default or provided by DTO
        realYieldRate: 4.5, // Default or fetch from contract
      },
    });

    return stake;
  }

  async getMyStakes(userId: string) {
    const stakes = await this.prisma.stakePosition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate dynamic rewards for display purposes
    return stakes.map(stake => {
      const msStaked = Date.now() - stake.createdAt.getTime();
      const yearsStaked = msStaked / (1000 * 60 * 60 * 24 * 365);
      const rewards = stake.amount * (stake.realYieldRate / 100) * yearsStaked;
      
      return {
        ...stake,
        rewardsGenerated: rewards
      };
    });
  }

  async unstake(userId: string, stakeId: string) {
    const stake = await this.prisma.stakePosition.findUnique({
      where: { id: stakeId }
    });

    if (!stake || stake.userId !== userId) {
      throw new BadRequestException('Stake not found');
    }

    if (stake.status === 'UNSTAKED') {
      throw new BadRequestException('Already unstaked');
    }

    // In a real app, calculate final rewards and return to balance

    return this.prisma.stakePosition.update({
      where: { id: stakeId },
      data: { status: 'UNSTAKED' }
    });
  }
}
