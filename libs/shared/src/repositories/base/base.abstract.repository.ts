import { HasId } from '@app/shared/interfaces/hasId';
import { IBaseInterfaceRepository } from './base.interface.repository';
import {
  DeepPartial,
  Repository,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';

export abstract class BaseAbstractRepository<T extends HasId>
  implements IBaseInterfaceRepository<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.save(data);
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    return await this.entity.create(data);
  }

  public async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    return await this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = { id };
    return await this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return await this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(options: FindManyOptions<T>): Promise<T[]> {
    return await this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return await this.entity.remove(data);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.entity.preload(entityLike);
  }
}
