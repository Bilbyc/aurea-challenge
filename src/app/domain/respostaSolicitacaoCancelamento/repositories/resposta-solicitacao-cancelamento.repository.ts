import { RespostaSolicitacaoCancelamento } from "../RespostaSolicitacaoCancelamento";
import { CreateRespostaSolicitacaoDto } from "../dtos/create-resposta-solicitacao.dto";

export interface IRespostaSolicitacaoCancelamentoRepository {
    create(data: CreateRespostaSolicitacaoDto): Promise<RespostaSolicitacaoCancelamento>
}

export const IRespostaSolicitacaoCancelamentoRepository = Symbol("IRespostaSolicitacaoCancelamentoRepository")