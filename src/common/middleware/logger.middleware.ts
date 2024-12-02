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
      const validationType = res.get('validation-type');

      if (statusCode < 400) {
        //400 Plus error
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms ${userAgent} - ${ip}`,
        );
      } else if (statusCode == 400) {
        //400 Error
        if (validationType) {
          this.logger.error(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms ${userAgent} - ${ip} - ${validationType}`,
          );
        } else {
          this.logger.error(
            `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms ${userAgent} - ${ip}`,
          );
        }
      } else {
        //LOG ERROR
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${responseTime}ms ${userAgent} - ${ip}`,
        );
      }
    });
    next();
  }
}
