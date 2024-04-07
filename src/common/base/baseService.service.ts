import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, BaseEntity } from 'typeorm';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: any): Promise<T> {
    return this.repository.findOneById(id);
  }

  async create(entity: T): Promise<T> {
    try {
      return this.repository.save(entity);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async update(id: any, entity: any): Promise<T> {
    try {
      await this.repository.update(id, entity);
      return this.repository.findOneById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
