import { CreateAitDto } from "../../domain/ait/dtos/create-ait.dto";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { AutoInfracaoTransito } from "../../domain/ait/AutoInfracaoTransito";
import { AitRepository } from "../../infrastructure/repositories/ait.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateAitService {
    constructor (
        @Inject(IAitRepository) private aitRepository: IAitRepository){
    }

    async createAit(payload: CreateAitDto): Promise<AutoInfracaoTransito> {
        return await this.aitRepository.create(payload)
    }
}