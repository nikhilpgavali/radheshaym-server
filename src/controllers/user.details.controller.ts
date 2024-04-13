import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserDetailsService } from '../services/user.details.service';
import { UserDetailsDto } from '../dtos/user.dto';
import { UserDetails } from '../repositories/entity/user.details.entity';
import { UserRoles } from '../repositories/enums/user_roles';

@Controller()
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  /**
   * Admin details to be created
   * @returns {Promise<boolean>}    - Returns User
   */
  @Post('user.createAdminDetails')
  @HttpCode(200)
  async createAdminDetails(
    @Body() userPayload: UserDetailsDto,
  ): Promise<UserDetails> {
    console.log(userPayload);
    const user = this.createRoleBasedUser(userPayload, UserRoles.ADMIN);
    return await this.userDetailsService.createUserDetails(user);
  }

  /**
   * User details to be created
   * @returns {Promise<boolean>}    - Returns User
   */
  @Post('user.createCustomerDetails')
  @HttpCode(200)
  async createCustomerDetails(
    @Body() userPayload: UserDetailsDto,
  ): Promise<UserDetails> {
    console.log(userPayload);
    const user = this.createRoleBasedUser(userPayload, UserRoles.CUSTOMER);
    return await this.userDetailsService.createUserDetails(user);
  }

  /**
   * Staff details to be created
   * @returns {Promise<boolean>}    - Returns User
   */
  @Post('user.createStaffDetails')
  @HttpCode(200)
  async createStaffDetails(
    @Body() userPayload: UserDetailsDto,
  ): Promise<UserDetails> {
    const user = this.createRoleBasedUser(userPayload, UserRoles.STAFF);
    console.log('server add user', user);
    return await this.userDetailsService.createUserDetails(user);
  }

  /**
   * Returns user information by id
   */
  @Get('user.getUserDetails/:id')
  @HttpCode(200)
  async findUser(@Param('id') userId: string) {
    return await this.userDetailsService.findUser(userId);
  }

  /**
   * Returns user information by email
   */
  @Get('user.getUserDetailsByEmail')
  @HttpCode(200)
  async findUserByEmail(@Query('email') email: string): Promise<UserDetails> {
    console.log('server call here', email);
    let res = await this.userDetailsService.findUserByEmail(email);
    console.log(res);

    return res;
  }

  /**
   * Returns user information by contact
   */
  @Get('user.getUserDetailsByContact')
  @HttpCode(200)
  async findUserByContact(@Param('email') email: string) {
    return await this.userDetailsService.findUserByEmail(email);
  }

  private createRoleBasedUser(
    userDetails: any,
    userRole: UserRoles,
  ): UserDetails {
    return new UserDetails({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      contact: userDetails.contact,
      password: userDetails.password,
      role: userRole,
      signInMethod: userDetails.signInMethod,
    });
  }
}
