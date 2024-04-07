import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users/user.controller';
import { UsersEntity } from './users/user.entity';
import { UserService } from './users/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/shared/utils/jwt.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),

    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Change this to your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService,JwtStrategy],
})
export class UserModule {}
