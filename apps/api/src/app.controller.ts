import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BrokerMessages } from 'utils/broker-messages';
import { SERVICE_NAME } from 'utils/services';

@Controller()
export class AppController {
  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE) private authService: ClientProxy,
    @Inject(SERVICE_NAME.PRESENCE_SERVICE) private presenceService: ClientProxy,
  ) {}

  @Get('auth')
  async getUsers() {
    return this.authService.send(
      {
        cmd: BrokerMessages.GET_USERS,
      },
      {},
    );
  }

  @Post('auth')
  async postUser() {
    return this.authService.send(
      {
        cmd: BrokerMessages.POST_USER,
      },
      {},
    );
  }

  @Get('presence')
  async getPresence() {
    return this.presenceService.send(
      {
        cmd: BrokerMessages.GET_PRESENCE,
      },
      {},
    );
  }
}
