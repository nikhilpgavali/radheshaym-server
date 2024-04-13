import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.enity';
import { UserRoles } from '../enums/user_roles';

@Entity('user_details')
export class UserDetails extends BaseEntity {
  @Column('text', { name: 'first_name' })
  firstName: string;

  @Column('text', { name: 'last_name' })
  lastName: string;

  @Column('text', { name: 'contact' })
  contact: string;

  @Column('text', { name: 'password' })
  password: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'sign_in_method' })
  signInMethod: string;

  @Column('text', { name: 'role' })
  role: UserRoles;

  constructor(userDetails: Partial<UserDetails> = {}) {
    super(userDetails);
    Object.assign(this, userDetails);
  }
}
