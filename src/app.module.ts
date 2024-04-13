import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbDailyActivity } from './db.daily-activity';
import { SocietyDetails } from './repositories/entity/society.details.entity';
import { SubscriptionDetails } from './repositories/entity/subscription.details.entity';
import { UserDetails } from './repositories/entity/user.details.entity';
import { UserDetailsController } from './controllers/user.details.controller';
import { UserDetailsRepository } from './repositories/repository';
import { UserDetailsService } from './services/user.details.service';
import { SubscriptionDetailsController } from './controllers/subscription.controller';
import { SubscriptionDetailsRepository } from './repositories/repository/subscription.repository';
import { SubscriptionDetailsService } from './services/subscription.service';
import { SocietyDetailsController } from './controllers/society.controller';
import { SocietyDetailsRepository } from './repositories/repository/society.repository';
import { SocietyDetailsService } from './services/society.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'namely-prompt-heron-iad.a1.pgedge.io',
      port: 5432,
      username: 'admin',
      password: 'uj3uD2oWJ07d29AR1q6J69tW',
      database: 'nik',
      entities: [SocietyDetails, SubscriptionDetails, UserDetails],
      synchronize: false,
      ssl: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }),
  ],
  controllers: [
    DbDailyActivity,
    UserDetailsController,
    SubscriptionDetailsController,
    SocietyDetailsController,
  ],
  providers: [
    UserDetailsRepository,
    UserDetailsService,
    SubscriptionDetailsRepository,
    SubscriptionDetailsService,
    SocietyDetailsRepository,
    SocietyDetailsService,
  ],
})
export class AppModule {
  constructor() {}
}
