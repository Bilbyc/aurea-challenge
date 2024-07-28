import { Module } from "@nestjs/common";
import { IAitRepository } from "../../domain/ait/repositories/ait.repository";
import { AitRepository } from "./ait.repository";
import { PrismaService } from "../prisma/prisma.service";
import { ISolicitacaoCancelamentoRepository } from "../../domain/solicitacaoCancelamento/repositories/solicitacao-cancelamento.repository";
import { SolicitacaoCancelamentoRepository } from "./solicitacao-cancelamento.repository";

@Module({
    providers: [PrismaService, {
        provide: IAitRepository,
        useClass: AitRepository
    }, {
        provide: ISolicitacaoCancelamentoRepository,
        useClass: SolicitacaoCancelamentoRepository
    }],
    exports: [IAitRepository, ISolicitacaoCancelamentoRepository]
})

export class RepositoriesModule {}