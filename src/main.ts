import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './common/shared/logger.service';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get(ConfigService);

  // Get port from config
  const port = configService.get<number>('app.port') || 4000;

  // Enable CORS
  app.enableCors();

  // Set global prefix for API
  app.setGlobalPrefix('api');

  // somewhere in your initialization file
  app.use(cookieParser());
  app.use(compression());

  // Set global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Set global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Set global Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('Project')
    .setDescription('Project Description')
    .setVersion('1.0')
    .addTag('Project')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useLogger(new LoggerService());

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
