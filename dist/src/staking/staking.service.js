"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StakingService = class StakingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getPools() {
        return [
            { id: 'core-pool-1', asset: 'CORE', apy: 12.5, tvl: 1500000 },
            { id: 'btc-pool-1', asset: 'BTC', apy: 5.2, tvl: 450 },
        ];
    }
    async stake(userId, asset, amount) {
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be greater than 0');
        }
        const pools = this.getPools();
        const pool = pools.find(p => p.asset === asset);
        if (!pool) {
            throw new common_1.BadRequestException('Invalid asset for staking');
        }
        const stake = await this.prisma.stakePosition.create({
            data: {
                userId,
                currency: asset,
                amount,
                protocol: 'Core_Native',
                realYieldRate: 4.5,
            },
        });
        return stake;
    }
    async getMyStakes(userId) {
        const stakes = await this.prisma.stakePosition.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        return stakes.map(stake => {
            const msStaked = Date.now() - stake.createdAt.getTime();
            const yearsStaked = msStaked / (1000 * 60 * 60 * 24 * 365);
            const rewards = stake.amount * (stake.realYieldRate / 100) * yearsStaked;
            return {
                ...stake,
                rewardsGenerated: rewards
            };
        });
    }
    async unstake(userId, stakeId) {
        const stake = await this.prisma.stakePosition.findUnique({
            where: { id: stakeId }
        });
        if (!stake || stake.userId !== userId) {
            throw new common_1.BadRequestException('Stake not found');
        }
        if (stake.status === 'UNSTAKED') {
            throw new common_1.BadRequestException('Already unstaked');
        }
        return this.prisma.stakePosition.update({
            where: { id: stakeId },
            data: { status: 'UNSTAKED' }
        });
    }
};
exports.StakingService = StakingService;
exports.StakingService = StakingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StakingService);
//# sourceMappingURL=staking.service.js.map