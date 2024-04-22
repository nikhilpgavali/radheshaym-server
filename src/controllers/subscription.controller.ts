import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { SubscriptionDetailsService } from '../services/subscription.service';
import { SubscriptionDetails } from '../repositories/entity/subscription.details.entity';
import { SubscriptionDetailsDto } from '../dtos/subscription.dto';
import { SubscriptionPlan } from '../repositories/enums/subscription_plan';
import { PaymentMode } from '../repositories/enums/payment_mode';
import { UserDetailsService } from '../services/user.details.service';
import { UserDetails } from '../repositories/entity/user.details.entity';

@Controller()
export class SubscriptionDetailsController {
  constructor(
    private readonly subscriptionDetailsService: SubscriptionDetailsService,
    private readonly userDetailsService: UserDetailsService,
  ) {}

  /**
   * Subscription details to be created
   * @returns {Promise<boolean>}    - Returns true
   */
  @Post('user.createSubscriptionDetails')
  @HttpCode(200)
  async createSubscriptionDetails(
    @Headers() headers,
    @Body() subscriptionPayload: SubscriptionDetailsDto,
  ): Promise<SubscriptionDetails> {
    const userDetails: UserDetails = await this.userDetailsService.findUser(
      headers['userid'],
    );

    console.log('user subscription--->', userDetails);

    const payload: SubscriptionDetails = new SubscriptionDetails({
      subscriptionPlan:
        SubscriptionPlan[
          subscriptionPayload.subscriptionPlan.toString().toUpperCase()
        ],
      startDate: new Date(subscriptionPayload.startDate),
      renewDate: new Date(subscriptionPayload.renewDate),
      paymentMode:
        PaymentMode[subscriptionPayload.paymentMode.toString().toUpperCase()],
      paymentDate: new Date(),
      amount: subscriptionPayload.amount,
      userDetails,
    });

    console.log('subscription payload--->', payload);

    return await this.subscriptionDetailsService.createSubscriptionDetails(
      payload,
    );
  }

  @Get('user.getSubscriptionDetails/:id')
  @HttpCode(200)
  async findSubscriptionDetails(@Param('id') subscriptionId: string) {
    return await this.subscriptionDetailsService.findSubscriptionDetails(
      subscriptionId,
    );
  }

  @Get('user.getSubscriptionDetailsByUserId/:id')
  @HttpCode(200)
  async findSubscriptionDetailsByUserId(@Param('id') userId: string) {
    return await this.subscriptionDetailsService.findSubscriptionDetailsByUserId(
      [userId],
    );
  }
}
