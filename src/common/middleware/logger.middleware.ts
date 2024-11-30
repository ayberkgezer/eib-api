import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const startTime = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            const responseTime = Date.now() - startTime;

            if (statusCode >= 400) {
                // Hata durumunda error log
                this.logger.error(
                    `${method} ${originalUrl} ${statusCode} ${contentLength}b - ${responseTime}ms - ${userAgent} ${ip}`
                );
            } else {
                // Normal isteklerde log
                this.logger.log(
                    `${method} ${originalUrl} ${statusCode} ${contentLength}b - ${responseTime}ms - ${userAgent} ${ip}`
                );
            }
        });

        next();
    }
}
