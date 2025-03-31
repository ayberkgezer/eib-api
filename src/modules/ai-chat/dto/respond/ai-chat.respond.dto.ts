import { ApiProperty } from "@nestjs/swagger";

export class ChatResponseDto {
    @ApiProperty({
        description: 'The response from the AI chatbot',
        example: 'I am doing',
    })
    response: string;
}