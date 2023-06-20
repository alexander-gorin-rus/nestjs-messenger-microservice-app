import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@app/shared';
import { SERVICE_NAME } from 'utils/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule.registerRMQ(
      SERVICE_NAME.AUTH_SERVICE,
      process.env.RABBITMQ_AUTH_QUEUE,
    ),
    SharedModule.registerRMQ(
      SERVICE_NAME.PRESENCE_SERVICE,
      process.env.RABBITMQ_PRESENCE_QUEUE,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
