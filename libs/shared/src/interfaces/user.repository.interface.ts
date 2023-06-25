import { UserEntity } from '../entities/user.entity';
import { IBaseInterfaceRepository } from '../repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepositoryInterface
  extends IBaseInterfaceRepository<UserEntity> {}
