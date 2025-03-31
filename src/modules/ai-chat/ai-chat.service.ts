import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AiChatRequestDto } from './dto/request/ai-chat.request.dto';
import { ChatResponseDto } from './dto/respond/ai-chat.respond.dto';
import { BaseResponse } from 'src/base/base.response';
import { ResponseMessages } from 'src/common/enums/response.messages.enum';
//import { sendMessage } from './ai-api-post/ai-chat.api';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AiChatService {
  private readonly logger = new Logger(AiChatService.name);

  constructor(private databaseService: DatabaseService) {}

  async processChat(
    chatRequest: AiChatRequestDto,
  ): Promise<BaseResponse<ChatResponseDto>> {
    try {
      // Send message to AI-Chat API
      //const response: ChatResponseDto = await sendMessage(chatRequest.message);
      const response: ChatResponseDto = {
        response: 'Bu bir test yanıtıdır. AI sistem çalışıyor.',
      };

      // Save message to database
      await this.databaseService.saveMessage(
        chatRequest.message,
        response.response,
      );

      // Return response
      return new BaseResponse<ChatResponseDto>(
        response,
        ResponseMessages.SUCCESS,
        true,
        HttpStatus.OK,
      );
    } catch (error) {
      this.logger.error(`Error processing chat: ${error.message}`, error.stack);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        ResponseMessages.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
