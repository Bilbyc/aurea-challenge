import { Module } from '@nestjs/common';
import { ControllersModule } from './app/infrastructure/controllers/controllers.module';
import { ServicesModule } from './app/services/sevices.module';
import { ConfigModule } from '@nestjs/config';
import { SqsModule } from './app/infrastructure/service/aws/sqs.module';

@Module({
  imports: [ControllersModule, ServicesModule, SqsModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [],
})
export class AppModule {}
