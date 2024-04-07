import { IsEmail, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
