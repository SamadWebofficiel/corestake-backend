import { PrismaService } from '../prisma/prisma.service';
export declare class StakingService {
    private prisma;
    constructor(prisma: PrismaService);
    getPools(): {
        id: string;
        asset: string;
        apy: number;
        tvl: number;
    }[];
    stake(userId: string, asset: string, amount: number): Promise<{
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
    getMyStakes(userId: string): Promise<{
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
    unstake(userId: string, stakeId: string): Promise<{
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
