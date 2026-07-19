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
    stake(userId: string, asset: string, amount: number): Promise<any>;
    getMyStakes(userId: string): Promise<any>;
    unstake(userId: string, stakeId: string): Promise<any>;
}
