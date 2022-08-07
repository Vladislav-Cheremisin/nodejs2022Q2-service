import { LoggerService } from '@nestjs/common';
import * as fsPromises from 'fs/promises';
export class customLogger implements LoggerService {
  async log(message: string) {
    try {
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Level: logs\n\n`,
        { flag: 'a' },
      );
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Level: logs\n\n`,
        { flag: 'a' },
      );
    }
  }

  async error(message: string) {
    try {
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/errors.txt',
        message + `Level: errors\n\n`,
        { flag: 'a' },
      );
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/errors.txt',
        message + `Level: errors\n\n`,
        { flag: 'a' },
      );
    }
  }

  async warn(message: string) {
    console.log(message);
  }
}
