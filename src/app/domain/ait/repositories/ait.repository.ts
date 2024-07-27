import { AutoInfracaoTransito } from "../AutoInfracaoTransito"
import { CreateAitDto } from "../dtos/create-ait.dto"

export interface IAitRepository {
    create(data: CreateAitDto): Promise<AutoInfracaoTransito>
}

export const IAitRepository = Symbol("IAitRepository")