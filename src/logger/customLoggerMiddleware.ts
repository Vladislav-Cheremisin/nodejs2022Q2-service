import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from './customLogger';

@Injectable()
export class customLoggerMiddleware implements NestMiddleware {
  private logger = new customLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const reqIp = request.ip;
    const reqMethod = request.method;
    const reqUrl = request.originalUrl;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const resStatusCode = response.statusCode;
      const resContentLength = response.get('content-length');
      const rawDate = new Date();
      const dateToLog = `${rawDate.getDate()}:${
        rawDate.getMonth() + 1
      }:${rawDate.getFullYear()}`;

      this.logger.log(
        `Method: ${reqMethod}\nUrl: ${reqUrl}\nStatusCode: ${resStatusCode}\nContent-length: ${resContentLength}\nUser agent: ${userAgent}\nIp: ${reqIp}\nRequest time: ${dateToLog}\n`,
      );
    });

    next();
  }
}
