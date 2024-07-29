import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateRespostaSolicitacaoDto } from "../../domain/respostaSolicitacaoCancelamento/dtos/create-resposta-solicitacao.dto";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { IRespostaSolicitacaoCancelamentoRepository } from "../../domain/respostaSolicitacaoCancelamento/repositories/resposta-solicitacao-cancelamento.repository";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { RespostaSolicitacaoCancelamento } from "../../domain/respostaSolicitacaoCancelamento/RespostaSolicitacaoCancelamento";
import { CancelamentoStatus } from "../../domain/solicitacaoCancelamento/SolicitacaoCancelamento";
import { Status } from "../../domain/ait/AutoInfracaoTransito";

@Injectable()
export class RespostaSolicitacaoCancelamentoService {
    constructor(
        @Inject(ISolicitacaoCancelamentoRepository) private solicitacaoCancelamentoRepository: ISolicitacaoCancelamentoRepository,
        @Inject(IRespostaSolicitacaoCancelamentoRepository) private respostaSolicitacaoCancelamentoRepository: IRespostaSolicitacaoCancelamentoRepository,
        @Inject(IAitRepository) private aitRepository: IAitRepository
    ){}

    async respondeSolicitacaoCancelamento(payload: CreateRespostaSolicitacaoDto): Promise<RespostaSolicitacaoCancelamento | boolean> {
        const { solicitacaoCancelamentoId } = payload

        const solicitacaoCancelamento = await this.solicitacaoCancelamentoRepository.findById(solicitacaoCancelamentoId)

        if(!solicitacaoCancelamento){
            throw new HttpException('Não existe Solicitacao cancelamento com o id informado', HttpStatus.BAD_REQUEST)
        }

        if(solicitacaoCancelamento.status !== CancelamentoStatus.PENDENTE){
            throw new HttpException('A solicitacao cancelamento informada não está PENDENTE', HttpStatus.BAD_REQUEST)
        }

        const respostaSolicitacaoCancelamento = await this.respostaSolicitacaoCancelamentoRepository.create(payload)

        this.atualizaSolicitacaoCancelamento(solicitacaoCancelamentoId, payload.aceitar)

        return respostaSolicitacaoCancelamento
    }

    private async atualizaSolicitacaoCancelamento(id: number, solicitacaoAceita: boolean): Promise<void> {
        const statusCancelamento = solicitacaoAceita === true ? CancelamentoStatus.ACEITO: CancelamentoStatus.RECUSADO

        await this.solicitacaoCancelamentoRepository.updateByRespostaSolicitacao(id, statusCancelamento)

        const solicitacaoCancelamento = await this.solicitacaoCancelamentoRepository.findById(id)
    
        const { aitId } = solicitacaoCancelamento

        this.atualizaAit(Number(aitId), solicitacaoAceita)
    }

    private async atualizaAit(id: number, solicitacaoAceita: boolean): Promise<void>{
        const status = solicitacaoAceita === true ? Status.CANCELADO: Status.EM_ANDAMENTO

        await this.aitRepository.updateByRespostaSolicitacao(id, status)
    }
}