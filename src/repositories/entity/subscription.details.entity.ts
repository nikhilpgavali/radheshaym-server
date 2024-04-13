import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.enity';
import { SubscriptionPlan } from '../enums/subscription_plan';
import { PaymentMode } from '../enums/payment_mode';
import { UserDetails } from './user.details.entity';

@Entity('subscription_details')
export class SubscriptionDetails extends BaseEntity {
  @Column('text', { name: 'subscription_plan' })
  subscriptionPlan: SubscriptionPlan;

  @Column('date', { name: 'start_date' })
  startDate: Date;

  @Column('date', { name: 'renew_date' })
  renewDate: Date;

  @Column('text', { name: 'payment_mode' })
  paymentMode: PaymentMode;

  @Column('timestamp', { name: 'payment_date' })
  paymentDate: Date;

  @Column('smallint')
  amount: number;

  @ManyToOne(() => UserDetails)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userDetails: UserDetails;

  constructor(subsciptionDetails: Partial<SubscriptionDetails> = {}) {
    super(subsciptionDetails);
    Object.assign(this, subsciptionDetails);
  }
}
