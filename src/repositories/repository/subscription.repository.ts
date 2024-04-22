import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  /**
   * Return Subscription Information by userId
   */
  async findSubscriptionDetailsByUserId(
    userId: string[],
  ): Promise<SubscriptionDetails> {
    const query = this.readEntityManager
      .createQueryBuilder(SubscriptionDetails, 'subscriptionDetails')
      .select('subscriptionDetails')
      .addSelect('userDetails')
      .leftJoin('subscriptionDetails.userDetails', 'userDetails')
      .where('subscriptionDetails.deleted = :deleted', { deleted: false })
      .andWhere('subscriptionDetails.userDetails = ANY(:userId)', {
        userId: userId,
      });

    let res = await query.getOne();
    if (res == null) {
      throw new HttpException(
        `Society not found for user ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return res;
  }
}
