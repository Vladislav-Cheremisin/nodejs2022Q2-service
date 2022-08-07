import { LoggerService } from '@nestjs/common';

export class customLogger implements LoggerService {
  log(message: string) {
    console.log(message);
  }

  error() {
    console.log('not implemented');
  }

  warn() {
    console.log('not implemented');
  }

  debug(message: string) {
    console.log(message);
  }

  verbose?(message: string) {
    console.log(message);
  }
}
