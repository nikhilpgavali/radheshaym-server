import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbDailyActivity } from './db.daily-activity';
import { ApiService } from './google-apis/apis';
import { ChannelRepository } from './repositories/repository';
import { ChannelController } from './controllers/channel.controller';
import { Channel } from './repositories/entity/channel.entity';
import { Video } from './repositories/entity/video.entity';
import { ChannelService } from './services/channel.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host || 'ec2-54-158-26-89.compute-1.amazonaws.com',
      port: 5432,
      username: process.env.username || 'lhrgparcipqcci',
      password:
        process.env.password ||
        '27d619686584051a95e4a3400a8bdcd41eaf39124431d8039a59284f98201120',
      database: process.env.db || 'dbn9pt7tmklkh',
      entities: [Channel, Video],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [DbDailyActivity, ChannelController],
  providers: [ApiService, ChannelRepository, ChannelService],
})
export class AppModule {
  constructor() {}
}
