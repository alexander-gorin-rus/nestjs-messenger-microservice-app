import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  MessagePattern,
  Ctx,
  RmqContext,
  Payload,
} from '@nestjs/microservices';
import { BrokerMessages } from 'utils/broker-messages';
import { SharedService } from '@app/shared';
import { NewUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: BrokerMessages.GET_USERS })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: BrokerMessages.REGISTER_USER })
  async register(@Ctx() context: RmqContext, @Payload() newUser: NewUserDto) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.register(newUser);
  }

  @MessagePattern({ cmd: BrokerMessages.LOGIN_USER })
  async login(
    @Ctx() context: RmqContext,
    @Payload() existingUser: LoginUserDto,
  ) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.login(existingUser);
  }
}
