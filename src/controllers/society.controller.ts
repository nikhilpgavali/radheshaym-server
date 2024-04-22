import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { UserDetailsService } from '../services/user.details.service';
import { UserDetails } from '../repositories/entity/user.details.entity';
import { SocietyDetails } from '../repositories/entity/society.details.entity';
import { SocietyDetailsDto } from '../dtos/society.details.dto';
import { VehicleType } from '../repositories/enums/vehicle_type';
import { ParkingType } from '../repositories/enums/parking_type';
import { SocietyDetailsService } from '../services/society.service';

@Controller()
export class SocietyDetailsController {
  constructor(
    private readonly societyDetailsService: SocietyDetailsService,
    private readonly userDetailsService: UserDetailsService,
  ) {}

  /**
   * Society details to be created
   * @returns {Promise<SocietyDetailsDto>}    - Returns SocietyDetailsDto object
   */
  @Post('user.createSocietyDetails')
  @HttpCode(200)
  async createSocietyDetails(
    @Headers() headers,
    @Body() societyPayload: SocietyDetailsDto,
  ): Promise<SocietyDetails> {
    const userDetails: UserDetails = await this.userDetailsService.findUser(
      headers['userid'],
    );

    const payload: SocietyDetails = new SocietyDetails({
      vehicleType: VehicleType.CAR,
      vehicleName: societyPayload.vehicleName,
      vehicleNumber: societyPayload.vehicleNumber,
      vehicleChassis: societyPayload.vehicleChassis,
      vehicleColor: societyPayload.vehicleColor,
      vehicleInsuranceStatus: societyPayload.vehicleInsuranceStatus,
      vehicleRcNumber: societyPayload.vehicleRcNumber,
      parkingFloor: societyPayload.parkingFloor,
      parkingNumber: societyPayload.parkingNumber,
      parkingType:
        ParkingType[societyPayload.parkingType.toString().toUpperCase()],
      societyName: societyPayload.societyName,
      address: societyPayload.address,
      city: societyPayload.city,
      pincode: societyPayload.pincode,
      state: societyPayload.state,
      staffId: '',
      userDetails,
    });

    console.log('society details---->', payload);

    return await this.societyDetailsService.createSocietyDetails(payload);
  }

  @Get('user.getSocietyDetails/:id')
  @HttpCode(200)
  async findSubscriptionDetails(@Param('id') societyId: string) {
    return await this.societyDetailsService.findSocietyDetails(societyId);
  }

  @Get('user.getSocietyDetailsByUserId/:id')
  @HttpCode(200)
  async findSubscriptionDetailsByUserId(@Param('id') userId: string) {
    return await this.societyDetailsService.findSocietyDetailsById([userId]);
  }
}
