import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseEcxeption extends HttpException {
  constructor(message: string, error: string, statusCode: HttpStatus) {
    super(
      {
        message,
        error,
        statusCode,
      },
      statusCode,
    );
  }
}
