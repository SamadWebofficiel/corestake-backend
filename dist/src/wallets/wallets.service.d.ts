import { PrismaService } from '../prisma/prisma.service';
export declare class WalletsService {
    private prisma;
    constructor(prisma: PrismaService);
    generateWalletForUser(userId: string): Promise<any>;
    getWalletForUser(userId: string): Promise<any>;
}
