import { Module } from "@nestjs/common";
import { CreateAitService } from "./ait/create-ait.service";
import { RepositoriesModule } from "../infrastructure/repositories/repositories.module";
import { CreateSolicitacaoCancelamentoService } from "./solicitacaoCancelamento/create-solicitacao-cancelamento.service";
import { RespostaSolicitacaoCancelamentoService } from "./respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.service";

@Module({
    imports: [RepositoriesModule],
    providers: [CreateAitService, CreateSolicitacaoCancelamentoService, RespostaSolicitacaoCancelamentoService],
    exports: [CreateAitService, CreateSolicitacaoCancelamentoService, RespostaSolicitacaoCancelamentoService]
})

export class ServicesModule {}