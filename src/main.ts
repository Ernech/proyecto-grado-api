import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:['http://127.0.0.1:5172','http://127.0.0.1:5173'],credentials: true,});
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
