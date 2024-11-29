import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiChatModule } from './modules/ai-chat/ai-chat.module';

@Module({
  imports: [AiChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
