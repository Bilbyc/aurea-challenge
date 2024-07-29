import { Injectable, Inject } from '@nestjs/common' 
import { ConfigService } from '@nestjs/config' 
import { SendMessageCommand, SendMessageCommandInput, SQS } from '@aws-sdk/client-sqs' 

@Injectable()
export class ProducerService {
  private readonly sqs: SQS 
  private readonly queueUrl: string 

  constructor(
    @Inject('AWS_SQS') sqs: SQS,
    private readonly configService: ConfigService,
  ) {
    this.sqs = sqs 
    this.queueUrl = this.configService.get<string>('AWS_SQS_QUEUE_URL') 
  }

  async sendMessage(messageBody: string): Promise<void> {
    const params: SendMessageCommandInput = {
      QueueUrl: this.queueUrl,
      MessageBody: messageBody,
    } 

    const command = new SendMessageCommand(params)
    await this.sqs.send(command) 
  }
}
