import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { PostgresDBModule, SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresDBModule,
  ],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
