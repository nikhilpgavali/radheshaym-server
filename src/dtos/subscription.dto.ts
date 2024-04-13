import { IsNotEmpty, IsOptional } from 'class-validator';

export class SubscriptionDetailsDto {
  @IsNotEmpty()
  subscriptionPlan: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  renewDate: Date;

  @IsNotEmpty()
  paymentMode: string;

  @IsOptional()
  paymentDate: Date;

  @IsNotEmpty()
  amount: number;
}
