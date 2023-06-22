import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { PostgresDBModule, SharedModule } from '@app/shared';

@Module({
  imports: [SharedModule, PostgresDBModule],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
