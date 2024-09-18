import { IsEmail, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @IsEmail()
  @ApiProperty({example: 'admin@gmail.com'})
  email: string;

  @IsString()
  @ApiProperty({example: 'password@123'})
  password: string;
}
