import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from './permissions.entity';
import { BaseService } from 'src/common/base/baseService.service';

@Injectable()
export class RolesService extends BaseService<RolesEntity> {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {
    super(rolesRepository);
  }

 
}
