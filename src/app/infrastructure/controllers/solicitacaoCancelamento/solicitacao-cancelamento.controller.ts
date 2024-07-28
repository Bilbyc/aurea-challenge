import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreateSolicitacaoCancelamentoService } from "../../../services/solicitacaoCancelamento/create-solicitacao-cancelamento.service";
import { CreateSolicitacaoDto } from "../../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { Response } from "express";

@Controller('solicitacaoCancelamento')
export class SolicitacaoCancelamentoController {
    constructor(private createSolicitacaoService: CreateSolicitacaoCancelamentoService){}

        @Post()
        async createSolicitacao(
            @Body() createSolicitacaoDto: CreateSolicitacaoDto,
            @Res() res: Response): Promise<void> {

                const solicitacao = await this.createSolicitacaoService.createSolicitacao(createSolicitacaoDto)

                res.status(HttpStatus.OK).send(solicitacao)
            }
}