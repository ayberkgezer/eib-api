
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }
