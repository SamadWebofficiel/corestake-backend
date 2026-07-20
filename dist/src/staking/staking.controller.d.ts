import { StakingService } from './staking.service';
export declare class StakingController {
    private readonly stakingService;
    constructor(stakingService: StakingService);
    getPools(): {
        id: string;
        asset: string;
        apy: number;
        tvl: number;
    }[];
    getMyStakes(req: any): Promise<{
        rewardsGenerated: number;
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        protocol: string;
        amount: number;
        realYieldRate: number;
        startDate: Date;
        endDate: Date | null;
        status: string;
    }[]>;
    stake(req: any, body: {
        asset: string;
        amount: number;
    }): Promise<{
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        protocol: string;
        amount: number;
        realYieldRate: number;
        startDate: Date;
        endDate: Date | null;
        status: string;
    }>;
    unstake(req: any, body: {
        stakeId: string;
    }): Promise<{
        id: string;
        currency: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        protocol: string;
        amount: number;
        realYieldRate: number;
        startDate: Date;
        endDate: Date | null;
        status: string;
    }>;
}
