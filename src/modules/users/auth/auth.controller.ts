import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    type: Auth,
  })
  @HttpCode(HttpStatus.OK)
  async usersLogin(
    @Body() body: Auth,
    @Req() req,
    @Res({ passthrough: true }) response,
  ) {
    const data = await this.authService.usersLogin(body, req);
    response.cookie('token', data.token, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('logout')
  @ApiCreatedResponse({
    type: Auth,
  })
  @HttpCode(HttpStatus.OK)
  async usersLogout(
    @Res({ passthrough: true }) response,
  ) {
    response.cookie('token', '', { expires: new Date() });
    return { msg: 'success' };
  }
}
