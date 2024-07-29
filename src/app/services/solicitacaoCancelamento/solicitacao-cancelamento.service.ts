import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { CreateSolicitacaoDto } from "../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { SolicitacaoCancelamento } from "../../domain/solicitacaoCancelamento/SolicitacaoCancelamento";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { Status } from "../../domain/ait/AutoInfracaoTransito";

@Injectable()
export class CreateSolicitacaoCancelamentoService {
    constructor(
        @Inject(ISolicitacaoCancelamentoRepository) private solicitacaoCancelamentoRepository: ISolicitacaoCancelamentoRepository,
        @Inject(IAitRepository) private aitRepository: IAitRepository
    ){
    }

    async createSolicitacao(payload: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento | string> {
        const { aitId } = payload
        const autoInfracaoTransito = await this.aitRepository.findById(aitId)

        if(!autoInfracaoTransito) {
            throw new HttpException(`Não existe AIT com o id informado`, HttpStatus.BAD_REQUEST)
        }

        if(autoInfracaoTransito.status !== Status.EM_ANDAMENTO){
            throw new HttpException('AIT já está em processo de cancelamento solicitado ou cancelado', HttpStatus.BAD_REQUEST)
        }

        await this.aitRepository.updateStatus({
            aitId: aitId,
            status: Status.SOLICITADO_CANCELAMENTO
        })

        return await this.solicitacaoCancelamentoRepository.create(payload)
    } 

    async listaSolicitacoesPendentes(): Promise<SolicitacaoCancelamento[]> {
        return this.solicitacaoCancelamentoRepository.listPendentes()
    }
}