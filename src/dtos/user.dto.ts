import { IsNotEmpty } from 'class-validator';

export class UserDetailsDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  password: string;
}
