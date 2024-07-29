import { SQSClient } from '@aws-sdk/client-sqs' 
import { fromEnv } from '@aws-sdk/credential-provider-env' 
import { Module } from '@nestjs/common' 
import { ConfigModule, ConfigService } from '@nestjs/config' 

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'AWS_SQS',
      useFactory: (configService: ConfigService) => {
        return new SQSClient({
          region: configService.get<string>('AWS_REGION'),
          credentials: fromEnv(),
        }) 
      },
      inject: [ConfigService],
    },
  ],
  exports: ['AWS_SQS'],
})
export class AwsModule {}