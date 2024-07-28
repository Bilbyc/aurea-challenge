import { Module } from '@nestjs/common';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ServicesModule } from './app/services/sevices.module';

@Module({
  imports: [ControllersModule, ServicesModule],
  providers: [],
})
export class AppModule {}
