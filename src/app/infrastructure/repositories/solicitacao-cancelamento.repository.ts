import { Injectable } from "@nestjs/common";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSolicitacaoDto } from "../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { SolicitacaoCancelamento } from "../../domain/solicitacaoCancelamento/SolicitacaoCancelamento";
import { plainToClass } from "class-transformer";

@Injectable()
export class SolicitacaoCancelamentoRepository implements ISolicitacaoCancelamentoRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento> {
        const solicitacaoCancelamento = await this.prisma.solicitacaoCancelamento.create({data})

        return plainToClass(SolicitacaoCancelamento, solicitacaoCancelamento)


    }
}