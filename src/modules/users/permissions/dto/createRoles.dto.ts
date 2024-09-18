import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoles {
  @IsString()
  @ApiProperty()
  name: string;
}
