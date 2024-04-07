import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './user.entity';
import { BaseService } from 'src/common/base/baseService.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService extends BaseService<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {
    super(userRepository);
  }

  async create(body: UsersEntity): Promise<UsersEntity> {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      return this.userRepository.save(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  async update(id: any, body: any): Promise<UsersEntity> {
    try {
      if (body.password) {
        body.password = await bcrypt.hash(body.password, 10);
      }
      await this.userRepository.update(id, {...body});
      return this.userRepository.findOne(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
