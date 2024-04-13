import { IsNotEmpty, IsOptional } from 'class-validator';
import { VehicleType } from '../repositories/enums/vehicle_type';
import { ParkingType } from '../repositories/enums/parking_type';

export class SocietyDetailsDto {
  @IsNotEmpty()
  vehicleName: string;

  @IsNotEmpty()
  vehicleNumber: string;

  @IsNotEmpty()
  vehicleColor: string;

  @IsOptional()
  vehicleChassis: string;

  @IsOptional()
  vehicleRcNumber: string;

  @IsOptional()
  vehicleInsuranceStatus: boolean;

  @IsNotEmpty()
  societyName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  pincode: number;

  @IsNotEmpty()
  state: string;

  @IsOptional()
  parkingNumber: number;

  @IsNotEmpty()
  parkingFloor: string;

  @IsNotEmpty()
  parkingType: ParkingType;
}
