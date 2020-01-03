import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonService } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  CommonService.setApp(app);
  await app.listen(3000);
}
bootstrap();
