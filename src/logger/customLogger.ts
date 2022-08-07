import { LoggerService } from '@nestjs/common';
import * as fsPromises from 'fs/promises';

const logLevel = ['log', 'error', 'warn', 'debug', 'verbose'];

for (let i = 0; i < 3 - +process.env.LOG_LEVEL; i++) {
  logLevel.pop();
}
export class customLogger implements LoggerService {
  async log(message: string) {
    try {
      if (!logLevel.includes('log')) {
        return;
      }

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
      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Level: logs\n\n`,
        { flag: 'a' },
      );
    }
  }

  async error(message: string) {
    try {
      if (!logLevel.includes('error')) {
        return;
      }

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
      await fsPromises.writeFile(
        './logs/errors.txt',
        message + `Level: errors\n\n`,
        { flag: 'a' },
      );
    }
  }

  async warn(message: string) {
    try {
      if (!logLevel.includes('warn')) {
        return;
      }

      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/warnings.txt',
        message + `Level: warnings\n\n`,
        { flag: 'a' },
      );

      const fileStats = await fsPromises.lstat('./logs/warnings.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename(
          './logs/warnings.txt',
          `./logs/warnings_${Date.now()}.txt`,
        );
      }
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.writeFile(
        './logs/warnings.txt',
        message + `Level: warnings\n\n`,
        { flag: 'a' },
      );
    }
  }

  async debug(message: string) {
    try {
      if (!logLevel.includes('debug')) {
        return;
      }

      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/debug-logs.txt',
        message + `Level: debug\n\n`,
        { flag: 'a' },
      );

      const fileStats = await fsPromises.lstat('./logs/debug-logs.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename(
          './logs/debug-logs.txt',
          `./logs/debug-logs_${Date.now()}.txt`,
        );
      }
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/debug-logs.txt',
        message + `Level: debug\n\n`,
        { flag: 'a' },
      );
    }
  }

  async verbose(message: string) {
    try {
      if (!logLevel.includes('verbose')) {
        return;
      }

      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/verbose-logs.txt',
        message + `Level: verbose\n\n`,
        { flag: 'a' },
      );

      const fileStats = await fsPromises.lstat('./logs/verbose-logs.txt');
      const fileSize = (fileStats.size / 1024).toFixed(2);

      if (fileSize > process.env.MAX_LOGFILE_SIZE) {
        fsPromises.rename(
          './logs/verbose-logs.txt',
          `./logs/verbose-logs_${Date.now()}.txt`,
        );
      }
    } catch {
      await fsPromises.mkdir('./logs');
      await fsPromises.access('./logs');
      await fsPromises.writeFile(
        './logs/verbose-logs.txt',
        message + `Level: verbose\n\n`,
        { flag: 'a' },
      );
    }
  }
}
