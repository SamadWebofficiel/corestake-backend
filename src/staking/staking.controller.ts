import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StakingService } from './staking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('pools')
  getPools() {
    return this.stakingService.getPools();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-stakes')
  getMyStakes(@Request() req: any) {
    return this.stakingService.getMyStakes(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('stake')
  stake(@Request() req: any, @Body() body: { asset: string, amount: number }) {
    return this.stakingService.stake(req.user.userId, body.asset, body.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unstake')
  unstake(@Request() req: any, @Body() body: { stakeId: string }) {
    return this.stakingService.unstake(req.user.userId, body.stakeId);
  }
}
