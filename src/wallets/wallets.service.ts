import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ethers } from 'ethers';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async generateWalletForUser(userId: string) {
    // Generate a new Web3 wallet (compatible with Core DAO, Ethereum, BNB)
    const wallet = ethers.Wallet.createRandom();
    
    // Save to database
    // Note: In a real production app, privateKey should be encrypted before saving
    // or managed via a Master Seed/KMS.
    const depositAddress = await this.prisma.depositAddress.create({
      data: {
        address: wallet.address,
        privateKey: wallet.privateKey,
        userId: userId,
      },
    });

    return depositAddress;
  }

  async getWalletForUser(userId: string) {
    return this.prisma.depositAddress.findUnique({
      where: { userId },
      select: {
        address: true, // Never return privateKey to frontend
      }
    });
  }
}
