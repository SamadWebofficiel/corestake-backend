import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { WalletsService } from '../wallets/wallets.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private walletsService;
    constructor(prisma: PrismaService, jwtService: JwtService, walletsService: WalletsService);
    register(email: string, passwordHash: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            role: any;
        };
    }>;
    login(email: string, passwordHash: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            role: any;
        };
    }>;
    private generateToken;
}
