import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const options = new DocumentBuilder()
    .setTitle('ArticMarket Api')
    .setDescription('Easy market api')
    .setVersion('0.1')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port, () => {
    logger.log('Listening at http://artic-market:' + port + '/' + globalPrefix);
  });
}

bootstrap();
