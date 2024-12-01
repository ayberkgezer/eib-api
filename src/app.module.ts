import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import configuration from './config/configuration';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: process.env.NODE_ENV === 'production'
        ? '.env'
        : 'dev.env',
    }),
    AiChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware, ApiKeyMiddleware, LoggerMiddleware)
      .exclude('api') // Swagger docs için
      .forRoutes('*');
  }
}
