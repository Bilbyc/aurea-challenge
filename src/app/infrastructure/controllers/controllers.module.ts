import { Module } from "@nestjs/common";
import { AitController } from "./ait/ait.controller";
import { ServicesModule } from "../../services/sevices.module";
import { SolicitacaoCancelamentoController } from "./solicitacaoCancelamento/solicitacao-cancelamento.controller";
import { RespostaSolicitacaoCancelamentoController } from "./respostaSolicitacaoCancelamento/resposta-solicitacao-cancelamento.controller";

@Module({
    imports:[ServicesModule],
    controllers:[AitController, SolicitacaoCancelamentoController, RespostaSolicitacaoCancelamentoController]
})

export class ControllersModule {}