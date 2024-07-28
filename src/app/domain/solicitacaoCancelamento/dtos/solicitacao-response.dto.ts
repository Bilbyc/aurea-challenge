import { Exclude, Expose, Type } from "class-transformer"
import { AutoInfracaoTransito } from "../../ait/AutoInfracaoTransito"
import { CancelamentoStatus } from "../SolicitacaoCancelamento"

export class SolicitacaoResponseDto {
    @Expose()
    id: number
    @Expose()
    dataFechamento: Date
    @Type(() => AutoInfracaoTransito)    
    aitId: AutoInfracaoTransito
    @Expose()
    status: CancelamentoStatus
    @Expose()
    justificativa: string
}