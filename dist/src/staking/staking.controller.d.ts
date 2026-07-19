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
    getMyStakes(req: any): Promise<any>;
    stake(req: any, body: {
        asset: string;
        amount: number;
    }): Promise<any>;
    unstake(req: any, body: {
        stakeId: string;
    }): Promise<any>;
}
