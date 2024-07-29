import { Body, Controller, HttpException, HttpStatus, Post, Res, UseFilters } from "@nestjs/common";
import { CreateRespostaSolicitacaoDto } from "../../../domain/respostaSolicitacaoCancelamento/dtos/create-resposta-solicitacao.dto";
import { Response } from "express";
import { RespostaSolicitacaoCancelamentoService } from "../../../services/respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.service";

@Controller('respostaSolicitacao')
export class RespostaSolicitacaoCancelamentoController {
    constructor(private respostaSolicitacaoCancelamentoService: RespostaSolicitacaoCancelamentoService) { }

    @Post()
    async respondeSolicitacao(
        @Body() createRespostaSolicitacaoDto: CreateRespostaSolicitacaoDto,
        @Res() res: Response): Promise<void> {
        try {
            const respostaSolicitacaoCancelamento = await this.respostaSolicitacaoCancelamentoService.respondeSolicitacaoCancelamento(createRespostaSolicitacaoDto)

            res.status(HttpStatus.CREATED).send(respostaSolicitacaoCancelamento)
        } catch (error) {
            console.error("Erro durante criação de Resposta à Solicitacao Cancelamento: ",error.message)
            throw new HttpException(error.message, error.status)
        }
    }
}