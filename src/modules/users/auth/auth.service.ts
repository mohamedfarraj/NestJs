import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,

    private readonly jwtService: JwtService,
  ) {
    
  }

  async usersLogin(body: any, req) {
    const user:any = await this.userRepository.findOne({
      where: {
        email: body.email,
      },

      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Error, Account not found',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    } else {
      const isMatch = await user.comparePassword(
        body.password,
        user.password,
      );
      // Invalid password
      if (!isMatch) {
        throw new HttpException(
          'Error, Invalid Password',
          HttpStatus.METHOD_NOT_ALLOWED,
        );
      } else {
        return await {
          id: user.id,
          token: this.jwtService.sign({
            id: user.id,
          }),
        };
      }
    }
  }
}
