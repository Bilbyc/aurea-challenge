import { Module } from '@nestjs/common' 
import { ConfigModule } from '@nestjs/config' 
import { AwsModule } from '../aws/aws.module' 
import { ProducerService } from './producer.service' 
import { ConsumerService } from './consumer.service' 

@Module({
  imports: [ConfigModule, AwsModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class SqsModule {}
