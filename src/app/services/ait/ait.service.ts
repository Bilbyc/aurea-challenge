import { CreateAitDto } from "../../domain/ait/dtos/create-ait.dto";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { AutoInfracaoTransito } from "../../domain/ait/AutoInfracaoTransito";
import { Inject, Injectable } from "@nestjs/common";
import { ProducerService } from "../../infrastructure/service/aws/producer.service";

@Injectable()
export class CreateAitService {
    constructor (
        @Inject(IAitRepository) private aitRepository: IAitRepository,
        private producerService: ProducerService
    ){
    }

    async createAit(payload: CreateAitDto): Promise<AutoInfracaoTransito> {
        const ait = await this.aitRepository.create(payload)
        const message = JSON.stringify(ait)
        this.producerService.sendMessage(message)

        return ait
    }

    async listAll(): Promise<AutoInfracaoTransito[]> {
        const ait = await this.aitRepository.listAll()

        return ait
    }
}