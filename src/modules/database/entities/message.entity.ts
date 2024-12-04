import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    incoming_message: string;

    @Column()
    ai_response: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}