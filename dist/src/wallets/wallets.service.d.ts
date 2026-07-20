import { PrismaService } from '../prisma/prisma.service';
export declare class WalletsService {
    private prisma;
    constructor(prisma: PrismaService);
    generateWalletForUser(userId: string): Promise<{
        id: string;
        currency: string;
        network: string;
        balance: number;
        lockedBalance: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getWalletForUser(userId: string): Promise<{
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
