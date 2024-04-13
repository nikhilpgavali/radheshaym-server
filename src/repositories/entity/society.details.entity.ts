import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.enity';
import { ParkingType } from '../enums/parking_type';
import { VehicleType } from '../enums/vehicle_type';
import { UserDetails } from './user.details.entity';

@Entity('society_details')
export class SocietyDetails extends BaseEntity {
  @Column('text', { name: 'society_name' })
  societyName: string;

  @Column('smallint', { name: 'parking_number' })
  parkingNumber: number;

  @Column('text', { name: 'parking_floor' })
  parkingFloor: string;

  @Column('text', { name: 'parking_type' })
  parkingType: ParkingType;

  @Column('text', { name: 'vehicle_type' })
  vehicleType: VehicleType;

  @Column('text', { name: 'vehicle_name' })
  vehicleName: string;

  @Column('text', { name: 'vehicle_number' })
  vehicleNumber: string;

  @Column('text', { name: 'vehicle_color' })
  vehicleColor: string;

  @Column('text', { name: 'vehicle_chassis' })
  vehicleChassis: string;

  @Column('text', { name: 'vehicle_rc_number' })
  vehicleRcNumber: string;

  @Column('boolean', { name: 'vehicle_insurance_status' })
  vehicleInsuranceStatus: boolean;

  @Column('text', { name: 'address' })
  address: string;

  @Column('text', { name: 'city' })
  city: string;

  @Column('text', { name: 'state' })
  state: string;

  @Column('text', { name: 'staff_id' })
  staffId: string;

  @Column('smallint', { name: 'pincode' })
  pincode: number;

  @ManyToOne(() => UserDetails)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userDetails: UserDetails;

  constructor(societyDetails: Partial<SocietyDetails> = {}) {
    super(societyDetails);
    Object.assign(this, societyDetails);
  }
}
