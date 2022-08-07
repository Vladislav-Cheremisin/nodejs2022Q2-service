import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from './customLogger';

@Injectable()
export class customLoggerMiddleware implements NestMiddleware {
  private logger = new customLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const reqIp = request.ip;
    const reqMethod = request.method;
    const reqUrl = request.originalUrl.split('?')[0];
    const userAgent = request.get('user-agent') || '';
    const warnCodes = [110, 111, 112, 113, 199, 214, 219];
    let reqParams = JSON.stringify(request.query);
    let reqBody = JSON.stringify(request.body);

    if (reqParams === '{}') {
      reqParams = 'none';
    }

    if (reqBody === '{}') {
      reqBody = 'none';
    }

    response.on('finish', async () => {
      const resStatusCode = response.statusCode;
      const resContentLength = response.get('content-length');
      const rawDate = new Date();
      const dateToLog = `Day: ${rawDate.getDate()} Month: ${
        rawDate.getMonth() + 1
      } Year: ${rawDate.getFullYear()} Time: ${rawDate.getHours()}:${rawDate.getMinutes()}:${rawDate.getSeconds()}`;

      if (resStatusCode < 400) {
        if (warnCodes.includes(resStatusCode)) {
          await this.logger.warn(
            `Method: ${reqMethod}\nStatusCode: ${resStatusCode}\nUrl: ${reqUrl}\nRequest params: ${reqParams}\nRequest body: ${reqBody}\nRequest time: ${dateToLog}\n`,
          );
        } else {
          await this.logger.log(
            `Method: ${reqMethod}\nStatusCode: ${resStatusCode}\nUrl: ${reqUrl}\nRequest params: ${reqParams}\nRequest body: ${reqBody}\nRequest time: ${dateToLog}\n`,
          );
        }
      } else {
        await this.logger.error(
          `Method: ${reqMethod}\nStatusCode: ${resStatusCode}\nError message: ${response.statusMessage}\nUrl: ${reqUrl}\nRequest params: ${reqParams}\nRequest body: ${reqBody}\nRequest time: ${dateToLog}\n`,
        );
      }

      if (+process.env.LOG_LEVEL >= 4) {
        await this.logger.debug(
          `Method: ${reqMethod}\nStatusCode: ${resStatusCode}\nUrl: ${reqUrl}\nRequest params: ${reqParams}\nRequest body: ${reqBody}\nContent-length: ${resContentLength}\nUser agent: ${userAgent}\nIp: ${reqIp}\nRequest time: ${dateToLog}\n`,
        );
      }

      if (+process.env.LOG_LEVEL === 5) {
        const requestHeaders = JSON.stringify(request.headers);
        const responseHeaders = JSON.stringify(response.getHeaders());

        await this.logger.verbose(
          `Method: ${reqMethod}\nStatusCode: ${resStatusCode}\nUrl: ${reqUrl}\nRequest params: ${reqParams}\nRequest body: ${reqBody}\nRequest headers: ${requestHeaders}\nResponse headers: ${responseHeaders}\nContent-length: ${resContentLength}\nUser agent: ${userAgent}\nIp: ${reqIp}\nRequest time: ${dateToLog}\n`,
        );
      }
    });

    next();
  }
}
