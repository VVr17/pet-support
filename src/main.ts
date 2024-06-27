import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { Swagger } from './config/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Enable CORS with configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe()); // Adds validation
  app.useGlobalInterceptors(new ErrorsInterceptor()); // Adds Error handler

  const swagger = new Swagger();
  swagger.init(app);

  await app.listen(process.env.PORT || 3000);
})();
