import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDetailsRepository } from '../repositories/repository';
import { UserDetails } from '../repositories/entity/user.details.entity';
@Injectable()
export class UserDetailsService {
  constructor(protected readonly userRepository: UserDetailsRepository) {}

  /**
   * Create User
   * @param payload
   * @returns
   */
  async createUserDetails(payload: UserDetails): Promise<UserDetails> {
    const user = await this.userRepository.findUserByEmail(
      payload.email,
      false,
    );
    if (user) {
      throw new HttpException(
        `User exists ${user.email}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.createUser(payload);
  }

  /**
   * Returns user information
   * @returns {Promise<UserDetails>}  returns user information
   */
  async findUser(userId: string): Promise<UserDetails> {
    return await this.userRepository.findUser(userId);
  }

  /**
   * Returns user information by email
   * @returns {Promise<UserDetails>}  returns user information by email
   */
  async findUserByEmail(email: string): Promise<UserDetails> {
    return await this.userRepository.findUserByEmail(email, true);
  }

  /**
   * Returns user information by contact
   * @returns {Promise<UserDetails>}  returns user information by contact
   */
  async findUserByContact(contact: string): Promise<UserDetails> {
    return await this.userRepository.findUserByContact(contact);
  }

  /**
   * update user information for subscription details
   * @returns {Promise<UserDetails>}  returns user information
   */
  async updateUserBySubscriptionDetails(
    userId: string,
    userDetails: UserDetails,
  ): Promise<UserDetails> {
    console.log('details*********', userDetails);
    console.log('userid ------', userId);
    return await this.userRepository.update(userId, userDetails, {
      relations: ['subscriptionDetails'],
    });
  }

  /**
   * update user information for society information
   * @returns {Promise<UserDetails>}  returns user information
   */
  async updateUserBySocietyDetails(
    userId: string,
    userDetails: UserDetails,
  ): Promise<UserDetails> {
    return await this.userRepository.update(userId, userDetails, {
      relations: ['societyDetails'],
    });
  }
}
