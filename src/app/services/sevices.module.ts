import { Module } from "@nestjs/common";
import { CreateAitService } from "./ait/ait.service";
import { RepositoriesModule } from "../infrastructure/repositories/repositories.module";
import { CreateSolicitacaoCancelamentoService } from "./solicitacaoCancelamento/solicitacao-cancelamento.service";
import { RespostaSolicitacaoCancelamentoService } from "./respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.service";
import { SqsModule } from "../infrastructure/service/aws/sqs.module";

@Module({
    imports: [RepositoriesModule, SqsModule],
    providers: [CreateAitService, CreateSolicitacaoCancelamentoService, RespostaSolicitacaoCancelamentoService],
    exports: [CreateAitService, CreateSolicitacaoCancelamentoService, RespostaSolicitacaoCancelamentoService]
})

export class ServicesModule {}