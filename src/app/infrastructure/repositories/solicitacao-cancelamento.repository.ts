import { Injectable } from "@nestjs/common";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSolicitacaoDto } from "../../domain/solicitacaoCancelamento/dtos/create-solicitacao.dto";
import { CancelamentoStatus, SolicitacaoCancelamento } from "../../domain/solicitacaoCancelamento/SolicitacaoCancelamento";
import { plainToClass } from "class-transformer";

@Injectable()
export class SolicitacaoCancelamentoRepository implements ISolicitacaoCancelamentoRepository {
    constructor(private prisma: PrismaService){}

    async create(data: CreateSolicitacaoDto): Promise<SolicitacaoCancelamento> {
        const solicitacaoCancelamento = await this.prisma.solicitacaoCancelamento.create({data})

        return plainToClass(SolicitacaoCancelamento, solicitacaoCancelamento)

    }

    async listPendentes(): Promise<SolicitacaoCancelamento[]> {
        const solicitacoesCancelamento = await this.prisma.solicitacaoCancelamento.findMany({
            where: {
                status: CancelamentoStatus.PENDENTE
            },
            include: {
                ait: true
            }
        })

        return solicitacoesCancelamento.map((solicitacao) => plainToClass(SolicitacaoCancelamento, solicitacao)) 
    }

    async findById(id: number): Promise<SolicitacaoCancelamento> {
        const solicitacaoCancelamento = await this.prisma.solicitacaoCancelamento.findUnique({ where: { id: id }})

        return plainToClass(SolicitacaoCancelamento, solicitacaoCancelamento)
    }

    async updateByRespostaSolicitacao(id: number, status: CancelamentoStatus): Promise<SolicitacaoCancelamento> {
        const solicitacaoCancelamento = await this.prisma.solicitacaoCancelamento.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
        })

        return plainToClass(SolicitacaoCancelamento, solicitacaoCancelamento)
    }
}