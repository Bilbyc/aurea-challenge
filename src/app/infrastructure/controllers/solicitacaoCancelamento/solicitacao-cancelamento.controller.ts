import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreateSolicitacaoCancelamentoService } from "../../../services/solicitacaoCancelamento/solicitacao-cancelamento.service";
import { CreateSolicitacaoDto } from "../../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { Response } from "express";

@Controller('solicitacaoCancelamento')
export class SolicitacaoCancelamentoController {
    constructor(private createSolicitacaoService: CreateSolicitacaoCancelamentoService) { }

    @Post()
    async createSolicitacao(
        @Body() createSolicitacaoDto: CreateSolicitacaoDto,
        @Res() res: Response): Promise<void> {
        try {
            const solicitacao = await this.createSolicitacaoService.createSolicitacao(createSolicitacaoDto)

            res.status(HttpStatus.CREATED).send(solicitacao)
        } catch (error) {
            console.error('Erro durante criacao de solicitação de cancelamento:', error.message)
            throw new HttpException(error.message, error.status)
        }
    }

    @Get()
    async listaSolicitacoesPendentes(
        @Res() res: Response): Promise<void> {

        const solicitacoes = await this.createSolicitacaoService.listaSolicitacoesPendentes();

        res.status(HttpStatus.OK).send(solicitacoes)
    }
}