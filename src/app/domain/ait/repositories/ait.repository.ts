import { AutoInfracaoTransito, Status } from "../AutoInfracaoTransito"
import { CreateAitDto } from "../dtos/create-ait.dto"
import { UpdateStatusDto } from "../dtos/update-status.dto"

export interface IAitRepository {
    create(data: CreateAitDto): Promise<AutoInfracaoTransito>
    findById(id: number): Promise<AutoInfracaoTransito>
    updateStatus(status: UpdateStatusDto): Promise<void>
}

export const IAitRepository = Symbol("IAitRepository")