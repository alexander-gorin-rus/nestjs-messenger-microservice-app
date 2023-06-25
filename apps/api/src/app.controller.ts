import { AuthGuard } from '@app/shared';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BrokerMessages } from '@app/shared/broker-messages';
import { SERVICE_NAME } from '@app/shared/services';

@Controller('auth')
export class AppController {
  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE) private authService: ClientProxy,
    @Inject(SERVICE_NAME.PRESENCE_SERVICE) private presenceService: ClientProxy,
  ) {}

  @Get('users')
  async getUsers() {
    return this.authService.send(
      {
        cmd: BrokerMessages.GET_USERS,
      },
      {},
    );
  }

  // @UseGuards(AuthGuard)
  @Get('presence')
  async getPresence() {
    return this.presenceService.send(
      {
        cmd: BrokerMessages.GET_PRESENCE,
      },
      {},
    );
  }

  @Post('register')
  async register(
    @Body('login') login: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ) {
    return this.authService.send(
      {
        cmd: BrokerMessages.REGISTER_USER,
      },
      { login, password, firstName, lastName },
    );
  }

  @Post('login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: BrokerMessages.LOGIN_USER,
      },
      { login, password },
    );
  }
}
