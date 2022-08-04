import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AccessGuard } from './common/guards/access.guard';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  const reflector = new Reflector();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AccessGuard(reflector));

  const rootDir = dirname(__dirname);
  const docs = await readFile(
    join(dirname(rootDir), 'doc', 'api.yaml'),
    'utf-8',
  );
  const parsedDocs = parse(docs);

  SwaggerModule.setup('/', app, parsedDocs);

  await app.listen(port || 4000).then(() => {
    console.log(`🚀 Server started on ${port || 4000} port`);
  });
}
bootstrap();
