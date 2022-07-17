import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rootDir = dirname(__dirname);
  const docs = await readFile(join(rootDir, 'doc', 'api.yaml'), 'utf-8');
  const parsedDocs = parse(docs);

  SwaggerModule.setup('/', app, parsedDocs);

  await app.listen(process.env.PORT);
}
bootstrap();

console.log(__dirname);
console.log(dirname(__dirname));
