import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// https://docs.nestjs.com/v10/
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server is running on port!!! ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
