import { Injectable } from '@nestjs/common';
import { SocietyDetails } from '../repositories/entity/society.details.entity';
import { SocietyDetailsRepository } from '../repositories/repository/society.repository';
@Injectable()
export class SocietyDetailsService {
  constructor(protected readonly societyRepository: SocietyDetailsRepository) {}

  /**
   * Create society details
   */
  async createSocietyDetails(payload: SocietyDetails): Promise<SocietyDetails> {
    return await this.societyRepository.createSocietyDetails(payload);
  }

  /**
   * Returns society information
   * @returns {Promise<SocietyDetails>}  returns society information
   */
  async findSocietyDetails(societyId: string): Promise<SocietyDetails> {
    return await this.societyRepository.findSocietyDetails(societyId);
  }

  /**
   * Returns society information by userId
   * @returns {Promise<SocietyDetails>}  returns society information
   */
  async findSocietyDetailsById(userId: string[]): Promise<SocietyDetails> {
    return await this.societyRepository.findSocietyDetailsByUserId(userId);
  }
}
