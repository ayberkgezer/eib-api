import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';
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
      .apply(ApiKeyMiddleware, LoggerMiddleware)
      .exclude('api') // Swagger docs için
      .forRoutes('*');
  }
}
