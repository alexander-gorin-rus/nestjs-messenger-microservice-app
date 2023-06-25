import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface ISharedServiceInterface {
  getRmqOptions(queue: string): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
