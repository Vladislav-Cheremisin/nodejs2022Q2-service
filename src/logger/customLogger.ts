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

      const fileStats = await fsPromises.lstat('./logs/logs.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename('./logs/logs.txt', `./logs/logs_${Date.now()}.txt`);
      }
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

      const fileStats = await fsPromises.lstat('./logs/errors.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename(
          './logs/errors.txt',
          `./logs/errors_${Date.now()}.txt`,
        );
      }
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
    try {
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Level: warnings\n\n`,
        { flag: 'a' },
      );

      const fileStats = await fsPromises.lstat('./logs/logs.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename('./logs/logs.txt', `./logs/logs_${Date.now()}.txt`);
      }
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Level: warnings\n\n`,
        { flag: 'a' },
      );
    }
  }
}
