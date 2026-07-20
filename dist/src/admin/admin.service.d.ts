import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalUsers: number;
        totalStakedCore: number;
        totalStakedBtc: number;
        activeStakes: number;
    }>;
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        role: string;
        stakePositions: {
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
        }[];
    }[]>;
}
