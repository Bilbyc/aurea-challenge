import { Injectable } from "@nestjs/common";
import { IRespostaSolicitacaoCancelamentoRepository } from "../../domain/respostaSolicitacaoCancelamento/repositories/resposta-solicitacao-cancelamento.repository";
import { PrismaService } from "../prisma/prisma.service";
import { plainToInstance } from "class-transformer";
import { RespostaSolicitacaoCancelamento } from "../../domain/respostaSolicitacaoCancelamento/RespostaSolicitacaoCancelamento";
import { CreateRespostaSolicitacaoDto } from "../../domain/respostaSolicitacaoCancelamento/dtos/create-resposta-solicitacao.dto";

@Injectable()
export class RespostaSolicitacaoCancelamentoRepository implements IRespostaSolicitacaoCancelamentoRepository{
    constructor(private prisma: PrismaService){}

    async create(data: CreateRespostaSolicitacaoDto): Promise<RespostaSolicitacaoCancelamento> {
        const { aceitar , ...createRespostaSolicitacaoDtoValido } = data

        const respostaSolicitacaoCancelamento = await this.prisma.respostaSolicitacaoCancelamento.create({ data: createRespostaSolicitacaoDtoValido })

        return plainToInstance(RespostaSolicitacaoCancelamento, respostaSolicitacaoCancelamento)
    }
}