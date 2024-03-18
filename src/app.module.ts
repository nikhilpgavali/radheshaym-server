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
      host: process.env.host || 'aws-0-ap-south-1.pooler.supabase.com',
      port: 5432,
      username: process.env.username || 'postgres.syhycrynyhzwwzfosdra',
      password: process.env.password || 'QXeOIaiw6BYTV6Tm',
      database: process.env.db || 'postgres',
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
