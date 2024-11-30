import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { ResponseMessages } from '../enums/response.messages.enum';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const apiKey = req.headers['x-api-key'];
        const validApiKey = this.configService.get<string>('apiKey');

        if (!apiKey || apiKey !== validApiKey) {
            throw new HttpException(
                ResponseMessages.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED,
            );
        }

        next();
    }
}
