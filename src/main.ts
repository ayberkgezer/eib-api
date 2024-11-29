import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { ValidationPipe, BadRequestException, ValidationError, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });

  const logger = new Logger('Validation');

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const findFirstError = (errors: ValidationError[]) => {
        for (const error of errors) {
          if (error.constraints) {
            logger.error(`Validation failed: ${JSON.stringify(error.constraints)}`);
            return Object.values(error.constraints)[0];
          }
        }
      }
      const firstError = findFirstError(errors);
      logger.error(`Bad Request: ${firstError}`);
      return new BadRequestException(firstError);
    },
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS EIB API')
    .setDescription('The EIB AI API description')
    .setVersion('0.1')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
