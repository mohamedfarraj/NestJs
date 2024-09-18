import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @IsString()
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsEmail()
  @ApiProperty({ example: 'admin@gmail.com' })
  email: string;

  @IsString({ message: 'Password must be a string'})
  @ApiProperty({ example: 'password@123' })
  password: string;
}
