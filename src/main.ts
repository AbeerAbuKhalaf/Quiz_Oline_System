import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
     new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
   );
  
  const options = new DocumentBuilder()
    .setTitle('Conduit Blog API')
    .setDescription('Conduit blog api')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
   app.enableCors({
     credentials: true,
     origin: 'http://localhost:3000',
   });
   app.use(
     rateLimit({
       windowMs: 30 * 1000, // 1/2 minutes
       max: 2, // limit each IP to 100 requests per windowMs
     }),
   ),
     await app.listen(3000);
  
}
bootstrap();
