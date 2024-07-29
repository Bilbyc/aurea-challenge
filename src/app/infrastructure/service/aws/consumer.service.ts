import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs'

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly sqsClient: SQSClient
  private readonly queueUrl: string 
  private readonly queueName: string
  private readonly pollingInterval = 5000
  private polling: NodeJS.Timeout 

  constructor(
    @Inject('AWS_SQS') sqsClient: SQSClient,
    private readonly configService: ConfigService,
  ) {
    this.sqsClient = sqsClient 
    this.queueUrl = this.configService.get<string>('AWS_SQS_QUEUE_URL') 
    this.queueName = this.configService.get<string>('AWS_SQS_QUEUE_NAME')
  }

  onModuleInit() {
    this.startPolling()
  }

  onModuleDestroy() {
    if (this.polling) {
      clearTimeout(this.polling) 
    }
  }

  private async startPolling() {
    this.polling = setInterval(async () => {
      const params = {
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10,
      } 

      try {
        const result = await this.sqsClient.send(new ReceiveMessageCommand(params)) 
        if (result.Messages && result.Messages.length > 0) {
          for (const message of result.Messages) {
            await this.processMessage(message) 
          }
        }
      } catch (error) {
        console.error(`Erro ao consumir mensagem da fila ${this.queueName}:`, error.message) 
      }
    }, this.pollingInterval)
  }

  private async processMessage(message) {
    console.log(`Mensagem recebida da fila ${this.queueName}:`, message.Body) 

    const deleteParams = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: message.ReceiptHandle,
    } 

    await this.sqsClient.send(new DeleteMessageCommand(deleteParams)) 
  }
}
