import { HttpStatus } from '@nestjs/common';
import { BaseEcxeption } from '../../base/base.exceptions';

export class AiException extends BaseEcxeption {
  constructor(message: string) {
    super(message, 'AI Service Error', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
