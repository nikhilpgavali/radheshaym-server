import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from './base.repository';
import { UserDetails } from '../entity/user.details.entity';
import { SubscriptionDetails } from '../entity/subscription.details.entity';
import { SocietyDetails } from '../entity/society.details.entity';

@Injectable()
export class SocietyDetailsRepository extends BaseRepository<SocietyDetails> {
  constructor(
    protected readonly readEntityManager: EntityManager,
    protected readonly writeEntityManager: EntityManager, // protected readonly googleApiService: ApiService,
  ) {
    super(SocietyDetails, readEntityManager, writeEntityManager);
  }

  /**
   * Create Society Details
   */
  async createSocietyDetails(payload: SocietyDetails) {
    return await super.create(payload);
  }

  /**
   * Return Society Information
   */
  async findSocietyDetails(societyId: string): Promise<SocietyDetails> {
    const where: any = { deleted: false };
    return await super.findOne(societyId, {
      relations: ['userDetails'],
      where,
    });
  }
}
