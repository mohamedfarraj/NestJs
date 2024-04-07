import {
  Body,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

export abstract class BaseController<T> {
  constructor(protected readonly service: any) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    return this.service.findOne(id);
  }


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return this.service.delete(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
