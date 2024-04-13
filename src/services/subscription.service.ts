import { Injectable } from '@nestjs/common';
import { SubscriptionDetails } from '../repositories/entity/subscription.details.entity';
import { SubscriptionDetailsRepository } from '../repositories/repository/subscription.repository';
import { UserDetailsRepository } from '../repositories/repository';
@Injectable()
export class SubscriptionDetailsService {
  constructor(
    protected readonly subscriptionRepository: SubscriptionDetailsRepository,
    protected readonly userRepository: UserDetailsRepository,
  ) {}

  /**
   * Create subscription details
   */
  async createSubscriptionDetails(
    payload: SubscriptionDetails,
  ): Promise<SubscriptionDetails> {
    return await this.subscriptionRepository.createSubscription(payload);
  }

  /**
   * Returns subscription information
   * @returns {Promise<SubscriptionDetails>}  returns subscription information
   */
  async findSubscriptionDetails(
    subscriptionId: string,
  ): Promise<SubscriptionDetails> {
    return await this.subscriptionRepository.findSubscriptionDetails(
      subscriptionId,
    );
  }
}
