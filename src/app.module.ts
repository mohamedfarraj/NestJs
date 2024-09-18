import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { RouterModule } from '@nestjs/core';
import appConfig from './common/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host:  configService.get<string>('app.db_host'),
        port: 3306,
        database: configService.get<string>('app.db_name'),
        username: configService.get<string>('app.db_username'),
        password: configService.get<string>('app.db_password'),
        autoLoadEntities: true,
        synchronize: true, // Auto create database schema (don't use in production)
      }),
    }),
    UserModule,
    RouterModule.register([
      {
        path: 'users',
        module: UserModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
