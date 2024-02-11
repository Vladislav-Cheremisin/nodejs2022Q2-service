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

      await this.createNecessaryFolder('./logs');

      await fsPromises.writeFile(
        './logs/logs.txt',
        message + `Type: Logs\n\n`,
        { flag: 'a' },
      );

      await this.rotateFilesBySize('./logs/logs.txt');
    } catch (err) {
      return;
    }
  }

  async error(message: string) {
    try {
      if (!logLevel.includes('error')) {
        return;
      }

      await this.createNecessaryFolder('./logs');

      await fsPromises.writeFile(
        './logs/errors.txt',
        message + `Type: Errors\n\n`,
        { flag: 'a' },
      );

      await this.rotateFilesBySize('./logs/errors.txt');
    } catch (err) {
      return;
    }
  }

  async warn(message: string) {
    try {
      if (!logLevel.includes('warn')) {
        return;
      }

      await this.createNecessaryFolder('./logs');

      await fsPromises.writeFile(
        './logs/warnings.txt',
        message + `Type: Warnings\n\n`,
        { flag: 'a' },
      );

      await this.rotateFilesBySize('./logs/warnings.txt');
    } catch (err) {
      return;
    }
  }

  async debug(message: string) {
    try {
      if (!logLevel.includes('debug')) {
        return;
      }

      await this.createNecessaryFolder('./logs');

      await fsPromises.writeFile(
        './logs/debug-logs.txt',
        message + `Type: Debug\n\n`,
        { flag: 'a' },
      );

      await this.rotateFilesBySize('./logs/debug-logs.txt');
    } catch (err) {
      return;
    }
  }

  async verbose(message: string) {
    try {
      if (!logLevel.includes('verbose')) {
        return;
      }

      await this.createNecessaryFolder('./logs');

      await fsPromises.writeFile(
        './logs/verbose-logs.txt',
        message + `Type: Verbose\n\n`,
        { flag: 'a' },
      );

      await this.rotateFilesBySize('./logs/verbose-logs.txt');
    } catch (err) {
      return;
    }
  }

  async createNecessaryFolder(path) {
    try {
      await fsPromises.access(path);
    } catch {
      await fsPromises.mkdir(path);
    }
  }

  async rotateFilesBySize(path: string) {
    try {
      const fileSize = (await fsPromises.lstat(path)).size;

      if (fileSize / 1024 >= +process.env.MAX_LOGFILE_SIZE) {
        await fsPromises.rename(
          path,
          path.split('.txt')[0] + `_${Date.now()}.txt`,
        );
      }
    } catch (error) {
      return;
    }
  }
}
