import { Status } from "../AutoInfracaoTransito"

export class UpdateStatusDto {
    readonly aitId: number
    readonly status: Status
}