import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateRespostaSolicitacaoDto } from "../../../domain/respostaSolicitacaoCancelamento/dtos/create-resposta-solicitacao.dto";
import { Response } from "express";
import { RespostaSolicitacaoCancelamentoService } from "../../../services/respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.service";

@Controller('respostaSolicitacao')
export class RespostaSolicitacaoCancelamentoController {
    constructor(private respostaSolicitacaoCancelamentoService: RespostaSolicitacaoCancelamentoService){}

    @Post()
    async respondeSolicitacao(
        @Body() createRespostaSolicitacaoDto: CreateRespostaSolicitacaoDto,
        @Res() res:Response): Promise<void> {
            
            const respostaSolicitacaoCancelamento = await this.respostaSolicitacaoCancelamentoService.respondeSolicitacaoCancelamento(createRespostaSolicitacaoDto)
        
            res.status(HttpStatus.OK).send(respostaSolicitacaoCancelamento)
        }
}