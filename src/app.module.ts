import { Module } from '@nestjs/common';
import { AppController } from './app/infrastructure/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ServicesModule } from './app/services/sevices.module';

@Module({
  imports: [ControllersModule, ServicesModule],
  providers: [],
})
export class AppModule {}
