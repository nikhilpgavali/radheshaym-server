import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BaseRepository } from './base.repository';
import { UserDetails } from '../entity/user.details.entity';

@Injectable()
export class UserDetailsRepository extends BaseRepository<UserDetails> {
  constructor(
    protected readonly readEntityManager: EntityManager,
    protected readonly writeEntityManager: EntityManager, // protected readonly googleApiService: ApiService,
  ) {
    super(UserDetails, readEntityManager, writeEntityManager);
  }

  /**
   * Create User Details
   */
  async createUser(payload: UserDetails) {
    return await super.create(payload);
  }

  /**
   * Return User Information
   */
  async findUser(userId: string): Promise<UserDetails> {
    const where: any = { deleted: false };
    return await super.findOne(userId, {
      where,
    });
  }

  /**
   * Return User Information by contact
   */
  async findUserByContact(contact: string): Promise<UserDetails> {
    const query = this.readEntityManager
      .createQueryBuilder(UserDetails, 'userDetails')
      .select('userDetails')
      .where('userDetails.deleted = :deleted', { deleted: false })
      .andWhere('userDetails.contact = :contact', { contact });
    return await query.getOne();
  }

  /**
   * Return User Information by email
   */
  async findUserByEmail(email: string, isAdded: boolean): Promise<UserDetails> {
    const query = this.readEntityManager
      .createQueryBuilder(UserDetails, 'userDetails')
      .select('userDetails')
      .where('userDetails.deleted = :deleted', { deleted: false })
      .andWhere('userDetails.email = :email', { email });
    let res = await query.getOne();
    if (isAdded) {
      if (res == null) {
        throw new HttpException(
          `Email not found ${email}`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return res;
  }
}
