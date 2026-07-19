import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://corestake-pro.netlify.app'
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
