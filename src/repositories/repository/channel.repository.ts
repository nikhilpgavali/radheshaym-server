import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  READ_DATABASE_CONNECTION_NAME,
  WRITE_DATABASE_CONNECTION_NAME,
} from '../../constants/database.constants';
import { ApiService } from '../../google-apis/apis';
import { EntityManager } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Channel } from '../entity/channel.entity';
import { ExecutionContext } from '../../interfaces/execution-context.interface';

@Injectable()
export class ChannelRepository extends BaseRepository<Channel> {
  constructor(
    protected readonly readEntityManager: EntityManager,
    protected readonly writeEntityManager: EntityManager,
    protected readonly googleApiService: ApiService,
  ) {
    super(Channel, readEntityManager, writeEntityManager);
  }

  /**
   *
   * @param executionContext {ExecutionContext}    - Current execution context
   * @returns Promise<boolean>     return true
   */
  async createChannel(executionContext: ExecutionContext): Promise<boolean> {
    let result = await this.googleApiService.channel();
    return super.create(result, executionContext);
  }

  /**
   * Return channel information
   */
  async findChannel(): Promise<Channel> {
    return await this.readEntityManager
      .createQueryBuilder(Channel, 'channel')
      .select('channel')
      .getOne();
  }
}
