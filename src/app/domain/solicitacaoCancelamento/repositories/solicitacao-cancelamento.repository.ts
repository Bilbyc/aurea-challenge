import { SolicitacaoCancelamento } from "../SolicitacaoCancelamento";
import { CreateSolicitacaoDto } from "../dtos/create-solicitacao.dto";

export interface ISolicitacaoCancelamentoRepository {
    create(data: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento>
}

export const ISolicitacaoCancelamentoRepository = Symbol("ISolicitacaoCancelamentoRepository")