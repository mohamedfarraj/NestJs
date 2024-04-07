import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from 'src/common/base/baseController.controller';
import { CreateUser } from './dto/createUser.dto';
import { UpdateUser } from './dto/updateUser.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/common/decorators/user.decorator';


@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
export class UserController extends BaseController<CreateUser> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUser,
  })
  @ApiBody({ type: CreateUser })
  async create(@Body() body: CreateUser): Promise<CreateUser> {
    try {
      return this.service.create(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UpdateUser,
  })
  @ApiBody({ type: UpdateUser })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUser,
    @UserInfo() user: any,
  ): Promise<UpdateUser> {
    try {
      return this.service.update(id, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
