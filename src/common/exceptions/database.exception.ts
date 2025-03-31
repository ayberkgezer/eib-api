import { HttpStatus } from '@nestjs/common';
import { BaseEcxeption } from '../../base/base.exceptions';

export class DatabaseException extends BaseEcxeption {
  constructor(message: string) {
    super(message, 'Database Operation Error', HttpStatus.SERVICE_UNAVAILABLE);
  }
}
