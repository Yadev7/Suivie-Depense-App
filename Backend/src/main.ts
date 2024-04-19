import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // Remove the duplicate enableCors() call
  // app.enableCors();
  await app.listen(process.env.PORT || 3002); // Listen on the assigned port or fallback to 3002
}
bootstrap();
