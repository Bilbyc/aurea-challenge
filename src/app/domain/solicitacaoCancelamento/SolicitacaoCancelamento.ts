import { AutoInfracaoTransito } from "../ait/AutoInfracaoTransito"

export class SolicitacaoCancelamento {
    id: number
    dataFechamento: Date
    aitId: AutoInfracaoTransito
    status: CancelamentoStatus = CancelamentoStatus.PENDENTE
    justificativa: string
}

enum CancelamentoStatus {
    PENDENTE,
    RECUSADO,
    ACEITO
}