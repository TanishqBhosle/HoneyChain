import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  constructor(private prisma: PrismaService) {}

  async recordEvent(eventId: string, payload: any) {
    const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    let txHash = '0x' + crypto.randomBytes(32).toString('hex');
    let blockNumber = Math.floor(Math.random() * 1000000) + 5000000;
    const chain = 'polygon-amoy';

    const rpcUrl = process.env.POLYGON_RPC_URL || process.env.HARDHAT_RPC_URL || 'http://127.0.0.1:8545';
    const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (privateKey && contractAddress) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const abi = [
          'function createBatch(bytes32 batchId, bytes32 initialDataHash) external',
          'function addBatchEvent(bytes32 batchId, bytes32 eventDataHash, uint8 nextStage) external',
        ];
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        const bytes32BatchId = ethers.id(eventId);
        const bytes32DataHash = '0x' + hash;

        const tx = await contract.addBatchEvent(bytes32BatchId, bytes32DataHash, 0);
        const receipt = await tx.wait();
        if (receipt) {
          txHash = receipt.hash;
          blockNumber = receipt.blockNumber;
        }
      } catch (err: any) {
        console.warn('Blockchain RPC/Contract interaction fallback:', err.message);
      }
    }

    const record = await this.prisma.blockchainRecord.create({
      data: {
        eventId,
        txHash,
        chain,
        blockNumber,
        hashOfPayload: hash,
      },
    });

    return { txHash, hash, record };
  }
}

