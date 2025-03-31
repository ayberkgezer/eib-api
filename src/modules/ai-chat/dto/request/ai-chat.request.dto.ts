import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DtoPrefix, getValidationMessage, ValidationType } from 'src/common/enums/validation.Messages.enum';

export class AiChatRequestDto {
    @ApiProperty({
        description: 'The message to send to the AI chatbot',
        example: 'Hello, how are you?',
    })

    @MaxLength(100, { message: getValidationMessage(DtoPrefix.input_messages, ValidationType.MAX_LENGTH, 100) })

    @IsString({ message: getValidationMessage(DtoPrefix.input_messages, ValidationType.MUST_BE_STRING) })

    @IsNotEmpty({ message: getValidationMessage(DtoPrefix.input_messages, ValidationType.IS_NOT_EMPTY) })

    @IsDefined({ message: getValidationMessage(DtoPrefix.input_messages, ValidationType.IS_DEFINED) })
    message: string;
}