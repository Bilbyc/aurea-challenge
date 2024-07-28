import { Inject, Injectable } from "@nestjs/common";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { CreateSolicitacaoDto } from "../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { SolicitacaoCancelamento } from "../../domain/solicitacaoCancelamento/SolicitacaoCancelamento";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { CreateAitDto } from "../../domain/ait/dtos/create-ait.dto";
import { AutoInfracaoTransito, Status } from "../../domain/ait/AutoInfracaoTransito";

@Injectable()
export class CreateSolicitacaoCancelamentoService {
    constructor(
        @Inject(ISolicitacaoCancelamentoRepository) private solicitacaoCancelamentoRepository: ISolicitacaoCancelamentoRepository,
        @Inject(IAitRepository) private aitRepository: IAitRepository
    ){
    }

    async createSolicitacao(payload: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento | string> {
        const { aitId } = payload
        const checkIfAitExists = this.aitRepository.findById(aitId)

        if(!checkIfAitExists) {
            return 'Ait nao existe'
        }

        await this.aitRepository.updateStatus({
            aitId: aitId,
            status: Status.SOLICITADO_CANCELAMENTO
        })

        return await this.solicitacaoCancelamentoRepository.create(payload)
    } 
}