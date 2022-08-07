import { LoggerService } from '@nestjs/common';

export class customLogger implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.log(message);
  }

  warn() {
    console.log('not implemented');
  }
}
