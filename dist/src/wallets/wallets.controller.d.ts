import { WalletsService } from './wallets.service';
export declare class WalletsController {
    private readonly walletsService;
    constructor(walletsService: WalletsService);
    getMyAddress(req: any): Promise<{
        id: string;
        currency: string;
        network: string;
        balance: number;
        lockedBalance: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    } | null>;
}
