import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DatabaseModule } from './modules/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : 'dev.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //!process production false
    }),
    //Modules Import
    AiChatModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware, LoggerMiddleware)
      .exclude('api') // Swagger docs için
      .forRoutes('*');
  }
}
