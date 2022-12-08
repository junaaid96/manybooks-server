import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // transform: true,
  //     // whitelist: true,
  //     // forbidNonWhitelisted: true,
  //     // disableErrorMessages:
  //     //   process.env.NODE_ENV === 'PRODUCTION' ? true : false,
  //   }),
  // );
  // todo hekkknnkjdjd
  await app.listen(process.env.PORT);
}
bootstrap();
