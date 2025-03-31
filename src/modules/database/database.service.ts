
import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) { }

    async saveMessage(incoming_message: string, ai_response: string): Promise<Message> {
        const message = this.messageRepository.create({ incoming_message, ai_response });
        return await this.messageRepository.save(message);
    }
}
