import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { urlencoded, json } from 'express';
import * as fs from 'fs';

async function bootstrap() {
  // const fs = require('fs');
  // Use spread operator to supply https options or nothing
  const app = await NestFactory.create(AppModule, {
    ...(process.env.IS_SECURE?.toLowerCase() === 'true'
      ? {
          httpsOptions: {
            key: fs.readFileSync(process.env.KEY_PATH),
            cert: fs.readFileSync(process.env.CERT_PATH),
          },
        }
      : {}),
  });
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const config = new DocumentBuilder()
    .setTitle('Curiouser Paradox')
    .setDescription('The Curiouser Paradox API')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
