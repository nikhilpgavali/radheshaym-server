import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from './base.repository';
import { UserDetails } from '../entity/user.details.entity';
import { SubscriptionDetails } from '../entity/subscription.details.entity';

@Injectable()
export class SubscriptionDetailsRepository extends BaseRepository<SubscriptionDetails> {
  constructor(
    protected readonly readEntityManager: EntityManager,
    protected readonly writeEntityManager: EntityManager, // protected readonly googleApiService: ApiService,
  ) {
    super(SubscriptionDetails, readEntityManager, writeEntityManager);
  }

  /**
   * Create User Details
   */
  async createSubscription(payload: SubscriptionDetails) {
    return await super.create(payload);
  }

  /**
   * Return Subscription Information
   */
  async findSubscriptionDetails(
    subscriptionId: string,
  ): Promise<SubscriptionDetails> {
    const where: any = { deleted: false };
    return await super.findOne(subscriptionId, {
      relations: ['userDetails'],
      where,
    });
  }
}
