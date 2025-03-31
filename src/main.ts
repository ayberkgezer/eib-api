import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
  Logger,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const findFirstError = (errors: ValidationError[]) => {
          for (const error of errors) {
            if (error.constraints) {
              return Object.values(error.constraints)[0];
            }
          }
        };
        const firstError = findFirstError(errors);
        return new BadRequestException(firstError);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Exception filter Global
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS EIB API')
    .setDescription('The EIB AI API description')
    .setVersion('0.1')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application
  const port = process.env.PORT;
  await app.listen(port);

  if (process.env.NODE_ENV === 'development') {
    const logger = new Logger('Bootstrap');

    logger.log(`Database connection: Successful`);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
  }
}
bootstrap();
