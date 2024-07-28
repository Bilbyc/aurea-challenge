import { CancelamentoStatus, SolicitacaoCancelamento } from "../SolicitacaoCancelamento";
import { CreateSolicitacaoDto } from "../dtos/create-solicitacao.dto";

export interface ISolicitacaoCancelamentoRepository {
    create(data: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento>
    listPendentes(): Promise<SolicitacaoCancelamento[]>
    findById(id: number): Promise<SolicitacaoCancelamento>
    updateByRespostaSolicitacao(id: number, status: CancelamentoStatus): Promise<SolicitacaoCancelamento>
}

export const ISolicitacaoCancelamentoRepository = Symbol("ISolicitacaoCancelamentoRepository")