import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AiChatService } from './ai-chat.service';
import { AiChatRequestDto } from './dto/request/ai-chat.request.dto';
import { ChatResponseDto } from './dto/respond/ai-chat.respond.dto';
import { BaseResponse } from 'src/base/base.response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AI Chat')
@Controller('ai-chat')
export class AiChatController {
    constructor(private readonly aiChatService: AiChatService) { }

    @Post('')
    @ApiOperation({ summary: 'Process chat message with AI' })
    @ApiResponse({
        status: 200,
        description: 'Message processed successfully',
        type: ChatResponseDto
    })
    @UsePipes(new ValidationPipe())
    async processChat(
        @Body() chatRequest: AiChatRequestDto
    ): Promise<BaseResponse<ChatResponseDto>> {
        return await this.aiChatService.processChat(chatRequest);
    }
}
