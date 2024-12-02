import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AiChatRequestDto } from './dto/request/ai-chat.request.dto';
import { ChatResponseDto } from './dto/respond/ai-chat.respond.dto';
import { BaseResponse } from 'src/base/base.response';
import { ResponseMessages } from 'src/common/enums/response.messages.enum';

@Injectable()
export class AiChatService {
    private readonly logger = new Logger(AiChatService.name);

    async processChat(chatRequest: AiChatRequestDto): Promise<BaseResponse<ChatResponseDto>> {
        try {
            // Simulate different error scenarios based on message content
            if (chatRequest.message.includes('trigger500')) {
                throw new Error('Simulated internal server error');
            }

            if (chatRequest.message.includes('triggerNull')) {
                const nullObject: any = null;
                throw new Error(nullObject);
            }

            if (chatRequest.message.includes('triggerTimeout')) {
                this.logger.log('Triggering timeout simulation');
                throw new HttpException(
                    'Request Timeout',
                    HttpStatus.REQUEST_TIMEOUT
                );
            }

            // Normal success case
            const dummyResponse: ChatResponseDto = {
                response: `This is a dummy response to your message: "${chatRequest.message}"`
            };

            return new BaseResponse<ChatResponseDto>(
                dummyResponse,
                ResponseMessages.SUCCESS,
                true,
                HttpStatus.OK
            );
        } catch (error) {
            this.logger.error(`Error processing chat: ${error.message}`, error.stack);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                ResponseMessages.INTERNAL_SERVER_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
