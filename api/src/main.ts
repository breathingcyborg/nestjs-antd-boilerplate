import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './cors/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(ConfigModule).get(ConfigService)
  const corsConfig = configService.get<CorsConfig>('cors');
  app.enableCors({ origin: corsConfig.origins });

  await app.listen(3000);
}
bootstrap();
